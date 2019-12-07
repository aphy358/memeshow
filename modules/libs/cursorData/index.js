import _ from 'lodash'
import { arrayLenthLimit } from './util'


/**
 * 游标数据管理
 */
class CursorData {
  constructor(options, delegator) {
    this.options = options
    this.delegator = delegator

    this.dataList = []
    this.index = 0
  }

  async _loadNext() {
    const { maxSize } = this.options

    // this.dataList 为空，说明是第一次加载，此时还没有游标
    const cursor = this.dataList.length > 0
      ? this.delegator.cursor(_.last(this.dataList))
      : null

    const fetched = await this.delegator.loadNext({ cursor, ...this.options })

    // 用户可通过 maxSize 来限定最多缓存的记录条数
    if (maxSize) {
      // 预先算出数组限制长度前后的长度差
      const lenDiff = Math.max(this.dataList.length + fetched.length, maxSize) - maxSize
      this.dataList = arrayLenthLimit(_.concat(this.dataList, fetched), maxSize)
      this.index -= lenDiff

    } else {
      this.dataList = _.concat(this.dataList, fetched)
    }
  }

  // 获取下一项数据
  async next() {
    if(this.dataList.length < 1)  this.index = -1

    if (++this.index >= this.dataList.length) {
      await this._loadNext()
    }

    return this.dataList[this.index]
  }

  // 向后批量获取
  async batchNext(n) {
    let resList = []

    for (let i = 0; i < n; i++) {
      let res = await this.next()
      resList.push(res)
    }

    return resList
  }

  async _loadPrev() {
    const { maxSize } = this.options

    // this.dataList 为空，说明是第一次加载，此时还没有游标
    const cursor = this.dataList.length > 0
      ? this.delegator.cursor(_.first(this.dataList))
      : null

    const fetched = await this.delegator.loadPrev({ cursor, ...this.options })

    // 用户可通过 maxSize 来限定最多缓存的记录条数
    this.dataList = maxSize
      ? arrayLenthLimit(_.concat(fetched, this.dataList), maxSize, true)
      : _.concat(fetched, this.dataList)

    this.index += fetched.length
  }

  // 获取前一项数据
  async prev() {
    if (--this.index < 0) {
      await this._loadPrev()
    }

    return this.dataList[this.index]
  }

  // 向前批量获取
  async batchPrev(n) {
    let resList = []

    for (let i = 0; i < n; i++) {
      let res = await this.prev()
      resList.push(res)
    }

    return resList
  }
}

export default CursorData
