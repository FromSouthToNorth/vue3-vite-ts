import 'uno.css'
import '@/design/index.less'

import 'ant-design-vue/dist/reset.css'

// Register icon sprite
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { router, setupRouter } from './router'
import { setupRouterGuard } from './router/guard/index'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  setupRouter(app)

  setupRouterGuard(router)

  app.mount('#app')
}

bootstrap()
