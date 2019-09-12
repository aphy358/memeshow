const DataProvider = require('../../utils/data_provider')

const dataProvider = new DataProvider()

// pages/test_video_swiper/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allItems: [
      {
        id: 0,
        videoUrl: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/504df73ac7bdb24a26855474a8f4246b-1541658595592.mp4',
        coverUrl: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/c306b0f3f087a53d91a089d2839cb170-1542899088893.jpg'
      },
      {
        id: 1,
        videoUrl: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/564735c99c6abefbee7ca32db6b2e2f2-1541658644065.mp4',
        coverUrl: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/15038f769bcc7d9cf6c0b0b6a8b77276-1542899088890.jpg'
      },
      {
        id: 2,
        videoUrl: 'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/0a1621b5b58a38b9e33c719b6331795c-1541662843946.mp4',
        coverUrl: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/f799be600c66e1bc87d7edd403c868d8-1542899088877.jpg'
      },
      {
        id: 3,
        videoUrl: 'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/b1ee79d1afae026fdeba8fa7fc682171-1541662852002.mp4',
        coverUrl: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/b6fe4bbb9d08d8018b789632d7d3d88f-1542899089153.jpg'
      },
      {
        id: 4,
        videoUrl: 'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/dc300b5ba82fe401bee437097cae3de3-1542820535328.mp4',
        coverUrl: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/8de977f9a058f214e525e5b99aa3d0c6-1542899089126.jpg'
      },
      {
        id: 5,
        videoUrl: 'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/9b7d44643c34838ad113282f93f17ab4-1542820568477.mp4',
        coverUrl: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/79deff30811089aff933818db02a9367-1542899089044.jpg'
      },
      {
        id: 6,
        videoUrl: 'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/ea4b35c1f59c3fdf7a28974e75325449-1542820575479.mp4',
        coverUrl: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/7b540398a32411c5eaf9991c68830347-1542899088920.jpg'
      }
    ],
    cursor: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  loadmore: function(e) {
    const fn = e.detail
    console.log('loadmore 当前游标: ', this.data.cursor, this.data.allItems.length)
    const items = []
    let cursor = this.data.cursor
    const end = (cursor+2) < this.data.allItems.length ? (cursor+2) : this.data.allItems.length
    for (let i = cursor; i < end; i++) {
      items.push(this.data.allItems[i])
    }

    if (items.length != 0) {
      cursor = cursor + items.length
      this.setData({ cursor: cursor })
    }
    fn(items)
  }
})