module.exports = class Column {
  constructor(strategy = null) {
    this.height = 0
    this.items = []
    this.strategy = strategy

    Object.defineProperty(this, "count", {
      enumerable: true,
      get() {
        return this.items.length || 0
      },
      set(param) {
        // 静默失败
        return
      }
    })
  }

  /**
   * 添加内容
   * 单个
   */

  addItem(item) {
    if (Array.isArray(item)) return this.addItems(item)
    this.items.push(item)
    this.watchHeight(item)
  }

  /**
   * 添加内容
   * 多个
   */

  addItems(itemList) {
    this.items = this.items.concat(itemList)
    this.watchHeight(itemList)
  }

  /**
   * 移除内容
   * 单个
   *
   * @todo
   */

  removeItem() {}

  /**
   * 移除内容
   * 多个
   *
   * @todo
   */

  removeItems() {}

  /**
   * 更新 `height`
   */

  watchHeight(newItems) {
    let items = Array.isArray(newItems) ? newItems : [newItems]
    return typeof this.strategy === "function"
      ? this.strategy(items)
      : this.defaultStrategy(items)
  }

  /**
   * 默认高度计算策略
   *
   * @description 通过计算宽高比
   */

  defaultStrategy(items) {
    this.height = items.reduce(
      (height, item) => height + item.height / item.width,
      this.height
    )
  }
}
