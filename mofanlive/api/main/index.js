import Auth from './auth'
import Cart from './cart'
import Cashier from './cashier'
import Coupon from './coupon'
import InternalBuy from './internal-buy'
import Order from './order'
import Product from './product'
import UserProfile from './user-profile'
import Refund from './refund'
import Shop from './shop'
import Live from './live'
import Share from './share'

import Test from './test'

import Config from 'config'
const baseUrl = Config.api.app.baseUrl

export default {
	Auth: new Auth(baseUrl),
	Cart: new Cart(baseUrl),
	Cashier: new Cashier(baseUrl),
	Coupon: new Coupon(baseUrl),
	InternalBuy: new InternalBuy(baseUrl),
	Order: new Order(baseUrl),
	Product: new Product(baseUrl),
	UserProfile: new UserProfile(baseUrl),
	Refund: new Refund(baseUrl),
	Shop: new Shop(baseUrl),
	Live: new Live(baseUrl),
	Share: new Share(baseUrl),
	Test: new Test(baseUrl),
}
