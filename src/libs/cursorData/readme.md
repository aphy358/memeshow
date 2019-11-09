# cursorData 数据游标管理器

### 介绍

`cursorData` 是一个公共的用于管理数据的游标，它提供了若干接口供我们在已加载数据的基础上 向前/向后 继续加载数据。

## 代码演示

```js
/**
 * videoCursorDataDelegator.js
 * 定义具体业务层的 delegator 结构
 */

class VideoCursorDataDelegator {

  // 获取数据的游标值 cursor(item: T) : string;
  cursor(item) {
    return item.id
  }

  // 加载更多数据 loadPrev(cursor: string, queryLimit: number) : T[];
  loadPrev(cursor, queryLimit) {
    return Models.video.prev(cursor, queryLimit)
  } 

  // 加载之前数据 loadNext(cursor: string, queryLimit: number) : T[];
  loadNext(cursor, queryLimit) {
    return Models.video.next(cursor, queryLimit)
  }
}

export default VideoCursorDataDelegator
```

```js
/**
 * UI逻辑
 */
import VideoCursorDataDelegator from './assets/videoCursorDataDelegator'
import CursorData from '@/libs/cursorData/index.js'

Page({
  onLoad() {
    let videoCursorData = new CursorData(
      {
        queryLimit: 10,
        maxSize: 50,
      },
      new VideoCursorDataDelegator ()
    )

    this.setData({ videoCursorData })
  }

  loadMore() {
    this.data.videoCursorData.batchNext(10)
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