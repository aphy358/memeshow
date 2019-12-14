import { isTag } from "postcss-selector-parser"

/**
 * InputNumber Component
 *
 * @event InputNumber#error
 * @event InputNumber#change
 */

Component({
  properties: {
    value: {
      type: Number,
      value: 0
    },

    step: {
      type: Number,
      value: 1
    },

    min: {
      type: Number,
      value: 0
    },

    max: {
      type: Number,
      value: 9999
    },

    disabled: {
      type: Boolean,
      value: false
    },

    //  支持小数
    digit: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onMinus() {
      let { min, value, step } = this.data
      if (value <= min) return
      let newVal = value - step
      this.modify(this.check(newVal))
    },

    onPlus() {
      let { max, value, step } = this.data
      if (value >= max) return
      let newVal = value + step
      this.modify(this.check(newVal))
    },

    onInput({ detail }) {
      const { min, max } = this.data
      let newVal = detail.value
      if (newVal === "") return this.setData({ value: min })
      if (newVal.endsWith('.')) return this.setData({ value: newVal })
      else newVal = this.parse(newVal)
      this.modify(this.check(newVal))
    },

    emitError(errorValue) {
      this.triggerEvent("error", {
        errorValue: errorValue
      })
    },

    // 修改 value 时 emit change 事件
    modify(value) {
      this.setData({ value }, () => {
        this.triggerEvent("change", { value })
      })
    },

    // 校验 value，保证值在 <min, max> 区间
    check(newVal) {
      const { min, max } = this.data
      if (newVal < min) {
        this.emitError(newVal)
        return min
      } else if (newVal > max) {
        this.emitError(newVal)
        return max
      } else return newVal
    },

    // 处理 value, 最多保留两位小数
    parse(newVal) {
      if (typeof newVal !== "string") newVal = String(newVal)
      if (newVal.endsWith('.')) return
      const list = newVal.split(".")
      if (list.length < 2) return Number(list[0])
      else {
        let decimal = list[1].trim()
        while (decimal.length && decimal.endsWith('0')) {
           decimal = decimal.slice(0, -1)
        }
        if (decimal.length === 0) {
          return Number(list[0])
        } else {
          decimal = (Number(decimal) / Math.pow(10, decimal.length)).toFixed(2)
          return Number(list[0]) + decimal
        }
      }
    }
  }
})
