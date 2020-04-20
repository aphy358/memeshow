import BaseApi from 'api'
import Main from './main'
import Merchant from './merchant'


export default {

	// api 基类
	BaseApi,

	// 主包 api
	...Main,

	// 分包 merchant api
	...Merchant,
}
