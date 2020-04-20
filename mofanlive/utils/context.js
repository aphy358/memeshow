import Action from "@/redux/action"

const Api = wx.X.Api
const store = wx.X.store

export async function switchContext(context) {

  const prevContext = store.getState().context
  const newContext = context

  if (prevContext.shopId != context.shopId) {
    // 切换了店铺，更新店铺信息和分享
    newContext.shop = await Api.Shop.retrieve(context.shopId)
    newContext.shareRelations = await Api.Share.relations()
  }

  store.dispatch(Action.context.update(newContext))
}

export default {
  switchContext
}