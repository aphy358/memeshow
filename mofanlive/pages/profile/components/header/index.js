import { safeArea } from 'ui-kit/behaviors/safeArea'

Component({
  properties: {
    user: {
      type: Object,
      value: {}
    }
  },
  data: {
  },

  methods: {
    login() {
      // TODO 
    }
  },

  behaviors: [safeArea()],

  lifetimes: {
    attached() {
      console.log(this.data)
    }
  }
})