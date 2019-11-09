/**
 * Radio Component
 *
 * @todo 考虑是否 Radio 组件必须搭配 Radio Group 使用
 * @todo disabled
 */

Component({
  properties: {
    label: String,

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
      const $group = this.getRelationNodes("../radio-group/index")[0]
      $group && $group.changeCurrent(this.data.value)
    },

    // 暴露的接口
    changeState(tag) {
      this.setData({ checked: tag })
    }
  }
})
