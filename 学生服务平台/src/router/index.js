import { createRouter, createWebHistory } from "vue-router";
import { useGlobalStore } from '@/store/global'

const routes=[
    {
        path:"/",
        component:()=>import("@/views/index.vue")
    },
    {
        path:"/content",
        component:()=>import("../views/content.vue")
    },
    {
        path:"/login",
        component:()=>import("@/views/login.vue")//原地import进来
    },
    {
        path:"/login2",
        component:()=>import("@/views/login2.vue")//原地import进来
    },
    {
        path:"/HomePages/StudentHome",
        //name:Homepage,用home就崩了？？
        component:()=>import("@/views/HomePages/StudentHome.vue"), 
        meta: { requiresAuth: true } 
    },
    {
        path:"/HomePages/GeneralAdminHome",
        //name:Homepage,用home就崩了？？
        component:()=>import("@/views/HomePages/GeneralAdminHome.vue"),
        meta: { requiresAuth: true }
    },
    {
        path:"/HomePages/SuperAdminHome",
        //name:Homepage,用home就崩了？？
        component:()=>import("@/views/HomePages/SuperAdminHome.vue"),
        meta: { requiresAuth: true } 
    },
    {
        path:"/testpage1",
        component:()=>import("@/views/testpage1.vue")
    },
    {
        path:"/postpage",
        component:()=>import("@/views/postpage.vue")
    },
]

const router= createRouter({
    history:createWebHistory(),
    routes
})



// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const globalStore = useGlobalStore()
    if (globalStore.userType) {
      next()
    } else {
      next('/login') 
    }
  } else {
    next() 
  }
})


export default router