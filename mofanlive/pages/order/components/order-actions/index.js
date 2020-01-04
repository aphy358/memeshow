import {safeArea} from 'ui-kit/behaviors/safeArea'
import { orderActions } from '@/mapping'
import _ from 'lodash'

Component({
  properties: {
    actions: {
      type: Object,
      value: []
    }
  },

  data: {
    btns: []
  },

  observers: {
    actions(arr) {
      this.setData({
        btns: _.map(arr, it => ({
          key: it,
          title: orderActions[it]
        }))
      })
    }
  },

  methods: {
    click(e) {
      this.triggerEvent('click', e.currentTarget.dataset)
    },
  },

  behaviors: [safeArea()],

  options: {
    addGlobalClass: true
  }
})