/**
 * Radio Component
 */

Component({
  properties: {
    title: String,

    value: {
      type: String,
      optionalTypes: [String, Number]
    },

    disabled: {
      type: Boolean,
      value: false
    },

    desc: {
      type: String,
      value: ""
    }
  },

  relations: {
    "../radio-group/index": {
      type: "parent"
    }
  },

  data: {
    checked: false
  },

  methods: {
    onTap() {
      if (this.data.disabled) return
      const $group = this.getRelationNodes("../radio-group/index")[0]
      $group && $group.changeCurrent(this.data.value)
    },

    // 暴露的接口
    changeState(tag) {
      this.setData({ checked: tag })
    }
  }
})
