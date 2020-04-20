import BaseApi from "api"

/**
 * 资金账户
 */

export default class MerchantFundsApi extends BaseApi {
  /**
   * 获取资金账户信息
   */

  async profile() {
    return await this.get("/fund")
  }

  /**
   * 获取收支明细
   *
   * @param {object} param
   * @param {string} param.type - 类型，all => 全部，own_income => 自营收入，broker_commission => 分销佣金，others => 其他
   * @param {string} param.startTime - 开始时间
   * @param {string} param.endTime - 结束时间
   * @param {string} param.cursor - 查询游标
   */

  async list(params) {
    return await this.get("/fund/list", params)
  }

  /**
   * 获取待结算收入明细
   *
   * @param {object} param
   * @param {string} param.type - 类型
   * @param {string} param.cursor - 查询游标
   */

  async unsettled(cursor) {
    return await this.get("/fund/income/order", { cursor })
  }

  /**
   * 获取收支明细详情
   *
   * @param {string} id
   */

  async detail(id) {
    return await this.get("/fund/detail", { id })
  }
}
