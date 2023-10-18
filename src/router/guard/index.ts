import nProgress from 'nprogress'
import type { Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  createProgressGuard(router)
}

export function createProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    nProgress.start()
  })

  router.afterEach(async () => {
    nProgress.done()
  })
}
