import { createRouter, createWebHistory } from "vue-router";

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
        path:"/homepage",
        //name:Homepage,用home就崩了？？
        component:()=>import("@/views/homepage.vue")
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
export default router