# avatar 头像

### 介绍

`avatar` 是一个公共的头像组件。

## 代码演示

`.json`

```josn
{
  "usingComponents": {
    "avatar": "/components/avatar/index"
  }
}
```

`.wxml`

```html
<avatar
  type="3"
  circle
  size="80rpx"
  url="{{ url }}"
  border="2rpx solid white"
  bind:tapAvatar="onTapAvatar"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|------|
| type | 头像类型 | *Number* | `1` | - |
| url | 头像 url | *String* | `''` | - |
| size | 头像大小 | *String* | `'88rpx'` | - |
| circle | 是否为圆形头像 | *Boolean* | `false` | - |
| border | 头像边框 | *String* | `''` | - |

### Events

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| tapAvatar | 点击头像触发 | — |
