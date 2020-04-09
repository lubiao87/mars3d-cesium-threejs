<template>
  <div class="radar-reflect">
    <!--加载前进行操作提示，优化用户体验-->
    <div id="mask" class="signmask" onclick="removeMask()"></div>

    <div id="cesiumContainer" class="cesium-container"></div>
    <nal-tool></nal-tool>
    <div v-text="inputText" class="inputText" id="inputText"></div>

  </div>

</template>

<script>

import * as Cesium from "cesium/Cesium";
import mars3d from "../../map/mars3d/mars3d";

import { getMapConfig } from "../../map/api";
import {
  InitMap,
  UrlArr,
  startRadar,
  initWork,
  stopRaodian,
  initPointWork,
  createWenmiao,
  startRaodian
} from "../../map/app";

import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import nalTool from "../../components/navTool"; //先要引入


export default {
  name: "radarReflect",
  components: {
    nalTool
  },
  data: function (){
    return {
      viewer: null,
      inputText: "",
      motionlessTime: 0 // 无操作时间
    }
  },
  mounted() {
    const that = this;
    getMapConfig().then(data => {
      let params = {
        id:"cesiumContainer",
        data: data
      }
      InitMap(params,function (viewer) {
        that.viewer = viewer;
        // initWork(); // 上海白模
        // var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        // that.clearRaodia(handler)
        // initPointWork();
        // setInterval(that.setRunRaodian, 1000); //启动,func不能使用括号
      });
    });
  },
  computed: {
    ...mapState({
      //这里的...是超引用，ES6的语法，意思是state里有多少属性值用户1可以在这里放多少属性值
      isShow: state => state.footerStatus.showFooter, //注意这些与上面的区别就是state.footerStatus,
      MyordersData: state => state.collection.MyordersData
      // arrList: state => state.collection.collects
      //里面定义的showFooter是指footerStatus.js里state的showFooter
    }),
    ...mapGetters("collection", {
      //用mapGetters来获取collection.js里面的getters
      arrList: "renderOrdersData",
      // MyordersData: "renderOrdersData"
    })
  },
  methods: {
    addCloud() {
      let urlArr = UrlArr();
      startRadar(urlArr,1); //时空雷达
    },
    clearRaodia(obj) {
      const that = this;
      document.onmousemove=function(){
        stopRaodian();
        that.motionlessTime = 0;
      }
      document.onclick=function(){
        console.log("点击事件")
        stopRaodian();
        that.motionlessTime = 0;
      }
    },
    setRunRaodian() {
      this.motionlessTime++;
      if(this.motionlessTime >= 10) {
        this.motionlessTime = 0;
        startRaodian();
      }

    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.radar-reflect {
  width: 100%;
  height: 100%;
  .inputText {
    position: absolute;
    top: 75px;
    left: 15px;
  }

}

</style>
