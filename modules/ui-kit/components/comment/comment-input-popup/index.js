import { safeArea } from "ui-kit/behaviors"
import { animateTo } from 'libs/utils.js';

Component({
  behaviors: [safeArea()],

  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    // 是否显示评论输入框
    show: {
      type: Boolean,
      value: false,
      observer(newVal) {
        if (!this.data.initialized) return;
      }
    },

    // 指向被回复的那个人的相关信息
    replyTo: {
      type: Object,
      value: null
    },

    // 键盘弹起时，是否自动上推页面，false 不上推
    adjustPosition: {
      type: Boolean,
      value: false,
    },

    // focus时，点击页面的时候收起键盘
    holdKeyboard: {
      type: Boolean,
      value: true,
    },
  },

  data: {
    // 评论输入弹层动画
    customAnimation: {},

    // 保存评论输入框弹层的总高度
    popupBodyHeight: 0,

    // 保存评论输入框的高度
    popupInputHeight: 0,

    // 先占个位，后续如果要自定义 emoji 的时候再启用
    emojiOuterHeight: 0,

    initialized: false
  },

  methods: {
    initialize(){
      wx.createSelectorQuery().in(this).select('.comment-input-inner').boundingClientRect().exec(res => {
        // 保存评论输入框弹层的高度
        this.data.popupInputHeight = res[0].height
        this.data.initialized = true
      })

      // 查询评论输入框的总高度，然后设置它的样式，使他
      wx.createSelectorQuery().in(this).select('.comment-input-wrap').boundingClientRect().exec(res => {
        this.data.popupBodyHeight = res[0].height

        // 初始状态先隐藏到屏幕底部
        this._hideCommentInputPopup(false)
      })
    },

    // 隐藏评论输入弹层
    _hideCommentInputPopup(ifAnimate = true){
      const { popupBodyHeight } = this.data
      let duration = ifAnimate ? 300 : 0

      this.setData({
        customAnimation: animateTo({'translateY': popupBodyHeight}, duration)
      })

      wx.hideKeyboard()
      this.triggerEvent('hideCommentInputPopup')
    },

    // 隐藏评论输入弹层
    hideCommentInputPopup(e) {
      this._hideCommentInputPopup(e.detail.ifAnimate)
    },

    // 显示评论输入弹层
    showCommentInputPopup(e){
      let keyBoardHeight = e.detail.keyBoardHeight

      // iOS 上的键盘高度可能不一样，会随着输入法的切换而变动，所以每次都要重新设置键盘高度
      if(keyBoardHeight > 230) {
        const { popupBodyHeight, popupInputHeight, emojiOuterHeight, isIPhone } = this.data
        let offset = popupBodyHeight - emojiOuterHeight - keyBoardHeight - popupInputHeight
        let duration = isIPhone ? 400 : 10
  
        this.setData({
          customAnimation: animateTo({'translateY': offset}, duration)
        })
      }
    },

    createNewComment(e) {
      this.triggerEvent('createNewComment', e.detail)
    },
  },

  lifetimes: {
    ready() {
      this.initialize()
    }
  }
})
