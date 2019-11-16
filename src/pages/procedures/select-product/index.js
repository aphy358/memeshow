import procedures from '../index'

Page({
  data: {
    sid: 0,
    list: [{
      id: '1',
      title: '豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱',
      soldCount: 122,
      profit: 1.5,
      price: 15.5,
      image: 'http://img.hznzcn.com/images/goods_new/20180529/20180529163304418.jpg'
    }, {
      id: '2',
      title: '豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱',
      soldCount: 122,
      profit: 1.5,
      price: 15.5,
      image: 'http://img.hznzcn.com/images/goods_new/20180529/20180529163304418.jpg'
    }],
    pageNo: 1,

    isLoading: false,
    hasMore: false
  },

  onLoad: function (option) {
    this.data.sid = option.sid
  },

  onReady() {
    const instance = procedures.get(this.data.sid)
    instance.register(this)
    console.log('procedure args: ', instance.args)

    const emitter = instance.asProcedure()
    emitter.on('toProcedure', data => console.log('from caller: ', data))
    setTimeout(() => {
      emitter.emit('toCaller', { id: instance.id })
    }, 4000)
  },
  onUnload() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit('complete')
    }
  },

  /**
   * 跳转到商品详情页
   * @param {event} e - 点击商品时的事件
   */
  navToProductDetail(e) {
  },

  /**
   * 推入商品编辑的页面
   * @param {object} e 
   */
  navToEditPromt(e) {
    const id = e.currentTarget.dataset.productid
    wx.navigateTo({
      url: `./edit?id=${id}&sid=${this.data.sid}`
    })
  },

  /**
   * 更新页面
   */
  updatePages() {
    const pageNo = this.data.pageNo || 1
  },

  /**
   * 处理错误信息
   * 
   * @param {Error} err 
   */
  handleErr(err) {
    // so something

    const instance = procedures.get(this.data.sid).asProcedure()
    instance.emit('error', err)
    wx.navigateBack({ delta: 1 })
  }
})