import userProfile from "./user-profile"
import sellerProfile from "./seller-profile"
import referrer from './referrer'
import context from './context'

import neigou from "./neigou"
import live from "./live"
import audits from "./audits"
import createRefund from "./create-refund"
import merchantOrders from "./merchant-orders"
import myCenterOrders from "./my-center-orders"
import livePlayer from "./live-player"
import systemConfig from "./system-config"

// 初始状态
export default {
  // 用户信息
  userProfile,
  // 用户卖家信息
  sellerProfile,
  // 用户进入小程序时的推荐信息
  referrer,
  // 用户当前的上下文
  context,


  live,

  audits,

  neigou,

  createRefund,

  merchantOrders,

  myCenterOrders,
  
  livePlayer,

  // 系统配置
  systemConfig,
}
