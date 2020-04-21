<template>
  <div class="quanjing flexBox" id="quanjing-ststem">
    <index-hearder></index-hearder>
    <div class="conterner">
      <index-nav @fromChild="navChangh"></index-nav>
      <div class="App_center flexBox">
        <div class="App_pano_2xzzit border-style1">
          <keep-alive>
            <component v-bind:is="componentData.component"></component>
          </keep-alive>
          <!-- <children-center  v-if="componentData.component === 'childrenCenter'"></children-center>
          <create-layer v-else></create-layer> -->
        </div>
        <div class="App_category_1ZQvXj flexBox border-style1">

        </div>
      </div>
      <div class="App_sidebar border-style1">
        <!-- 失活的组件将会被缓存！-->
          <keep-alive>
            <component v-bind:is="currentTabComponent"></component>
          </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import indexHearder from "./index-hearder.vue";
import indexNav from "./indexNav.vue";

import childrenCenter from "./childrenCenter/basicInfor.vue";
import createLayer from "./childrenCenter/createLayer.vue";

// 右侧组件
import visualAngle from './childrenRight/visualAngle.vue';
import basicInfor from './childrenRight/basicInfor.vue';
import hotspot from "./childrenRight/hotspot.vue";


export default {
  name: "index",
  data: function (params) {
    return {
      currentTabComponent: "basicInfor",
      componentData: {
        name: "基础",
        icon: "el-icon-menu",
        component_right: "basicInfor",
        component: "childrenCenter"
      }
    }
  },
  components: {
    indexNav,
    indexHearder,
    createLayer,
    visualAngle,
    basicInfor,
    childrenCenter,
    hotspot
  },

  methods: {
    navChangh (data){
      this.componentData = data;
      // console.log("navChangh: ", data);
      this.currentTabComponent = data.component_right;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../assets/theme/base.css";
@import "../../assets/common/iconfont/iconfont.css";
@import "@/assets/theme/common.scss";
.quanjing {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: $bodyBgColor;
  color: $mainTextColor;
  .conterner {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    -webkit-box-ordinal-group: 3;
    -ms-flex-order: 2;
    order: 2;
    max-height: 900px;
      .App_center {
        position: relative;
        -webkit-box-flex: 1;
        -ms-flex: auto;
        flex: auto;
        -webkit-box-ordinal-group: 3;
        -ms-flex-order: 2;
        order: 2;
        .App_pano_2xzzit {
          width: 100%;
          height: 100%;
          position: relative;
          -webkit-box-flex: 1;
          -ms-flex: auto;
          flex: auto;
          -webkit-box-ordinal-group: 2;
          -ms-flex-order: 1;
          order: 1;
          overflow: hidden;
          padding: 15px;
        }
        .App_category_1ZQvXj {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 150px;
            flex: 0 0 150px;
            -webkit-box-ordinal-group: 3;
            -ms-flex-order: 2;
            order: 2;
            overflow: hidden;
        }
      }
      .App_sidebar {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 230px;
        flex: 0 0 230px;
        width: 230px;
        -webkit-box-ordinal-group: 4;
        -ms-flex-order: 3;
        order: 3;
      }
  }
  .cesium-viewer-geocoderContainer {
      position: absolute;
      display: inline-block;
      margin: 0 3px;
      right: 50px;
      top: -50px;
  }

}
</style>
