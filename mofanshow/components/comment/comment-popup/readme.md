# comment-popup 评论弹框（小视频评论、文章评论等）

### 介绍

`comment-popup` 是一个承载着评论列表的底部弹框，评论列表会以抽象节点的形式插入 `comment-popup`，比如小视频评论列表组件 `comment-list-video`，可参考[抽象节点](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/generics.html)的使用

## 代码演示

1、首先在 `comment-popup.json` 中注册一个 `comment-list` 插槽，用户可根据不同的业务场景使用不同的抽象组件来填充该插槽

```json
{
  "componentGenerics": {
    "comment-list": true
  }
}
```

2、在引用该组件的页面的 `.json` 文件里引入相关组件

```json
{
  "usingComponents": {
    "comment-popup": "../../components/comment-popup/comment-popup",
    "comment-list-video": "../../components/comment-list-video/comment-list-video"
  }
}
```

3、在引用该组件的页面的 `.wxml` 文件里引入相关组件，并插入相关的抽象组件，比如：`comment-list-video`

```html
<comment-popup
  generic:comment-list="comment-list-video"
></comment-popup>
```

#### Note: 相应的，如果是文章评论页面，则只要将 `comment-list-video` 替换成你想要的抽象组件即可，比如：`comment-list-article`

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|------|
| comments | 评论 | *Array* | [] | - |
| show | 是否显示评论弹框 | *Boolean* | false | - |


### Events

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| hideCommentPopup | 当点击了关闭按钮时触发的事件 | — |
| showCommentInputPopup | 当点击了评论时触发的事件 | 评论实例 |
| switchStarStatus | 当点击了小红心时触发的事件 | 评论实例 |
