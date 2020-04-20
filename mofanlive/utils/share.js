// 分享店铺
export function shareShop(referrerId, shopId) {
  return {
    title: "这家店真心不错！内购价也很便宜，你也来看看吧~",
    path: _shareUrl(referrerId, shopId, "/pages/shop/index"),
    imageUrl:
      "https://mofanshow-avatar-1252461817.cos.ap-guangzhou.myqcloud.com/2078ba65-8a44-5a6a-76a5-489208edd92c.png"
  }
}

// 分享直播
export function shareLive(anchor, referrerId, shopId, roomId, roomCover) {
  return {
    title: `${anchor.nickname} 正在直播>>好看得停不下来！`,
    path: _shareUrl(
      referrerId,
      shopId,
      `/packages/live/pages/live-player/index?roomId=${roomId}`
    ),
    imageUrl:
      roomCover ||
      "https://mofanshow-avatar-1252461817.cos.ap-guangzhou.myqcloud.com/f5782451-4422-8992-1b60-e35a12b446e0.png"
  }
}

// 分享商品
export function shareProduct(product, referrerId, shopId) {
  let title = ""
  if (product.neigou) title = `我朋友在这个店上班！这个商品内购价只要${(product.neigou.price / 100).toFixed(2)}元哦`
  else title = `我朋友在这个店上班！这个商品内购价只要${(product.price / 100).toFixed(2)}元哦`

  return {
    title,
    path: _shareUrl(
      referrerId,
      shopId,
      `/pages/product/index?id=${product.id}`
    ),
    imageUrl: product.image
  }
}

function _shareUrl(referrerId, shopId, redirect) {
  return `/pages/index/index?shopId=${shopId}&referrerId=${referrerId}&redirect=${encodeURIComponent(redirect)}`
}

export default {
  shareShop,
  shareLive,
  shareProduct
}
