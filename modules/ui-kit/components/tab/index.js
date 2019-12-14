/**
 * Tab Component
 *
 * @slot default
 */

Component({
  properties: {
    key: {
      type: String,
      optionalTypes: [Number, String]
    },

    disabled: {
      type: Boolean,
      value: false
    }
  },

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
        key: this.data.key,
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
