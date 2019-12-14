# bigListScroller 大列表滚动管理器

### 介绍

`bigListScroller` 是一个用于大列表滚动的管理器，它通过限制列表中显示的数据条数以达到性能优化的目的（小程序端，列表元素过多的话，性能很糟糕）。

### 注意事项

列表中 item 之间的间隙最好用 padding 设置，不然无法准确计算占位元素的高度值。（由于单位的多元性：'rpx'、'rem' 等不好计算 margin 的准确值）

## 代码演示

```js
// 引入
import BigListScroller from 'libs/bigListScroller/index.js'
const liveBigListScroller = new BigListScroller({
  dataList: 'comments',           // 必填，大列表在页面中渲染的数据项
  itemSelector: '.comment-item',  // 必填，每个数据项在页面中的选择器
  listHeight: 300                 // 列表可视区的高度
})

let componentConfig = {
  methods: {
    // 列表滚动
    scrollComment(e) {
      // 列表滚动，调用 scroll，它会处理数据项的显示与隐藏
      liveBigListScroller.scrollList(e)
    },

    // 新增数据项
    addComment() {
      let comment = {
        name: 'Rita',
        text: '猪猪侠飞过来了～'
      }

      liveBigListScroller.addItems(comment)
    },
  },

  lifetimes: {
    ready() {
      // 绑定上下文
      liveBigListScroller.bindContext(this)
    },
  }
}
```

```html
<scroll-view scroll-y bindscroll="scrollComment">
  <!-- 评论框顶部占位元素 -->
  <view style="{{ _pholderTopStyle_ }}"></view>

  <!-- 这里 data-iterator 的写法是固定的，也是必须的 wx:if 条件也是固定的 -->
  <view 
    class="comment-item"
    wx:for="{{ comments }}"
    wx:key="index"
    wx:if="{{ !item.hide }}"
    data-iterator="{{ item.iterator }}"
  >
    <slot />
  </view>

  <!-- 评论框底部占位元素 -->
  <view style="{{ _pholderBottomStyle_ }}"></view>
</scroll-view>
```
