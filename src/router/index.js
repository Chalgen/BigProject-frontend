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
        path:"/HomePages/Student/StudentHome",//网页path
        name: 'StudentHome',
        component:()=>import("@/views/HomePages/Student/StudentHome.vue"), 
        //meta: { requiresAuth: true }, 
        children: [
          //嵌套更深的路由
          {
            path: 'StudentView', 
            name: 'StudentView',
            component:()=>import("@/views/HomePages/Student/StudentView.vue"), 
            //component: () => import('@/views/HomePages/StudentHome/StudentView.vue')
            //meta: { requiresAuth: true }, 
          },
          {
            path: 'StudentModify', 
            name: 'StudentModify',
            component:()=>import("@/views/HomePages/Student/StudentModify.vue"), 
            //meta: { requiresAuth: true }, 
          },
          {
            path: 'StudentPost', 
            name: 'StudentPost',
            component:()=>import("@/views/HomePages/Student/StudentPost.vue"), 
            //meta: { requiresAuth: true }, 
          }
        ]
    },



    {
        path:"/HomePages/GeneralAdmin/GeneralAdminHome",
        //name:Homepage,用home就崩了？？
        component:()=>import("@/views/HomePages/GeneralAdmin/GeneralAdminHome.vue"),
        //meta: { requiresAuth: true }
        children: [
          //嵌套更深的路由
          {
            path: 'GeneralAdminView', 
            name: 'GeneralAdminView',
            component:()=>import("@/views/HomePages/GeneralAdmin/GeneralAdminView.vue"),
            //meta: { requiresAuth: true }
          },
          {
            path: 'GeneralAdminCheck', 
            name: 'GeneralAdminCheck',
            component:()=>import("@/views/HomePages/GeneralAdmin/GeneralAdminCheck.vue"), 
            //meta: { requiresAuth: true }           
          },
          {
            path: 'GeneralAdminModify', 
            name: 'GeneralAdminModify',
            component:()=>import("@/views/HomePages/GeneralAdmin/GeneralAdminModify.vue"), 
            //meta: { requiresAuth: true }
          },
        ]
    },



    {
        path:"/HomePages/SuperAdmin/SuperAdminHome",
        component:()=>import("@/views/HomePages/SuperAdmin/SuperAdminHome.vue"),
        //meta: { requiresAuth: true } 
        children: [
          //嵌套更深的路由
          {
            path: 'SuperAdminView', 
            name: 'SuperAdminView',
            component:()=>import("@/views/HomePages/SuperAdmin/SuperAdminView.vue"),
            //meta: { requiresAuth: true }
          },
          {
            path: 'SuperAdminCRUD', 
            name: 'SuperAdminCRUD',
            component:()=>import("@/views/HomePages/SuperAdmin/SuperAdminCRUD.vue"), 
            //meta: { requiresAuth: true }
            
          },
          {
            path: 'SuperAdminCheck', 
            name: 'SuperAdminCheck',
            component:()=>import("@/views/HomePages/SuperAdmin/SuperAdminCheck.vue"),
            //meta: { requiresAuth: true }
          },
        ]
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