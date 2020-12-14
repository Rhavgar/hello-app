import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import ExoplanetCrud from '../components/ExoplanetCrud'
import TelescopeCrud from '../components/TelescopeCrud'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/exoplanets',
    component: ExoplanetCrud
  },
  {
    path: '/telescopes',
    component: TelescopeCrud
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
