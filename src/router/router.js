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
          slide:false,
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
          keepAlive: false,
          isTransition: true,
          slide:false,
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
          keepAlive: false,
          isTransition: true,
          slide:false,
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
          keepAlive: false,
          isTransition: true,
          slide:false,
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
          keepAlive: false,
          isTransition: true,
          slide:false,
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
        title: "LOGIN",
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
        title: "REGISTER",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/registerPassword",
      name: "registerPassword",
      component: () => import("@/views/login/registerPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "REGISTER",
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
        title: "LOGIN PASSWORD",
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
      path: "/confirmationOrder/:id",
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
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/search/search.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "SEARCH",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/messageList",
      name: "messageList",
      component: () => import("@/views/message/messageList.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "MAILBOX",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/messageDetails/:id",
      name: "messageDetails",
      component: () => import("@/views/message/messageDetails.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "MAILBOX",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/vip",
      name: "vip",
      component: () => import("@/views/mine/vip.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "BECOME VIP",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/buyVip/:id",
      name: "buyVip",
      component: () => import("@/views/mine/buyVip.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "VIP",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/orderDetails/:id",
      name: "orderDetails",
      component: () => import("@/views/order/orderDetails.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "ORDER DETAILS",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/bankCardList",
      name: "bankCardList",
      component: () => import("@/views/mine/bankCardList.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "BANK CARD",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/addBankCard",
      name: "addBankCard",
      component: () => import("@/views/mine/addBankCard.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "ADD BANK CARD",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/addressList",
      name: "addressList",
      component: () => import("@/views/mine/addressList.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "SHIPPING ADDRESS",
        isMember: false,
        isLogin: true
      }
    },
    
    {
      path: "/addAddress/:id?",
      name: "addAddress",
      component: () => import("@/views/mine/addAddress.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "EDIT SHIPPING ADDRESS",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/setPayPassword",
      name: "setPayPassword",
      component: () => import("@/views/mine/setPayPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "NEW PAYMENT PASSWORD",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/myshare",
      name: "myshare",
      component: () => import("@/views/index/subviews/share.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "MY ORDER SHARE",
        isMember: false,
        isLogin: true,
      }        
    },
    {
      path: "/invite",
      name: "invite",
      component: () => import("@/views/mine/invite.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "INVITE",
        isMember: false,
        isLogin: true,
      }        
    },
    {
      path: "/setPhone",
      name: "setPhone",
      component: () => import("@/views/mine/setPhone.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "MODIFY PHONE NUMBER",
        isMember: false,
        isLogin: true,
      }        
    },
    {
      path: "/bill",
      name: "bill",
      component: () => import("@/views/mine/bill.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "MY BILL",
        isMember: false,
        isLogin: true,
      }        
    },    
    {
      path: "/content/:id",
      name: "content",
      component: () => import("@/views/other/content.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "",
        isMember: false,
        isLogin: false,
      }        
    },
    
    {
      path: "/chat",
      name: "chat",
      component: () => import("@/views/other/chat.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "",
        isMember: false,
        isLogin: false,
      }        
    },
    {
      path: "/inviteList",
      name: "inviteList",
      component: () => import("@/views/mine/inviteList.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "MY INVITATION",
        isMember: false,
        isLogin: true,
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