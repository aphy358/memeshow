import { safeArea } from 'ui-kit/behaviors/safeArea'

Component({
  behaviors: [safeArea()],
  options: {
    addGlobalClass: true
  }
})