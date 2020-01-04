/**
 * Checkbox Component
 */

Component({
  properties: {
    name: String,

    title: String,

    value: {
      type: String,
      optionalTypes: [String, Number]
    },

    checked: {
      type: Boolean,
      value: false
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

  externalClasses: ["title-class", "desc-class"],

  relations: {
    "../checkbox-group/index": {
      type: "parent"
    }
  },

  methods: {
    onTap() {
      if (this.data.disabled) return this.emitDisabled()
      else {
        if (!this.hasParent()) {
          this.setData(
            {
              checked: !this.data.checked
            },
            () => this.emitChange()
          )
        } else {
          // todo
        }
      }
    },

    emitChange() {
      this.triggerEvent("change", {
        name: this.data.name,
        value: this.data.value,
        checked: this.data.checked
      })
    },

    emitDisabled() {
      this.triggerEvent("disabled")
    },

    hasParent() {
      return this.getRelationNodes("../checkbox-group/index").length > 0
    }
  }
})
