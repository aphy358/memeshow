import SubscribeTemplates from '@/constants/wx-subscribe-templates';

async function subscribeShare() {
  if (!wx.getStorageSync('subscribe_share')) {
    const res = await wx.requestSubscribeMessageAsync({ tmplIds: [SubscribeTemplates.Share] })
    
    if (res.errMsg === "requestSubscribeMessage:ok") {
      wx.setStorageSync('subscribe_share', true)
    }
  }
}


export {
  subscribeShare,
}
