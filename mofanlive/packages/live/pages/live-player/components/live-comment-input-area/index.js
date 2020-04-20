import { connectComponent } from "wx-redux"
import { XIMLiveMessage } from '@/im/message'
import { IMTextMessage } from 'im/message'
const { XIMLiveBarrageMessage } = XIMLiveMessage
const IM = wx.X.IM

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  roomInfo: state.livePlayer.roomInfo
})
const mapDispatchToProps = dispatch => ({})

// 是否开启弹幕
const BARRAGE = {
  ON: '1魔币/次 和主播聊聊',
  OFF: '和主播聊聊',
}

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
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

    inputPlaceholder: BARRAGE.OFF,
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
    async createNewComment() {
      const { inputPlaceholder, inputContent, roomInfo, userProfile } = this.data
      
      // 构建一条新的回复
      const params = {
        text: inputContent,
      }
      const newComment = new IMTextMessage(params)
      newComment.fromName = userProfile.nickname
      newComment.fromAvatar = userProfile.avatarMedium

      // 创建完新的评论要把之前输入框的内容清空
      this.setData({ inputContent: '' })

      // 将信息加入到评论框
      this.triggerEvent('createNewComment', newComment)

      // 发送消息到直播间
      IM.sendMessageToGroup(roomInfo.im.groupId, newComment)

      // 如果是弹幕，则再发一条弹幕消息
      if (inputPlaceholder === BARRAGE.ON) {
        const newComment = new XIMLiveBarrageMessage(params)
        IM.sendMessageToGroup(roomInfo.im.groupId, newComment)
      }
    },

    // 键盘弹起的时候，安卓上会触发两次，而且两次给出的键盘高度不一样... 
    keyboardheightchange(e) {
      this.triggerEvent('showCommentInputPopup', { keyBoardHeight: e.detail.height })
    },

    // 切换弹幕开关
    toggleBarrage({ detail }) {
      const inputPlaceholder = detail.value
        ? BARRAGE.ON
        : BARRAGE.OFF

      this.setData({ inputPlaceholder })
    }
  },

  lifetimes: {
    detached: function () {
    },

    attached: function () {
    },
  },
}))