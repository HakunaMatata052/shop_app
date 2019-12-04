import Vue from "vue";
import Router from "vue-router";
import store from "../store/store";

// tarBar ----- 子页面
import Index from "@/views/index/index.vue";
// 内嵌组件

Vue.use(Router);

const router = new Router({
  /**
   * name: 组件名称 (需要开启缓存，路由组件名称与组件内名称必须一致，区分大小写)
   * meta：{
   *  title: 页面标题，
   *  keepAlive：是否开启缓存（开启缓存是组件内name，所以这里需要和routes的name配合）
   *  isTransition: 是否开启过渡动画
   * }
   */
  routes: [{
      path: "/",
      component: Index,
      children: [{
        path: "/",
        name: "home",
        component: () => import("@/views/index/subviews/home.vue"),
        meta: {
          keepAlive: true,
          isTransition: true,
          title: "Home",
          isMember: false,
          isLogin: false,
          icon: "home-fill",
          index: 0
        }
      },{
        path: "/categories",
        name: "categories",
        component: () => import("@/views/index/subviews/categories.vue"),
        meta: {
          keepAlive: true,
          isTransition: true,
          title: "Categories",
          isMember: false,
          isLogin: false,
          icon: "all-fill",
          index: 1
        }        
      },{
        path: "/share",
        name: "share",
        component: () => import("@/views/index/subviews/share.vue"),
        meta: {
          keepAlive: true,
          isTransition: true,
          title: "Share",
          isMember: false,
          isLogin: false,
          icon: "camera-fill",
          index: 2
        }        
      },{
        path: "/order",
        name: "order",
        component: () => import("@/views/index/subviews/order.vue"),
        meta: {
          keepAlive: true,
          isTransition: true,
          title: "Order",
          isMember: false,
          isLogin: true,
          icon: "feeds-fill",
          index: 3
        }        
      },{
        path: "/personal",
        name: "personal",
        component: () => import("@/views/index/subviews/personal.vue"),
        meta: {
          keepAlive: true,
          isTransition: true,
          title: "Personal",
          isMember: false,
          isLogin: true,
          icon: "account-fill",
          index: 4
        }        
      }]
    },
    // 注册登录
    {
      path: "/login/:name?",
      name: "login",
      component: () => import("@/views/login/login.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "login",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/login/register.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "register",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/resetPassword",
      name: "resetPassword",
      component: () => import("@/views/login/resetPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "resetPassword",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/goodsDetails/:id/:open?",
      name: "goodsDetails",
      component: () => import("@/views/goods/goodsDetails.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "good details",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/confirmationOrder",
      name: "confirmationOrder",
      component: () => import("@/views/goods/confirmationOrder.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "FILL ORDER",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/shareOrder/:id",
      name: "shareOrder",
      component: () => import("@/views/share/shareOrder.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "SHARE ORDER",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/goods/cart.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "SHOPPING CART",
        isMember: false,
        isLogin: true
      }
    },
    
    
  ]
});
router.beforeEach((to, from, next) => {

  if (to.meta.index != undefined) {
    store.state.tabActiveIndex = to.meta.index
  }
  if (to.meta.isLogin) {
    if (!window.localStorage.getItem('token')) {
      next({path: "/login"});
      // router.push('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(route => {

  // console.log(route)
  // console.log("跳转")
})

export default router;