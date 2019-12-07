# progress 进度条

## 代码演示

`.json` 引入组件

```josn
{
  "usingComponents": {
    "progress": "../../components/progress/progress"
  }
}
```

### 基础用法

```html
<!-- 进度条默认为蓝色，使用 `percentage` 属性来设置当前进度 -->
<progress percentage="50" />
```

### 线条粗细

```html
<!-- 通过stroke-width可以设置进度条的粗细 -->
<progress percentage="50" stroke-width="8" />
```

### 置灰

```html
<progress inactive percentage="50" />
```

### 自定义动画

```html
<progress custom-animation="{{ customAnimation }}" />
```

```js
Page({
  data: {
    customAnimation: {},
  },

  onShow: function () {
    let customAnimation = animateTo(
      { 'width': '100%' }, 
      20000, 
      'linear'
    )

    this.setData({ customAnimation })
  },
})
```

### 样式定制


```html
<!-- 可以使用pivot-text属性自定义文字，color属性自定义进度条颜色 -->
<progress
  pivot-text="橙色"
  color="#f2826a"
  percentage="25"
/>

<progress
  pivot-text="红色"
  color="#ee0a24"
  percentage="50"
/>

<progress
  percentage="75"
  pivot-text="紫色"
  pivot-color="#7232dd"
  color="linear-gradient(to right, #be99ff, #7232dd)"
/>
```


## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| inactive | 是否置灰 | *boolean* | `false` | - |
| percentage | 进度百分比 | *number* | `false` | - |
| stroke-width | 进度条粗细，默认单位为`px` | *string \| number* | `4px` | - |
| show-pivot | 是否显示进度文字 | *boolean* | `true` | - |
| color | 进度条颜色 | *string* | `#1989fa` | - |
| text-color | 进度条文字颜色 | *string* | `#fff` | - |
| pivot-text | 文字显示 | *string* | 百分比文字 | - |
| pivot-color | 文字背景色 | *string* | 与进度条颜色一致 | - |
| custom-animation | 自定义进度条动画 | *object* | `null` | - |
| loading | 是否处于加载等待中 | *boolean* | `false` | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |