/**
 * Checkbox Group Component
 *
 * @event CheckboxGroup#change
 */

Component({
  properties: {
    name: String,

    checked: Array
  },

  relations: {
    "../checkbox/index": {
      type: "child",

      linked(target) {
        if (this.data._checkedList.includes(target.data.value))
          target.$emitSwitch(true)
      }
    }
  },

  data: {
    _checkedList: []
  },

  lifetimes: {
    attached() {
      this.data._checkedList = this.data.checked || []
    }
  },

  methods: {
    changeCurrent({ name, value, isChecked }) {
      this.triggerEvent("change")
    },

    // 暴露到 children 的接口
    $emitChange(key) {
      const index = this.data._checkedList.indexOf(key)
      const children = this.getRelationNodes("../checkbox/index")
      if (index >= 0) {
        this.data._checkedList.splice(index, 1)
        children.forEach(item => {
          if (item.data.value == key) item.$emitSwitch(false)
        })
      } else {
        this.data._checkedList.push(key)
        children.forEach(item => {
          if (item.data.value == key) item.$emitSwitch(true)
        })
      }
      this.emitChange()
    },

    // 暴露到外层的接口
    emitChange() {
      this.triggerEvent("change", { value: this.data._checkedList })
    }
  },

  options: {
    pureDataPattern: /^_/
  }
})
