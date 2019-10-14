# hpopup 弹框

### 介绍

`hpopup` 是一个公共的弹框组件，用户可以指定它的弹出方向、弹框样式、可自定义弹框的动画，它内部实现了 `z-index` 的自动管理，无需用户手动设置便可以实现多个弹框的有序叠加显示。

## 代码演示

`.json`

```josn
{
  "usingComponents": {
    "hpopup": "../hpopup/hpopup"
  }
}
```

`.wxml`

```html
<hpopup
  show="{{ show }}"
  position="bottom"
  bind:touchendMask="hideCommentPopup"
></hpopup>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|------|
| show | 用来控制 `popup` 的显示和隐藏，`true` 为显示，`false` 为隐藏 | *Boolean* | `false` | - |
| customAnimation | 用户自定义动画 | *Object* | `null` | - |
| position | `popup` 出现的位置：`top`, `bottom`, `left`, `right`, `center` | *String* | `'center'` | - |
| animateType | 动画类型：`fade`, `slide` | *String* | `'slide'` | - |
| duration | 动画持续时间 | *Object \| Number* | `300` | - |
| mask | 是否有遮罩层 | *Boolean* | `true` | - |

### Events

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| tapMask | 点击遮罩层时触发 | — |
| touchendMask | 手指离开遮罩层时触发 | — |

### Functions

| 函数 | 说明 |
|------|------|
| getClassNames() | 根据 `animateType`、`position` 获取类名 |
| enter() | 显示 `popup` 的时候触发 |
| leave() | 隐藏 `popup` 的时候触发 |
| onTransitionEnd(eventType) | 每次动画结束时触发 |
