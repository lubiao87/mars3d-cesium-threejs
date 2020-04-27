import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    // 入口
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "index",
      component: () => import("./components/index.vue"),
      redirect: "/quanjingSystem",
      children: [
        { // 文庙
          path: '/quanjingSystem',
          name: 'quanjingSystem',
          component: () => import("./views/quanjingSystem/index.vue"),
          meta: {
            auth: false, // 这里设置，当前路由需要校验
            keepAlive: true
          },
        }
      ]
    },
    {
      path: "/createLayer",
      name: 'createLayer',
      component: () => import("./views/quanjingSystem/childrenCenter/createLayer.vue"),
    },
  ]
})
