import { createRouter, createWebHistory } from "vue-router";
import { useGlobalStore } from '@/store/global'

const routes = [
  {
    path: "/",
    component: () => import("@/views/index.vue")
  },
  {
    path: "/content",
    component: () => import("../views/content.vue")
  },
  {
    path: "/login",
    name: 'login',
    component: () => import("@/views/login.vue")//原地import进来
  },


  {
    path: "/HomePages/Student/StudentHome",//网页path
    name: 'StudentHome',
    component: () => import("@/views/HomePages/Student/StudentHome.vue"),
    meta: { requiresAuth: true, allowedRoles: ['STUDENT', 'SUPERADMIN'], },
    children: [
      //嵌套更深的路由
      {
        path: 'StudentView',
        name: 'StudentView',
        component: () => import("@/views/HomePages/Student/StudentView.vue"),
        //component: () => import('@/views/HomePages/StudentHome/StudentView.vue')
        meta: { requiresAuth: true, allowedRoles: ['STUDENT', 'SUPERADMIN'], },
      },
      {
        path: 'StudentModify',
        name: 'StudentModify',
        component: () => import("@/views/HomePages/Student/StudentModify.vue"),
        meta: { requiresAuth: true, allowedRoles: ['STUDENT', 'SUPERADMIN'], },
      },
      {
        path: 'StudentPost',
        name: 'StudentPost',
        component: () => import("@/views/HomePages/Student/StudentPost.vue"),
        meta: { requiresAuth: true, allowedRoles: ['STUDENT', 'SUPERADMIN'], },
      },
    ]
  },



  {
    path: "/HomePages/GeneralAdmin/GeneralAdminHome",
    //name:Homepage,用home就崩了？？
    component: () => import("@/views/HomePages/GeneralAdmin/GeneralAdminHome.vue"),
    meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'SUPERADMIN'], },
    //roles: ['ADMIN', 'SUPERADMIN'],

    children: [
      //嵌套更深的路由
      {
        path: 'GeneralAdminView',
        name: 'GeneralAdminView',
        component: () => import("@/views/HomePages/GeneralAdmin/GeneralAdminView.vue"),
        meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'SUPERADMIN'], },
      },
      {
        path: 'GeneralAdminCheck',
        name: 'GeneralAdminCheck',
        component: () => import("@/views/HomePages/GeneralAdmin/GeneralAdminCheck.vue"),
        meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'SUPERADMIN'], },
      },
      {
        path: 'GeneralAdminModify',
        name: 'GeneralAdminModify',
        component: () => import("@/views/HomePages/GeneralAdmin/GeneralAdminModify.vue"),
        meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'SUPERADMIN'], },
      },
    ]
  },



  {
    path: "/HomePages/SuperAdmin/SuperAdminHome",
    component: () => import("@/views/HomePages/SuperAdmin/SuperAdminHome.vue"),
    meta: { requiresAuth: true, allowedRoles: ['SUPERADMIN'], },

    children: [
      //嵌套更深的路由
      {
        path: 'SuperAdminView',
        name: 'SuperAdminView',
        component: () => import("@/views/HomePages/SuperAdmin/SuperAdminView.vue"),
        meta: { requiresAuth: true, allowedRoles: ['SUPERADMIN'], },
      },
      {
        path: 'SuperAdminCRUD',
        name: 'SuperAdminCRUD',
        component: () => import("@/views/HomePages/SuperAdmin/SuperAdminCRUD.vue"),
        meta: { requiresAuth: true, allowedRoles: ['SUPERADMIN'], },
      },
      {
        path: 'SuperAdminCheck',
        name: 'SuperAdminCheck',
        component: () => import("@/views/HomePages/SuperAdmin/SuperAdminCheck.vue"),
        meta: { requiresAuth: true, allowedRoles: ['SUPERADMIN'], },
      },
    ]
  },
  {
    path: "/testpage1",
    component: () => import("@/views/testpage1.vue")
  },
  {
    path: "/postpage",
    component: () => import("@/views/postpage.vue")
  },
  {
    path: "/register",
    component: () => import("@/views/register.vue")
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})



// 路由守卫
router.beforeEach((to, from, next) => {
  console.log("in")
  const globalStore = useGlobalStore()
  if (to.meta.requiresAuth) {
    //if (globalStore.userType) {
    if (globalStore.token) {
      console.log('有token')
      if (to.meta.allowedRoles && to.meta.allowedRoles.length) {
        console.log('需要验证角色')
        if (to.meta.allowedRoles.includes(globalStore.userType)) {
          console.log("!11111111")
          console.log(globalStore.userType)
          next()
        } else {

          switch (globalStore.userType) {
            case 'STUDENT':
              next()
              //next('/HomePages/Student/StudentHome')
              break
            case 'ADMIN':
              next()
              //next('/HomePages/GeneralAdmin/GeneralAdminHome')
              break
            case 'SUPER_ADMIN':
              next()
              //next('/HomePages/SuperAdmin/SuperAdminHome')
              break
            default:
              alert('没有访问权限，请联系管理员')
              next('/login')
          }
          console.log(globalStore)

        }
      } else {
        next()
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }

  // 已登录但需要角色校验的情况

})


export default router