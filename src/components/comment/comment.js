
Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'shared'
  },

  properties: {
    // 评论数据源
    comments: {
      type: Array,
      value: [],
      observer(newVal) {
        if (!this.data.initialized) return;
      }
    },

    // 是否显示评论弹框
    ifShow: {
      type: Boolean,
      value: true
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

    // 输入框是否处于 focus 状态
    isFocusCommentInput: false,

    // 是否显示评论输入弹层
    ifShowCommentInputPopup: false,

    // 输入的评论内容
    inputContent: '',

    inputPlaceholder: '有爱评论，说点儿好听的～',

    // 构建一条新信息
    newComment: {},

    // 是否是 iOS，因为 iOS 和 Android 上键盘弹起体验不一样，所以要兼容
    isIOS: true,

    initialized: false
  },

  /**
   * 组件的方法列表
   */
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

    // 通知上层关闭评论列表
    hideComment(){
      this.triggerEvent('hideComment')
    },

    // 隐藏评论输入弹层
    hideCommentInputPopup(ifAnimate = true){
      const { popupBodyHeight } = this.data
      this.setData({
        ifShowCommentInputPopup: false,
        customAnimation: this.animateTo(ifAnimate, 'translateY', popupBodyHeight),
      })

      wx.hideKeyboard()
    },

    // 显示评论输入弹层
    showCommentInputPopup(){
      const { popupBodyHeight, popupInputHeight, emojiOuterHeight, keyBoardHeight, isIOS } = this.data
      let offset = popupBodyHeight - emojiOuterHeight - keyBoardHeight - popupInputHeight
      this.setData({ 
        customAnimation: this.animateTo(true, 'translateY', offset, isIOS ? 400 : 10)
      })
    },

    // 评论输入框获得焦点
    focusCommentInput(e){
      let { inputPlaceholder } = this.data

      // 构建一条新的回复，这里的 avatar/userId/nickName 要用当前用户的信息
      let newComment = {
        avatar: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1197039898,3476709019&fm=179&app=42&f=JPEG?w=121&h=140',
        userId: 29,
        nickName: 'it\'s me',
        comment: '',
        commentTime: +new Date,
        commentId: +new Date,
        commentLevel: 1,
        starCount: 0
      }
      
      if(e && e.target && e.target.dataset && e.target.dataset.replyto){
        const replyto = e.target.dataset.replyto
        
        // 如果是回复其他评论，则评论级别为2
        newComment.commentLevel = 2
        newComment.parentId = replyto.parentId || replyto.commentId
        inputPlaceholder = `回复 ${replyto.nickName}`

        // 如果是回复的二级评论，则需要构建 replyTo 属性
        if(replyto.parentId){
          newComment.replyTo = {
            userId: replyto.userId,
            nickName: replyto.nickName,
          }
        }
      }else{
        inputPlaceholder = `有爱评论，说点儿好听的～`
      }
      
      this.setData({
        isFocusCommentInput: true,
        ifShowCommentInputPopup: true,
        inputPlaceholder,
        newComment
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
      const { inputContent, newComment } = this.data

      // 当点击了 '完成' 按钮，或者点击了激活状态的 '发表' 按钮的时候才执行
      if(force === 'force' || inputContent !== ''){
        // 然后清空输入的内容、将 '发表' 按钮置灰、将输入框的 focus 状态设置为 false
        this.setData({ inputContent: '' })
        this.hideCommentInputPopup()
        
        // 将用户的输入传递到上层，让它重新组织数据源，后续再将评论存数据库
        newComment.comment = inputContent
        this.triggerEvent('confirmInput', newComment)
      }
    },

    // 切换点赞状态
    switchStarStatus(e){
      this.triggerEvent('switchStarStatus', e.target.dataset.starto)
    },
  
    animateTo(ifAnimate, translateType, offset, duration = 300) {
      return wx.createAnimation({
        transformOrigin: '50% 50%',
        duration: ifAnimate ? duration : 0,
        timingFunction: 'ease-out',
        delay: 0
      })[translateType](offset).step().export()
    },
  
    // 键盘弹起的时候，安卓上会触发两次，而且两次给出的键盘高度不一样... and I don't know why
    keyboardheightchange(event){
      // 键盘弹起
      if(event.detail.height > 0){
        const { isIOS } = this.data

        // 如果是安卓，则只存第一次键盘弹起的高度，如果是 iOS，则每次变化高度都存起来
        if(isIOS || !this.data.keyBoardHeight){
          this.setData({ keyBoardHeight: event.detail.height })
        }
  
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
