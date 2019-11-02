import _ from 'lodash'
import { animateTo } from '@/components/common/utils'

Component({
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
      value: null,
      observer(newVal) {
        if (!this.data.initialized) return;

        let { inputPlaceholder } = this.data

        inputPlaceholder = newVal
          ? `回复 ${newVal.nickName}`
          : `有爱评论，说点儿好听的～`

        this.setData({ inputPlaceholder })
      }
    },

  },

  data: {
    // 评论输入弹层动画
    customAnimation: {},

    keyBoardHeight: 0,

    // 保存评论输入框弹层的总高度
    popupBodyHeight: 0,

    // 保存评论输入框的高度
    popupInputHeight: 0,

    // 先占个位，后续如果要自定义 emoji 的时候再启用
    emojiOuterHeight: 0,

    // 输入的评论内容
    inputContent: '',

    inputPlaceholder: '有爱评论，说点儿好听的～',

    // 是否是 iOS，因为 iOS 和 Android 上键盘弹起体验不一样，所以要兼容
    isIOS: true,

    initialized: false
  },

  methods: {
    initialize(){
      this.getSysInfo()

      wx.createSelectorQuery().in(this).select('.comment-input-inner').boundingClientRect().exec(res => {
        // 保存评论输入框弹层的高度
        this.data.popupInputHeight = res[0].height
        this.data.initialized = true
      })

      // 查询评论输入框的总高度，然后设置它的样式，使他
      wx.createSelectorQuery().in(this).select('.comment-input-wrap').boundingClientRect().exec(res => {
        this.data.popupBodyHeight = res[0].height

        // 初始状态先隐藏到屏幕底部
        this.hideCommentInputPopup(false)
      })
    },

    // 获取系统信息，判断当前是不是 iOS，后期会根据不同设备设置不同的交互参数来兼容
    getSysInfo(){
      const sysInfo = wx.getSystemInfoSync()
      this.data.isIOS = sysInfo.system.indexOf('iOS') !== -1
    },

    // 隐藏评论输入弹层
    hideCommentInputPopup(ifAnimate = true){
      const { popupBodyHeight } = this.data
      let duration = ifAnimate ? 300 : 0

      this.setData({
        customAnimation: animateTo({'translateY': popupBodyHeight}, duration)
      })

      wx.hideKeyboard({
        complete: res => {
          this.triggerEvent('hideCommentInputPopup')
        }
      })
    },

    // 显示评论输入弹层
    showCommentInputPopup(){
      const { popupBodyHeight, popupInputHeight, emojiOuterHeight, keyBoardHeight, isIOS } = this.data
      let offset = popupBodyHeight - emojiOuterHeight - keyBoardHeight - popupInputHeight
      let duration = isIOS ? 400 : 10

      this.setData({ 
        customAnimation: animateTo({'translateY': offset}, duration)
      })
    },
  
    // 输入框获取焦点，显示评论输入弹层
    bindfocus(e){
    },

    bindblur(e){
      this.hideCommentInputPopup(false)
    },

    // 输入评论
    bindinput(e){
      this.setData({ inputContent: e.detail.value })
    },

    // 完成输入
    bindconfirm(e){
      this.confirmInput('force')
    },

    /**
     * 确认输入
     * @param {*} force 'force'：表示点击了键盘上的 '完成' 按钮； 不传参：表示点击了 '发表' 按钮
     */
    confirmInput(force){
      const { inputContent } = this.data
      let content = _.trim(inputContent)

      if(content !== ''){
        this.createNewComment()
      }

      // 当点击了 '完成' 按钮，或者点击了激活状态的 '发表' 按钮的时候才隐藏评论输入框
      if(force === 'force' || content !== ''){
        this.hideCommentInputPopup()
      }
    },

    // 创建一条新的评论
    createNewComment(){
      const { replyTo, inputContent } = this.data

      // 构建一条新的回复，这里的 avatar/userId/nickName 要用当前用户的信息
      let newComment = {
        avatar: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1197039898,3476709019&fm=179&app=42&f=JPEG?w=121&h=140',
        userId: 29,
        nickName: 'it\'s me',
        comment: inputContent,
        commentTime: +new Date,
        commentId: +new Date,
        commentLevel: 1,
        starCount: 0
      }
      
      if(replyTo){
        // 如果是回复其他评论，则评论级别为2
        newComment.commentLevel = 2
        newComment.parentId = replyTo.parentId || replyTo.commentId

        // 如果是回复的二级评论，则需要构建 replyTo 属性
        if(replyTo.parentId){
          newComment.replyTo = {
            userId: replyTo.userId,
            nickName: replyTo.nickName,
          }
        }
      }

      // 创建完新的评论要把之前输入框的内容清空
      this.setData({ inputContent: '' })
      this.triggerEvent('createNewComment', newComment)
    },

    // 键盘弹起的时候，安卓上会触发两次，而且两次给出的键盘高度不一样... 
    keyboardheightchange(event){
      const { height } = event.detail
      
      // iOS 上的键盘高度可能不一样，会随着输入法的切换而变动，所以每次都要重新设置键盘高度
      if(height > 230){
        this.setData({ keyBoardHeight: height })

        // 则显示评论输入框
        this.showCommentInputPopup()
      }
    }
  },

  lifetimes: {
    ready() {
      this.initialize()
    }
  }
})
