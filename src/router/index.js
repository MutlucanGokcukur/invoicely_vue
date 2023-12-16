import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import store from "../store"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: ()=>import("@/views/SignUp.vue")
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: ()=>import("@/views/LogIn.vue")
  },
  {
    path: '/dashboard/my-account',
    name: 'MyAccount',
    component: ()=>import("@/views/Dashboard/MyAccount.vue"),
    meta:{
      requireLogin:true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: ()=>import("@/views/Dashboard/Dashboard.vue"),
    meta:{
      requireLogin:true
    }
  },
  {
    path: '/dashboard/clients',
    name: 'Clients',
    component: ()=>import("@/views/Dashboard/Clients.vue"),
    meta:{
      requireLogin:true
    }
  },
  {
    path: '/dashboard/clients/:id',
    name: 'Client',
    component: ()=>import("@/views/Dashboard/Client.vue"),
    meta:{
      requireLogin:true
    }
  },
  {
    path: '/dashboard/clients/:id/edit',
    name: 'EditClient',
    component: ()=>import("@/views/Dashboard/EditClient.vue"),
    meta:{
      requireLogin:true
    }
  },
  {
    path: '/dashboard/clients/add',
    name: 'AddClient',
    component: ()=>import("@/views/Dashboard/AddClient.vue"),
    meta:{
      requireLogin:true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.matched.some(record=>record.meta.requireLogin) && !store.state.isAuthenticated){
    next("log-in")
  }else{
    next()
  }
})

export default router
