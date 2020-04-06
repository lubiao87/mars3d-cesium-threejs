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
      redirect: "/radarReflect",
      meta: {
        auth: false // 这里设置，当前路由需要校验
      },
      children: [
        {
          path: "/buildModel",
          name: "buildModel",
          component: () => import("./views/webglText/build-model.vue"),
          meta: {
            auth: false,
            keepAlive: false
          }
        },
        {
          path: '/radarReflect',
          name: 'radarReflect',
          component: () => import("./views/radarReflect/radarReflect.vue"),
          meta: {
            auth: false,
            keepAlive: false
          }
        }
      ]
    },
    {
      path: '/cesiumContainer',
      name: 'cesiumContainer',
      component: () => import("./views/webglText/cesiumContainer.vue")
    },
    {
      path: '/cesiumtext',
      name: 'cesiumtext',
      component: () => import("./views/webglText/cesiumtext.vue")
    },
    { //单体化文庙
      path: '/createLayer',
      name: 'createLayer',
      component: () => import("./views/webglText/createLayer.vue")
    },
  ]
})
