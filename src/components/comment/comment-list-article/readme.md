# comment-list-article 评论列表（小视频）

### 介绍

`comment-list-article` 用于展示小视频的评论列表，一般是作为一个抽象节点和 `comment-popup` 组件结合使用，可参考[抽象节点](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/generics.html)的使用

## 代码演示

`.json`

```josn
{
  "usingComponents": {
    "comment-list-article": "../../components/comment-list-article/comment-list-article"
  }
}
```

`.wxml`

```html
<comment-popup
  generic:comment-list="comment-list-article"
></comment-popup>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|------|
| comments | 评论 | *Array* | - | - |


### Events

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| hideCommentPopup | 当点击了关闭按钮时触发的事件 | — |
| showCommentInputPopup | 当点击了评论时触发的事件 | 评论实例 |
| switchStarStatus | 当点击了小红心时触发的事件 | 评论实例 |
