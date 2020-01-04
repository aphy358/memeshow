/**
 * Checkbox Group Component
 *
 * @event CheckboxGroup#change
 */

Component({
  properties: {
    name: String
  },

  relations: {
    "../checkbox/index": {
      type: "child",

      linked(target) {
        if (target.checked) this.data._checkedList.push(target.value)
      }
    }
  },

  data: {
    // { value }
    _checkedList: []
  },

  methods: {
    // 暴露到 children 的接口
    changeCurrent({ name, value, isChecked }) {

      this.triggerEvent("change")
    }

    // walkChild(value) {
    //   const $children = this.getRelationNodes("../checkbox/index")

    //   $children.forEach($checkbox =>
    //     $checkbox.changeState($radio.data.value === value)
    //   )
    // }
  },

  options: {
    pureDataPattern: /^_/
  }
})
