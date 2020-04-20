import MerchantLive from './merchant-live'
import MerchantOrder from './merchant-order'
import MerchantRefund from './merchant-refund'
import MerchantFunds from './merchant-funds'
import MerchantCategory from './merchant-category'
import MerchantProduct from './merchant-product'
import MerchantShop from './merchant-shop'

import Config from 'config'
const baseUrl = Config.api.app.baseUrl

/**
 * 卖家端 Api
 */
export default {
	MerchantLive:					new MerchantLive(baseUrl),
	MerchantOrder:        new MerchantOrder(baseUrl),
	MerchantRefund:       new MerchantRefund(baseUrl),
	MerchantFunds:        new MerchantFunds(baseUrl),
	MerchantCategory:     new MerchantCategory(baseUrl),
	MerchantProduct:      new MerchantProduct(baseUrl),
	MerchantShop:         new MerchantShop(baseUrl),
}
