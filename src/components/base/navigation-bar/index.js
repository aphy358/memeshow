/**
 * NavigatorBae component
 *
 * @slot left
 * @slot [center]
 * @slot right
 *
 * @event NavigationBar#back
 */

import { safeArea } from "../common/behaviors/index"

Component({
  properties: {
    back: {
      type: Boolean,
      value: false
    },

    loading: {
      type: Boolean,
      value: false
    }
  },

  behaviors: [safeArea()],

  lifetimes: {
    attached() {
      console.log(this.data)
    }
  },

  methods: {
    onBack() {
      this._emitBack()
    },

    _emitBack() {
      this.triggerEvent("back")
    }
  },

  options: {
    multipleSlots: true
  }
})
