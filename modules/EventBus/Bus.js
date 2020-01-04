import Subscriber from "./Subscriber"

export default class EventBus {
  constructor() {
    this.uid = new Date().getTime()
    this.subscriptions = []
  }

  /**
   * 注册
   *
   * @public
   * @param {object} subscriberConfig
   * @param {object} subscriberConfig.context - 订阅的对象，可以是一个页面或者组件
   * @param {object} subscriberConfig.events  - 订阅的事件，使用 `context` 作为 `this` 的值
   * @memberof EventBus
   */

  register(subscriberConfig) {
    const { subscriptions } = this
    const { instance: context } = subscriberConfig
    if (context && !this.has(context)) {
      this.subscribe(this.wrap(subscriberConfig))
    } else {
      // todo
    }
  }

  /**
   * 注销
   *
   * @public
   * @param {object} context
   * @memberof EventBus
   */

  unRegister(context) {
    if (!context) throw new Error("unRegister 必须传入一个页面或者组件实例")
    if (this.has(context)) this.unSubscribe(context)
  }

  /**
   * 触发事件
   *
   * @public
   * @param {string} type - 事件类型
   * @param {string} event - 事件名称
   * @param {object} [message={}] - 传递给事件的参数
   * @memberof EventBus
   */

  post(type, event, message = {}) {
    if (!type || !event) throw new Error("post 方法必须指定事件的类型和名称！")

    const { subscriptions } = this
    subscriptions.forEach(subscriber => {
      if (subscriber.hasEvent(type, event))
        subscriber.call(type, event, message)
    })
  }

  /**
   * 触发指定 `context` 事件
   *
   * @todo
   * @public
   * @param {object} context
   * @param {string} type
   * @param {string} event
   * @param {object} [message={}]
   * @memberof EventBus
   */

  postToTarget(context, type, event, message = {}) {
    const index = this.indexof(context)
    if (index !== -1) {
      this.subscriptions[index].call(type, event, message)
    }
  }

  /**
   * Top Level
   * 调用类型为 on 的 `event` 事件
   *
   * @todo
   * @param {strign} event
   * @param {object} [message={}]
   * @memberof EventBus
   */

  on(event, message = {}) {}

  /**
   * Top Level
   * 调用类型为 on 的 `event` 事件
   *
   * @todo
   * @param {strign} event
   * @param {object} [message={}]
   * @memberof EventBus
   */

  once(event, message = {}) {}

  /**
   * 将 subscriber 加入订阅者列表
   *
   * @private
   * @param {object|Subscriber} subscriber
   * @memberof EventBus
   */

  subscribe(subscriber) {
    this.subscriptions.push(subscriber)
  }

  /**
   * 将关联 context 对象的 subscriber 移出订阅者列表
   *
   * @private
   * @param {object} context
   * @memberof EventBus
   */

  unSubscribe(context) {
    const { subscriptions } = this
    let index = subscriptions.length

    for (; index > 0; index--) {
      if (subscriptions[index - 1].is(context)) {
        break
      }
    }

    subscriptions.splice(--index, 1)
  }

  /**
   * 将注入的 config 配置为 Subscriber 的实例
   *
   * @private
   * @param {object} config
   * @param {object} config.context - 订阅的对象，可以是一个页面或者组件
   * @param {object} config.events  - 订阅的事件，使用 `context` 作为 `this` 的值
   * @returns {object|Subscriber}
   * @memberof EventBus
   */

  wrap(config) {
    return new Subscriber(config)
  }

  /**
   * 判断 `context` 是否已经被监听
   *
   * @private
   * @param {object} context - 待判断的 `context`
   * @returns {boolean}
   * @memberof EventBus
   */

  has(context) {
    return this.indexof(context) !== -1
  }

  /**
   * 获取 `context` 在监听者列表中的位置
   *
   * @private
   * @param {object} context - 待判断的 `context`
   * @returns {number} - 除 -1 外的所有数字：位置；-1: 不存在
   * @memberof EventBus
   */

  indexof(context) {
    const { subscriptions } = this
    for (let i = subscriptions.length - 1; i >= 0; i--) {
      if (subscriptions[i].is(context)) return i
    }
    return -1
  }
}
