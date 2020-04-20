/**
 * 用户当前的上下文
 */
export default {
	// 是否是卖家身份
	isMerchant: false,

	// 用户当前访问的店铺
	shopId: 0,

	// 用户在当前访问店铺的推荐人ID
	referrerId: 0,

	// 当前访问的店铺信息
	shop: {},

	// 用户在当前店铺的分享关系链
	shareRelations: {}
}