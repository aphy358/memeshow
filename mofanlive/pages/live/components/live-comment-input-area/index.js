import { connect } from "libs/redux/index.js"


let componentConfig = {
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    // 是否显示评论输入框
    show: {
      type: Boolean,
      value: false
    },

    // 指向被回复的那个人的相关信息
    replyTo: {
      type: Object,
      value: null,
      observer(newVal) {
        let { inputPlaceholder } = this.data

        inputPlaceholder = newVal
          ? `回复 ${newVal.nickName}`
          : `说点什么...`

        this.setData({ inputPlaceholder })
      }
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
    // 输入的评论内容
    inputContent: '',

    inputPlaceholder: '说点什么...',
  },

  methods: {
    // 输入框获取焦点，显示评论输入弹层
    bindfocus(e) {
    },

    bindblur(e) {
      this.hideCommentInputPopup(false)
    },

    // 输入评论
    bindinput(e) {
      this.setData({ inputContent: e.detail.value })
    },

    // 完成输入
    bindconfirm(e) {
      this.confirmInput('force')
    },

    /**
     * 确认输入
     * @param {*} force 'force'：表示点击了键盘上的 '完成' 按钮； 不传参：表示点击了 '发表' 按钮
     */
    confirmInput(force) {
      const { inputContent } = this.data
      let content = _.trim(inputContent)

      if (content !== '') {
        this.createNewComment()
      }

      // 当点击了 '完成' 按钮，或者点击了激活状态的 '发表' 按钮的时候才隐藏评论输入框
      if (force === 'force' || content !== '') {
        this.hideCommentInputPopup()
      }
    },

    // 隐藏评论输入弹层
    hideCommentInputPopup(ifAnimate = true) {
      this.triggerEvent('hideCommentInputPopup', { ifAnimate })
    },

    // 创建一条新的评论
    createNewComment() {
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

      if (replyTo) {
        // 如果是回复其他评论，则评论级别为2
        newComment.commentLevel = 2
        newComment.parentId = replyTo.parentId || replyTo.commentId

        // 如果是回复的二级评论，则需要构建 replyTo 属性
        if (replyTo.parentId) {
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
    keyboardheightchange(e) {
      this.triggerEvent('showCommentInputPopup', { keyBoardHeight: e.detail.height })
    }
  },

  lifetimes: {
    detached: function () {
    },

    attached: function () {
    },
  },
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(componentConfig, true)

Component(connectedConfig)
