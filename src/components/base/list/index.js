/**
 * List component
 */

import { baseBehavior } from "../../common/behaviors/index"
// es6 module 兼用性问题
// import Column from "./Column"
const Column = require("./Column")

Component({
  properties: {
    appendList: {
      type: Array,
      value: []
    },

    col: {
      type: Number,
      value: 2
    },

    gap: {
      type: Number,
      value: 0
    },

    waterfall: {
      type: Boolean,
      value: false
    },

    lazy: {
      type: Boolean,
      value: false
    },

    /**
     * 计算高度的 strategy
     */

    strategy: {
      type: Function,
      value: null
    },

    /**
     * beforeAppend
     * 回调函数
     * 注意 `this` 关键字的指向
     */

    beforeAppend: {
      type: Function,
      value: null
    },

    /**
     * appended
     * 回调函数
     * 注意 `this` 关键字的指向
     */

    appended: {
      type: Function,
      value: null
    }
  },

  data: {
    /**
     * `Column` 对象数组
     * 维护渲染的数据
     */

    list: [],

    /**
     * 单列宽度
     *
     * @todo
     */

    perWidth: 0
  },

  behaviors: [baseBehavior()],

  observers: {
    appendList: function(list) {
      if (!list || list.length <= 0) return
      this._emitBeforeAppend()
      this.buildRenderList(list)
      this._emitAppended()
    }
  },

  methods: {
    buildRenderList(appendList = []) {
      const { list, col } = this.data

      appendList.forEach(image => {
        if (list.length < col) {
          const column = new Column()
          column.addItem(image)
          list.push(column)
        } else {
          const insertTarget = this.shortest(list)
          insertTarget.addItem(image)
        }
      })

      this.setData({ list })
    },

    shortest(list) {
      return list.reduce((shortest, item) =>
        item.height < shortest.height ? item : shortest
      )
    },

    /**
     * @event List#beforeAppend
     */

    _emitBeforeAppend() {
      this.data.beforeAppend && this.data.beforeAppend()
    },

    /**
     * @event List#appended
     */

    _emitAppended() {
      this.data.appended && this.data.appended()
    }
  }
})
