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
        name: 'StudentHome',
        //name:Homepage,用home就崩了？？
        component:()=>import("@/views/HomePages/StudentHome.vue"), 
        //meta: { requiresAuth: true }, 
        children: [
          //嵌套更深的路由
          {
            path: 'StudentView', 
            name: 'StudentView',
            component:()=>import("@/views/HomePages/StudentView.vue"), 
            //component: () => import('@/views/HomePages/StudentHome/StudentView.vue')
            //meta: { requiresAuth: true }, 
          },
          {
            path: 'StudentModify', 
            name: 'StudentModify',
            component:()=>import("@/views/HomePages/StudentModify.vue"), 
            //component: () => import('@/views/HomePages/StudentHome/StudentModify.vue')
            
            //meta: { requiresAuth: true }, 
          },
          {
            path: 'StudentPost', 
            name: 'StudentPost',
            component:()=>import("@/views/HomePages/StudentPost.vue"), 
            //component: () => import('@/views/HomePages/StudentHome/StudentPost.vue')
            //meta: { requiresAuth: true }, 
          }
        ]
    },
    {
        path:"/HomePages/GeneralAdminHome",
        //name:Homepage,用home就崩了？？
        component:()=>import("@/views/HomePages/GeneralAdminHome.vue"),
        //meta: { requiresAuth: true }
    },
    {
        path:"/HomePages/SuperAdminHome",
        //name:Homepage,用home就崩了？？
        component:()=>import("@/views/HomePages/SuperAdminHome.vue"),
        //meta: { requiresAuth: true } 
    },
    {
        path:"/testpage1",
        component:()=>import("@/views/testpage1.vue")
    },
    {
        path:"/postpage",
        component:()=>import("@/views/postpage.vue")
    },
    {
        path:"/register",
        component:()=>import("@/views/register.vue")
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
      next('/login2') 
    }
  } else {
    next() 
  }
})


export default router