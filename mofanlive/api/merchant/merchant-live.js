import BaseApi from "api"

/**
 * 主播直播
 */

export default class LiveApi extends BaseApi {
  /**
   * 获取直播间信息
   */

  async getRoomDetail(roomId) {
    return await this.get("/live/getAnchorRoomInfo", { roomId })
  }

  /**
   * 主播心跳
   *
   * @param {*} roomId
   */

  async heartbeat(roomId) {
    return await this.post("/live/anchorHeartbeat", { roomId })
  }

  /**
   * 添加直播商品
   *
   * @param {*} params
   * @param {string} params.roomId
   * @param {string[]} params.productIds
   */

  async addProducts(params) {
    return await this.post("/live/addProducts", params)
  }

  /**
   * 删除直播商品
   *
   * @param {*} params
   * @param {string} params.roomId
   * @param {string[]} params.productIds
   */

  async removeProducts(params) {
    return await this.post("/live/removeProducts", params)
  }

  /**
   * 设置正在讲解的商品
   *
   * @param {*} params
   * @param {string} params.roomId
   * @param {string} params.productId
   */

  async setExplainProduct(params) {
    return await this.post("/live/setExplainProduct", params)
  }

  /**
   * 取消正在讲解的商品
   *
   * @param {*} params
   * @param {string} params.roomId
   * @param {string} params.productId
   */

  async removeExplainProduct(params) {
    return await this.post("/live/unsetExplainProduct", params)
  }
}
