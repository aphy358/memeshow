// pages/ecommerse/order/index.js
import { orderStatus } from '../../../utils/constant.js';
import { value2Text, constant2Array } from '../../../utils/common.js';

const orders = [
  {id: 1, type: 'pending', amount: 380.00, ctime: '2018-11-6', products: [
    { id: 1, src: 'https://img12.360buyimg.com/n7/jfs/t19915/365/1774534147/187809/3d67b45a/5b5fff4fN0367a17a.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99, num: 3 },
    { id: 1, src: 'https://img13.360buyimg.com/n7/jfs/t16183/214/1753880049/292928/440f1837/5a5ec23dN6218dc69.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99, num: 3 },
    { id: 1, src: 'http://img13.360buyimg.com/n7/jfs/t1/3748/30/2299/180069/5b9633cbEa35704f1/f4652cef0e1487a7.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99, num: 3 },
    { id: 1, src: 'http://img13.360buyimg.com/n7/jfs/t1/4692/32/11472/490775/5bce95cdE92496f8e/5d9d0660795074ed.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99, num: 3 }]
  },
  {
    id: 1, type: 'cancle', amount: 900.00, ctime: '2018-11-5', products: [
      { id: 1, src: 'http://img11.360buyimg.com/n7/jfs/t20365/316/1216991915/173915/859d65d4/5b221170Nfc40038d.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99, num: 3 }]
  },
  {
    id: 1, type: 'received', amount: 900.00, ctime: '2018-11-4', products: [
      { id: 1, src: 'http://img10.360buyimg.com/n7/jfs/t26605/333/1104106013/224672/92406527/5bc16e38N00bd6d98.jpg', title: '香水有毒', subtitle: '【买3送1】blings爆款网红COCO小姐等淡香水！蓝风铃小雏菊独角兽明星抖音女士持久', salePrice: 990, realPrice: 99, num: 3 }]
  }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: orderStatus, //订单状态常量定义
    orderStatusToArray: [], //订单状态常量对象转换成数组
    orders: orders,
    currentStatus: 'all', //订单单签状态
  },
  /**
   * 切换订单状态
   */
  clickNav(e) {
    const status = e.target.dataset.status
    console.log('status:', status)
    this.setData({
      currentStatus: status
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = constant2Array(orderStatus)
    this.setData({
      orderStatusToArray: data
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})