import { combineReducers } from 'redux'
import userProfile from './user-profile'
import sellerProfile from './seller-profile'
import referrer from './referrer'
import context from './context'


import neigou from './neigou'
import live from './live'
import audits from './audits'
import createRefund from './create-refund'
import merchantOrders from './merchant-orders'
import myCenterOrders from './my-center-orders'
import livePlayer from './live-player'
import systemConfig from './system-config'


export default combineReducers({
  userProfile,
  sellerProfile,
  referrer,
  context,
  
  live,
  audits,
  neigou,
  createRefund,
  merchantOrders,
  myCenterOrders,
  livePlayer,
  systemConfig,
})