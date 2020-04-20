/**
 * 自定义消息类型
 */
export default {
	// 商品消息
	Product: 'Product',

	// 直播间消息
	Live: {

		// 文字评论
		Text: 1000,

		// 语音评论
		Voice: 1001,

		// 用户进入房间
		EnterRoom: 1002,

		// 用户分享直播间
		ShareLive: 1003,

		// 用户分享商品
		ShareProduct: 1004,

		// 用户分享店铺
		ShareShop: 1005,

		// 用户添加到购物车准备购买
		Purchasing: 1006,

		// 用户下单购买
		Purchased: 1007,

		// 用户打赏礼物
		Gift: 1008,

		// 设置正在解说商品
		IntroduceProduct: 1009,

		// 添加直播间商品
		AddProducts: 1010,

		// 移除直播间商品
		RemoveProducts: 1011,




		// 用户关注
		Subscribe: 'Subscribe',

		// 优惠券
		Coupon: 'Coupon',

		// 弹幕
		Barrage: 'Barrage',
	}
}
