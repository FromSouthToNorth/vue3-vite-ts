import 'uno.css'
import './assets/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { router, setupRouter } from './router'
import { setupRouterGuard } from './router/guard/index'
import 'nprogress/nprogress.css'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  setupRouter(app)

  setupRouterGuard(router)

  app.mount('#app')
}

bootstrap()
