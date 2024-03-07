import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'
// pinia数据持久化
import { createUnistorage } from 'pinia-plugin-unistorage'

import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  const store = Pinia.createPinia()

  store.use(createUnistorage() as Pinia.PiniaPlugin)
  app.use(store)

  return {
    app,
    Pinia,
  }
}
