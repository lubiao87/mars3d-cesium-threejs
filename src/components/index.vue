<template>
  <div class="App_page_3zRrHV">
      <keep-alive>
        <router-view
          class="router-view"
          v-if="!($route.meta.keepAlive === false)"
        ></router-view>
      </keep-alive>
      <router-view
        class="router-view"
        v-if="$route.meta.keepAlive === false"
      ></router-view>
  </div>
</template>

<script>
// import indexHearder from "@/components/index-hearder.vue";
// import indexNav from "@/components/indexNav.vue";

import * as Cesium from "cesium/Cesium";
import mars3d from "@/map/mars3d/mars3d";


// import { getMapConfig, getPoint } from "@/map/api";
// import { createLayer } from "../../map/main";
import {
  createWenmiao,
  // UrlArr,
  // startRadar,
  // initWork,
  // stopRaodian,
  // initPointWork,
  // startRaodian
} from "@/map/app";


export default {
  name: "index",
  // components: {
  //   indexNav,
  //   indexHearder
  // },
  mounted() {
    // getMapConfig().then(data => {
    //   createWenmiao("cesiumContainer", data);
    // });
  },

  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/theme/base.css";
@import "../assets/common/iconfont/iconfont.css";
@import "../assets/theme/common.scss";
.App_page_3zRrHV {
  position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    background-color: #333;
    color: #fff;
}
.router-view {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
