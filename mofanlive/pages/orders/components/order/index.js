import { actions } from '@/mapping'

Component({
  properties: {
    order: {
      type: Object,
      value: {}
    },

  },

  data: {
    actionMap: actions
  },

  methods: {

  },

  options: {
    addGlobalClass: true
  }
})