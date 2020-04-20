import BaseApi from 'api'

/**
 * 内购业务
 */

export default class InternalBuy extends BaseApi {

	/**
	 * 签到领取
	 */

	async checkIn(id) {
		return await this.post('/internalBuy/checkIn')
	}

  /**
   * 内购券流水
   *
   * @param {number} cursor - 查询游标
   */

	async voucherHistory(cursor = 0) {
		return await this.get('/internalBuy/couponHistories', { cursor })
  }

  /**
   * 查询内购余额
   */

  async balance() {
		return await this.get('/internalBuy/balance')
  }
}
