<template>
  <div class="radar-reflect">
    <!--加载前进行操作提示，优化用户体验-->
    <div id="mask" class="signmask" onclick="removeMask()"></div>

    <div id="cesiumContainer" class="cesium-container"></div>
    <el-row class="block-col-2 tool-btn">
      <el-col>
        <el-dropdown>
          <span class="el-dropdown-link">
            <span class="iconfont">&#xe606;</span>工具<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">标签工具</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">测量工具</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
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
} from "./app";

import { mapState, mapGetters, mapActions } from "vuex"; //先要引入


export default {
  name: "radarReflect",
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
        initWork(); // 上海白模
        //  let urlArr = UrlArr();
        // startRadar(urlArr,1); //时空雷达
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        that.clearRaodia(handler)
        initPointWork();
        setInterval(that.setRunRaodian, 1000); //启动,func不能使用括号
      });
      // console.log("getters", this.$store.getters["collection/renderOrdersData"]);
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
      // Object.keys(Cesium.ScreenSpaceEventType).forEach(item => {
      //   // if(item != "MOUSE_MOVE") {
      //   obj.setInputAction(function(click){
      //       console.log('事件：'+ item, click.position);
      //       stopRaodian();
      //       that.motionlessTime = 0;
      //   },Cesium.ScreenSpaceEventType[item]);
      //   // }
      // })
      // console.log("MyordersData",this.MyordersData)
    },
    setRunRaodian() {
      this.motionlessTime++;
      if(this.motionlessTime >= 10) {
        this.motionlessTime = 0;
        startRaodian();
      }

    }

  },
  watch: {
    MyordersData(val) {
      const that = this;
      stopRaodian();
      console.log("val",val)
      switch (val.name) {
        case "文庙单体化":
          getMapConfig().then(data => {
            console.log("camera", that.viewer.camera);
            createWenmiao("cesiumContainer", data);
            that.viewer.camera.flyTo({
              destination : Cesium.Cartesian3.fromDegrees(119.032216, 33.591536, 445.08),
              easingFunction : Cesium.EasingFunction.LINEAR_NONE,
              // duration:7,   //定位的时间间隔
              orientation : {
                // heading : Cesium.Math.toRadians(10),
                pitch : Cesium.Math.toRadians(-75),
                roll : 0
              },
              // flyOverLongitude: Cesium.Math.toRadians(40)
              // complete: function () {
              //   createWenmiao("cesiumContainer", data);
              // }
            });
          });
          break;

        default:
          break;
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
  .cesium-container {
    width: 100%;
    height: 100%;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .tool-btn {
    position: absolute;
    top: 70px;
    right: 5px;
    width: 70px;
    height: 30px;
        background: rgba(43, 44, 47, 0.8);
    border-radius: 3px;
    box-shadow: 1px 2px 1px rgba(0,0,0,.15);
  }


}

</style>
<style>
  .radar-reflect .el-dropdown-link.el-dropdown-selfdefine {
    width: 100%;
    display: block;
    color: #fff;
    padding:4px 2px 2px;
  }
  .radar-reflect .el-dropdown-link.el-dropdown-selfdefine .iconfont {
    /* font-size: 22px; */
    margin:0 2px;
  }
   .radar-reflect .el-dropdown-link.el-dropdown-selfdefine:hover {
    color: #89bceb;
  }
   .radar-reflect .el-dropdown-link.el-dropdown-selfdefine:focus {
    color: #89bceb;
  }
  .radar-reflect .cesium-viewer-vrContainer,.radar-reflect .cesium-viewer-fullscreenContainer {
    bottom: initial;
    top: 70px;
    width: 31px;
    height: 31px;
    border-radius: 14%;
  }
  .radar-reflect  .cesium-viewer-toolbar {
    top: 70px;
    right: 111px;
  }

  .radar-reflect .cesium-viewer-toolbar > * {
    margin: 0 !important;
  }
  .radar-reflect .cesium-toolbar-button {
    width: 31px;
    height: 31px;
    margin: 0;
  }
  .radar-reflect .cesium-viewer-vrContainer {
    right: 110px !important;
  }
  .radar-reflect .cesium-viewer-fullscreenContainer {
    right: 80px;
  }
  .divpoint1 {
    top: -1000px;
    left: -1000px;
    width: 200px;
    height: 134px;
    background: rgba(42, 42, 42, 0.8);
    border-radius: 4px;

    position: absolute;
    background: url("../../assets/common/image/map/div1.png");
    background-size: 100%;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;

    -webkit-animation: mymove 5s infinite;
    animation: mymove 5s infinite;
    animation-duration: 5s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-fill-mode: none;
    animation-play-state: running;
    animation-name: mymove;

    /*加上这个css后鼠标可以穿透，但是无法触发单击事件*/
    /* pointer-events:none; */
}

.divpoint1 .title {
    position: inherit;
    top: 20px;
    left: 70px;
    font-size: 15px;
    text-align: left;
    color: rgba(255, 255, 255, 1);
    text-shadow: 0px 0px 9px rgba(0, 0, 0, 0.75);
}

.divpoint2 {
    top: -1000px;
    left: -1000px;
    width: 200px;
    height: 157px;
    background: rgba(42, 42, 42, 0.8);
    border-radius: 4px;
    position: absolute;
    background: url("../../assets/common/image/map/div2.png");
    background-size: 100%;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;

    -webkit-animation: mymove 5s infinite;
    animation: mymove 5s infinite;
    animation-duration: 5s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-fill-mode: none;
    animation-play-state: running;
    animation-name: mymove;

    /*加上这个css后鼠标可以穿透，但是无法触发单击事件*/
    /* pointer-events:none; */
}

.divpoint2 .title {
    position: inherit;
    top: 22px;
    left: 70px;
    font-size: 14px;
    text-align: left;

    color: rgba(255, 255, 255, 1);
    text-shadow: 0px 0px 9px rgba(0, 0, 0, 0.75);
}

.divpoint2 .content {
    position: absolute;
    font-size: 12px;
    top: 50px;
    left: 50px;
    width: 130px;
    height: 47px;
    text-align: left;
    color: rgba(255, 255, 255, 1);
    background-color: transparent;
    border: none;
    display: block;
    word-break: break-all;
    /* overflow: hidden; */
    /* line-height: 0; */
}
</style>
