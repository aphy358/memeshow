import XIMMessageType from './types'
import XIMProductMessage from './ec/product'
import * as XIMLiveMessage from './live'
const Live = XIMMessageType.Live
const {
	XIMLiveEnterRoomMessage,
	XIMLiveSubscribeMessage,
	XIMLivePurchasingMessage,
	XIMLivePurchasedMessage,
	XIMLiveShareLiveMessage,
	XIMLiveIntroduceProductMessage,
	XIMLiveAddProductsMessage,
	XIMLiveRemoveProductsMessage,
	XIMLiveGiftMessage,
	XIMLiveCouponMessage,
	XIMLiveBarrageMessage
} = XIMLiveMessage

const XIMMessages = {
	[Live.EnterRoom]:  				XIMLiveEnterRoomMessage,
	[Live.Subscribe]:  				XIMLiveSubscribeMessage,
	[Live.Purchasing]: 				XIMLivePurchasingMessage,
	[Live.Purchased]:  				XIMLivePurchasedMessage,
	[Live.ShareLive]:  				XIMLiveShareLiveMessage,
	[Live.IntroduceProduct]:	XIMLiveIntroduceProductMessage,
	[Live.AddProducts]:				XIMLiveAddProductsMessage,
	[Live.RemoveProducts]:		XIMLiveRemoveProductsMessage,
	[Live.Gift]:       				XIMLiveGiftMessage,
	[Live.Coupon]:     				XIMLiveCouponMessage,
	[Live.Barrage]:    				XIMLiveBarrageMessage,
}

export {
	XIMMessages,
	XIMMessageType,
	XIMProductMessage,
	XIMLiveMessage,
}
