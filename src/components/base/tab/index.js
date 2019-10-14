/**
 * Tab component
 *
 * @slot default
 */

Component({
  properties: {
    index: {
      type: String,
      value: "",
      optionalTypes: [Number, String]
    },

    disabled: {
      type: Boolean,
      value: false
    }
  },

  externalClasses: ["actived"],

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
      parent.changeCurrent({
        index: this.data.index,
        disabled: this.data.disabled
      })
    },

    /**
     * 暴露到父组件的接口
     */

    changeActivation(activation) {
      this.setData({ activation })
    }
  }
})
