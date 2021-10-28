import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2fb6e149 = () => interopDefault(import('../pages/blocks.vue' /* webpackChunkName: "pages/blocks" */))
const _67220f95 = () => interopDefault(import('../pages/chains.vue' /* webpackChunkName: "pages/chains" */))
const _282f920a = () => interopDefault(import('../pages/network.vue' /* webpackChunkName: "pages/network" */))
const _52f6dcdf = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blocks",
    component: _2fb6e149,
    name: "blocks"
  }, {
    path: "/chains",
    component: _67220f95,
    name: "chains"
  }, {
    path: "/network",
    component: _282f920a,
    name: "network"
  }, {
    path: "/",
    component: _52f6dcdf,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
