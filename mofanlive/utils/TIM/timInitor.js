// 腾讯云 TIM 初始化

import TIM from 'tim-wx-sdk';
import COS from "cos-wx-sdk-v5";
import TYPES from './types'
import { SDKAPPID, USERSIG } from './timConfig'

const tim = TIM.create({
  SDKAppID: SDKAPPID
})

tim.setLogLevel(0)
tim.registerPlugin({'cos-wx-sdk': COS})
wx.tim = tim

const TimInitor = (context, store) => {

  tim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate, context)
  tim.on(TIM.EVENT.SDK_NOT_READY, onReadyStateUpdate, context)

  tim.on(TIM.EVENT.KICKED_OUT, event => {
    store.dispatch({
      type: "resetGroup"
    })
    store.dispatch({
      type: "resetUser"
    })
    store.dispatch({
      type: "resetCurrentConversation"
    })
    store.dispatch({
      type: "resetAllConversation"
    })

    wx.showToast({
      title: '你已被踢下线',
      icon: 'none',
      duration: 1500
    })

    setTimeout(() => {
      // 重新登录？
    }, 1500)
  })

  // 出错统一处理
  tim.on(TIM.EVENT.ERROR, event => {
    // 网络错误不弹toast && sdk未初始化完全报错
    if (event.data.message && event.data.code && event.data.code !== 2800 && event.data.code !== 2999) {
      wx.showToast({
        title: event.data.message,
        duration: 2000,
        icon: 'none'
      })
    }
  })

  tim.on(TIM.EVENT.MESSAGE_RECEIVED, event => {
    debugger
    for (let i = 0; i < event.data.length; i++) {
      let item = event.data[i]
      if (item.type === TYPES.MSG_GRP_TIP) {
        if (item.payload.operationType) {
          store.dispatch({
            type: 'groupNameUpdate',
            payload: item.payload
          })
        }
      }
      if (item.type === TYPES.MSG_CUSTOM) {
        const videoCustom = JSON.parse(item.payload.data)
        if (videoCustom.version === 3) {
          switch (videoCustom.action) {
            // 对方呼叫我
            case 0:
              if (!store.getters.isCalling) {
                let url = `../call/main?args=${item.payload.data}&&from=${item.from}&&to=${item.to}`
                wx.navigateTo({url})
              } else {
                store.dispatch({
                  type: 'isCalling',
                  payload: item
                })
              }
              break
            // 对方取消
            case 1:
              wx.navigateBack({
                delta: 1
              })
              break
            // 对方拒绝
            case 2:
              store.dispatch({
                type: 'onRefuse'
              })
              break
            // 对方不接1min
            case 3:
              wx.navigateBack({
                delta: 1
              })
              break
            // 对方接听
            case 4:
              store.dispatch({
                type: 'onCall',
                payload: videoCustom
              })
              break
            // 对方挂断
            case 5:
              store.dispatch({
                type: 'onClose'
              })
              break
            // 对方正在通话中
            case 6:
              store.dispatch({
                type: 'onBusy'
              })
              break
            default:
              break
          }
        }
      }
    }
    store.dispatch({
      type: 'onMessageEvent',
      payload: event
    })
  })

  tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
    store.dispatch({
      type: 'updateAllConversation', 
      payload: event.data
    })
  })

  tim.on(TIM.EVENT.GROUP_LIST_UPDATED, event => {
    store.dispatch({
      type: 'updateGroupList', 
      payload: event.data
    })
  })

  tim.on(TIM.EVENT.BLACKLIST_UPDATED, event => {
    store.dispatch({
      type: 'updateBlacklist',
      payload: event.data
    })
  })

  tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, event => {
    const isKickedout = event.data.type === 4
    const isCurrentConversation =
      `GROUP${event.data.message.payload.groupProfile.groupID}` === store.state.conversation.currentConversationID
    // 在当前会话被踢，需reset当前会话
    if (isKickedout && isCurrentConversation) {
      wx.navigateBack({
        delta: 1
      })
      store.dispatch({
        type: 'resetCurrentConversation'
      })
    }
  })

  function onReadyStateUpdate ({ name }) {
    const isSDKReady = (name === TIM.EVENT.SDK_READY)
    if (isSDKReady) {
      wx.hideLoading()
      tim.getMyProfile().then(res => {
        store.dispatch({
          type: 'updateMyInfo',
          payload: res.data
        })
      })
      tim.getBlacklist().then(res => {
        store.dispatch({
          type: 'setBlacklist',
          payload: res.data
        })
      })
    }
    store.dispatch({
      type: 'setSdkReady',
      payload: isSDKReady
    })
  }

  tim.login({userID: 'aphy358', userSig: USERSIG});
}

export default TimInitor
