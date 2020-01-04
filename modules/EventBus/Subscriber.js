export default class Subscriber {
  constructor({ instance, events: eventTypes }) {
    this.context = instance
    this.events = {}

    if (Object.keys(eventTypes).length > 0) {
      for (let type in eventTypes) {
        if (eventTypes.hasOwnProperty(type)) {
          this.addEvents(type, eventTypes[type])
        }
      }
    }
  }

  /**
   * 调用回调函数
   *
   * @public
   * @param {string} type
   * @param {string} event
   * @param {object} [message={}]
   * @memberof Subscriber
   */

  call(type, event, message = {}) {
    const { events, context } = this
    if (this.hasEvent(type, event)) {
      events[type][event].call(context, message)
    } else {
      // todo 静默失败？
    }
  }

  /**
   * 判断相等性
   *
   * @public
   * @param {object} key
   * @returns {boolean}
   * @memberof Subscriber
   */

  is(key) {
    return Object.is(key, this.context)
  }

  /**
   * 判断 subcriber 是否具有某个事件的回调函数
   *
   * @public
   * @param {string} type  - 事件的类型
   * @param {string} event - 事件的名称
   * @returns {boolean}
   * @memberof Subscriber
   */

  hasEvent(type, event) {
    const { events } = this
    if (type in events && event in events[type]) return true
    return false
  }

  /**
   * 增加 `type` 类型的事件
   *
   * @public
   * @param {string} type - 事件类型
   * @param {object} newEvents - 待添加事件集
   * @memberof Subscriber
   */

  addEvents(type, newEvents) {
    const { events } = this
    if (type in events) {
      events[type] = {
        ...events[type],
        ...newEvents
      }
    } else {
      events[type] = newEvents
    }
  }
}
