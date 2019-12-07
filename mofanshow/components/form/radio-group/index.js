/**
 * Radio Group Component
 *
 * @event RadioGroup#change
 */

Component({
  properties: {
    name: String,

    default: {
      type: String,
      value: "",
      optionalTypes: [String, Number]
    }
  },

  relations: {
    "../radio/index": {
      type: "child",

      linked(target) {
        target.changeState(target.data.value === this.data._current)
      }
    }
  },

  data: {
    _current: ""
  },

  lifetimes: {
    attached() {
      this.data._current = this.data.default
    }
  },

  methods: {
    // 暴露的接口
    changeCurrent(value) {
      if (value === this.data._current) return
      this.data._current = value
      this.walkChild(value)
      this.triggerEvent("change", {
        value,
        name: this.data.name
      })
    },

    walkChild(value) {
      const $radios = this.getRelationNodes("../radio/index")
      $radios.forEach($radio => $radio.changeState($radio.data.value === value))
    }
  },

  options: {
    pureDataPattern: /^_/
  }
})
