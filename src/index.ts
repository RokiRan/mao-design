import type { App } from 'vue'
import MSelect from './components/select/MSelect.vue'
import MButton from './components/button/MButton.vue'
import MCode from './components/code/MCode.vue'

export { MSelect, MButton, MCode }

export default {
  install: (app: App): void => {
    app.component('MSelect', MSelect)
    app.component('MButton', MButton)
    app.component('MCode', MCode)
  }
}
