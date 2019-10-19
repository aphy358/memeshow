# comment-input-popup 评论输入弹框（小视频评论输入、文章评论输入等）

### 介绍

`comment-input-popup` 是一个从底部弹出的输入框，它会随着软键盘的高度变化而移动，始终保持在软键盘顶部的位置，它的弹出不会将页面往上顶，效果类似抖音的评论输入框的弹出效果。

## 代码演示

`.json`

```josn
{
  "usingComponents": {
    "comment-input-popup": "../../components/comment-input-popup/comment-input-popup"
  }
}
```

`.wxml`

```html
<comment-input-popup
  show="{{ ifShowCommentInputPopup }}"
  replyTo="{{ replyTo }}"
  bind:hideCommentInputPopup="hideCommentInputPopup"
  bind:createNewComment="createNewComment"
></comment-input-popup>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|------|
| replyTo | 指向被回复的那个人的相关信息 | *Object* | null | - |
| show | 是否显示评论输入弹框 | *Boolean* | false | - |

### Events

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| hideCommentInputPopup | 点击遮罩层时触发 | — |
| bindblur | 输入框失去焦点时触发 | — |
| bindinput | 输入评论时触发 | — |
| bindconfirm | 点击‘完成’按钮时触发 | — |
| confirmInput | 点击‘发表’按钮时触发 | — |
| keyboardheightchange | 键盘高度变化时触发 | — |

### Functions

| 函数 | 说明 |
|------|------|
| getSysInfo() | 获取系统信息，判断当前是不是 iOS，后期会根据不同设备设置不同的交互参数来兼容 |
| animateTo(ifAnimate, translateType, offset, duration = 300) | 根据不同参数构建动画实例 |
| createNewComment() | 新建一条评论 |
| hideCommentInputPopup(ifAnimate = true) | 隐藏评论输入弹框 |
| showCommentInputPopup | 软键盘弹起时触发 |
