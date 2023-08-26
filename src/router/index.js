import Vue from 'vue'
import VueRouter from 'vue-router'
import ModView from '../views/ModView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ModView
  },
  {
    path: '/deck-builder',
    name: 'deck-builder',
    component: () => import('../views/DeckBuilderView.vue')
  }
]
const router = new VueRouter({
  mode : 'history',
  routes
})

export default router
