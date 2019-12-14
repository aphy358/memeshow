/**
 * Checkbox Group Component
 *
 * @event CheckboxGroup#change
 */

Component({
  // properties: {
  //   name: String
  // },

  // relations: {
  //   "../checkbox/index": {
  //     type: "child",

  //     linked(target) {
  //       if (target.checked) this.data._checkedList.push(target.value)
  //     }
  //   }
  // },

  // data: {
  //   _checkedList: []
  // },

  // methods: {
  //   // 暴露的接口
  //   changeCurrent(value) {
  //     if (value === this.data._current) return
  //     this.data._current = value
  //     this.walkChild(value)
  //     this.triggerEvent("change", {
  //       value,
  //       name: this.data.name
  //     })
  //   },

  //   walkChild(value) {
  //     const $radios = this.getRelationNodes("../radio/index")
  //     $radios.forEach($radio => $radio.changeState($radio.data.value === value))
  //   }
  // },

  // options: {
  //   pureDataPattern: /^_/
  // }
})
