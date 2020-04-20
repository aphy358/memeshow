import BaseApi from 'api'
import PaymentType from '@/constants/payment-type'

/**
 * 订单
 */
export default class OrderApi extends BaseApi {

	/**
	 * 订单详情
	 * 
	 * @param {String} id 
	 */
	async retrieve(id) {
		return await this.get(`/order`, { id })
	}

	/**
	 * 订单列表
	 * 
	 * @param {Number} cursor - 当前页最后一个创建订单的时间戳
	 * @param {String} type - [all, unpaid, undelivered, delivering]
	 */
	async list(params) {
		return await this.get(`/orders`, params)
	}

	/**
	 * 签收订单
	 * 
	 * @param {String} orderId 
	 */
	async receive({ orderId }) {
		return await this.post(`/order/receive`, { orderId })
	}

	/**
	 * 取消订单
	 * 
	 * @param {String} orderId - 订单号 
	 * @param {String} reason - 关闭原因 
	 */
	async cancel(params) {
		return await this.post(`/order/cancel`, params)
	}

	/**
	 * 支付订单
	 * 
	 * @param {String} orderId 
	 * @param {String} channel - 支付渠道（alipay、alipay_wap、alipay_qr、alipay_scan、alipay_lite、alipay_pc_direct、wx、wx_pub、wx_pub_qr、wx_pub_scan、wx_wap、wx_lite、qpay、qpay_pub）
	 */
	async pay({ orderId, channel = PaymentType.WxLite }) {
		return await this.post(`/order/pay`, { orderId, channel })
	}

	/**
	 * 物流详情
	 * 
	 * @param {String} id - 订单号
	 */
	async delivery(id) {
		return await this.get(`/order/delivery`, { id })
	}

	/**
	 * 物流追踪
	 * 
	 * @param {String} deliveryId - 发货单Id
	 */
	async trace(deliveryId) {
		return await this.get(`/logistics/trace`, { deliveryId })
	}

	/**
	 * 订单数量
	 */
	async count() {
		return await this.get("/order/count")
	}
}
