import { _comments } from './testData/comments'


Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 是否显示 hpopup
    ifShow: false,

    comments: _comments,
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

  clickBtn(){
    this.setData({
      ifShow: true
    })
  },

  hideComment(){
    this.setData({
      ifShow: false
    })
  },

  confirmInput(e){
    console.log('confirmInput: ', e.detail);
    
    // 拿到新创建的评论，先将它插入到之前的数据列表中，然后存数据库？
    let { comments } = this.data
    const newComment = e.detail

    if(newComment.commentLevel === 2){
      // 如果是二级评论，则插入到对应父评论下的子评论数组头部
      for (let i = 0; i < comments.length; i++) {
        let ele = comments[i]
        if(ele.commentId == newComment.parentId){
          ele.childComments.unshift(newComment)
          break;
        }
      }
    }else{
      // 如果是一级评论，则直接插入到数组的头部
      comments.unshift(newComment)
    }

    this.setData({ comments })
  },

  // 点击了小红心，切换点赞状态
  switchStarStatus(e){
    console.log('switchStarStatus: ', e.detail);

    const { commentId  } = e.detail
    let { comments } = this.data

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i]
      if(comment.commentId === commentId){
        comment.iAlreadyStared = !comment.iAlreadyStared
        comment.iAlreadyStared ? comment.starCount++ : comment.starCount--
        return this.setData({ comments })

      }else{
        if(comment.childComments){
          for (let j = 0; j < comment.childComments.length; j++) {
            let childComment = comment.childComments[j]
            if(childComment.commentId === commentId){
              childComment.iAlreadyStared = !childComment.iAlreadyStared
              childComment.iAlreadyStared ? childComment.starCount++ : childComment.starCount--
              return this.setData({ comments })
            }
          }
        }
      }
    }
  }
})