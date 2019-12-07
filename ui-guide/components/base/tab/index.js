/**
 * Tab Component
 *
 * @slot default
 */

Component({
  properties: {
    index: {
      type: String,
      optionalTypes: [Number, String]
    },

    disabled: {
      type: Boolean,
      value: false
    },

    underline: {
      type: Boolean,
      value: true
    }
  },

  externalClasses: ["actived-tab"],

  data: {
    activation: false
  },

  relations: {
    "../tabs/index": {
      type: "parent"
    }
  },

  methods: {
    onTap() {
      const parent = this.getRelationNodes("../tabs/index")[0]
      parent.$changeCurrent({
        index: this.data.index,
        disabled: this.data.disabled
      })
    },

    /**
     * 暴露到父组件的接口
     */

    $changeActivation(activation) {
      this.setData({ activation })
    }
  }
})
