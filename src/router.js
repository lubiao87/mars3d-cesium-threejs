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
      meta: {
        auth: false // 这里设置，当前路由需要校验
      },
      children: [
        { // 中关村
          path: '/quanjingSystem',
          name: 'quanjingSystem',
          component: () => import("./views/quanjingSystem/index.vue")
        }
      ]
    },
    { // 科技标签
      path: '/cesiumContainer',
      name: 'cesiumContainer',
      component: () => import("./views/webglText/cesiumContainer.vue")
    },

    { //单体化文庙
      path: '/createLayer',
      name: 'createLayer',
      component: () => import("./views/webglText/createLayer.vue")
    }
  ]
})
