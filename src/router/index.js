import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Contest from '../views/Contest.vue'
import Contests from '../views/Contests.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/contests',
    name: 'Contests',
    component: Contests
  },
  {
    path: '/contest/create',
    name: 'ContestCreate',
    component: () => import(/* webpackChunkName: "contestcreate" */ '../views/ContestCreate.vue')
  },
  {
    path: '/contest/:id',
    name: 'Contest',
    component: Contest
  },
  {
    path: '/contest/:id/addsubmission',
    name: 'AddSubmission',
    component: () => import(/* webpackChunkName: "addsubmission" */ '../views/AddSubmission')
  },
  {
    path: '/assessment/:id',
    name: 'Assessment',
    component: () => import(/* webpackChunkName: "assessment" */ '../views/Contest.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
