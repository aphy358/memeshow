# cursorData 数据游标管理器

### 介绍

`cursorData` 是一个公共的用于管理数据的游标，它提供了若干接口供我们在已加载数据的基础上 向前/向后 继续加载数据。

## 代码演示

```js
/**
 * commentCursorDataDelegator.js
 * 定义具体业务层的 delegator 结构
 */

class CommentCursorDataDelegator {

  cursor(item) {
    return item.commentId
  }

  loadPrev(options) {
    const { cursor, parentId, queryLimit } = options

    // return Models.video.prev(cursor, queryLimit)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let res = []
        ...
        resolve(res)
      }, 300);
    })
  }

  loadNext(options) {
    const { cursor, parentId, queryLimit } = options

    // return Models.video.next(cursor, queryLimit)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let res = []
        ...
        resolve(res)
      }, 300);
    })
  }
}

export default CommentCursorDataDelegator
```

```js
/**
 * UI逻辑
 */
import CommentCursorDataDelegator from './assets/commentCursorDataDelegator'
import CursorData from '@/libs/cursorData/index.js'

const commentCursorData = new CursorData(
  { queryLimit: 10, parentId: commentId },
  new CommentCursorDataDelegator ()
)

Page({
  onLoad() {
  }

  loadMore() {
    commentCursorData.batchNext(10)
  }
})
```

## API

### 参数

| 参数 | 说明 | 类型 |
|------|------|------|
| options | 属性有： `queryLimit`（表示一次加载多少个）、`maxSize`（表示数据列表 `dataList` 最多缓存多少项数据） 等 | *Object* |
| delegator | 业务相关，包含接口：`cursor`、`loadPrev`、`loadNext` | *Object* |

### 字段

| 参数 | 说明 | 类型 |
|------|------|------|
| dataList | 数据列表 | *Array* |
| index | 当前项索引 | *Number* | `null` | - |

### 方法

| 函数 | 说明 |
|------|------|
| next() | 获取下一项数据 |
| batchNext() | 向后批量获取 |
| prev() | 获取前一项数据 |
| batchPrev(eventType) | 向前批量获取 |