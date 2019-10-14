/**
 * List component
 *
 * @todo 自适应宽度
 * @todo 懒加载，原生的 lazy-load 效果不好
 *
 * @event Waterfall#beforeAppend
 * @event Waterfall#appended
 */

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

    appended: {
      type: Function,
      value: null
    },

    beforeAppend: {
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
      const { list: preList, col } = this.data

      appendList.forEach(image => {
        if (preList.length < col) {
          const column = new Column()
          column.addItem(image)
          preList.push(column)
        } else {
          const insertTarget = this.findShortest(preList)
          insertTarget.addItem(image)
        }
      })

      this.setData({ list: this.data.list })
    },

    findShortest(list) {
      return list.reduce((shortest, item) =>
        item.height < shortest.height ? item : shortest
      )
    },

    /**
     * @event Waterfall#beforeAppend
     */

    _emitBeforeAppend() {
      this.triggerEvent("beforeAppend")
      this.data.beforeAppend && this.data.beforeAppend()
    },

    /**
     * @event Waterfall#appended
     */

    _emitAppended() {
      this.triggerEvent("appended")
      this.data.appended && this.data.appended()
    }
  }
})
