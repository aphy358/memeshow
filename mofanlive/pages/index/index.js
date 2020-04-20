import _ from 'lodash'
import { connectPage } from "wx-redux"
import Action from "@/redux/action"
import { loginByCode } from '@/utils/login'
import { switchContext } from '@/utils/context'

const Api = wx.X.Api
const router = wx.X.router

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  setReferrer(referrer) {
    dispatch(Action.referrer.update(referrer))
  }
})

/**
 * 小程序的统一入口
 */
Page(
  connectPage(
    mapStateToProps,
    mapDispatchToProps
  )({

    onLoad: async function ({ shopId, referrerId, redirect }) {

      // 尝试登录
      await loginByCode()

      // 更新用户的推荐信息
      const context = await Api.Share.setReferrer({ shopId, referrerId })

      // 更新用户访问小程序的上下文
      switchContext(context)

      // 记录用户初始进入小程序时的店铺&推荐人
      this.setReferrer({ shopId: shopId || context.shopId, referrerId })

      if (!!redirect) {
        // 跳转到目标页面
        const url = decodeURIComponent(redirect)
        wx.reLaunch({ url })

      } else {
        // 默认跳转
        if (!!shopId || !!context.shopId) {
          // 有访问店铺，进入店铺首页
          router.go("shop")
        } else {
          // 没有访问店铺，进入个人中心
          router.go("userCenter")
        }
      }
    }
  })
)
