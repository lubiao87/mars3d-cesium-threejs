<template>
  <div class="radar-reflect">
    <div id="cesiumContainer" class="cesium-container"></div>
    <el-row class="block-col-2 tool-btn">
      <el-col>
        <el-dropdown>
          <span class="el-dropdown-link">
            <span class="iconfont">&#xe606;</span>工具<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import "cesium/Widgets/widgets.css";
import * as Cesium from "cesium/Cesium";

import "../../map/mars3d/mars3d.css";
import mars3d from "../../map/mars3d/mars3d";


import { getMapConfig } from "../../map/api";
import { InitMap, UrlArr, startRadar, changeRadarAlpha } from "./app";



export default {
  name: "radarReflect",
  data: function (){
    return {
      viewer: null
    }
  },
  mounted() {
    const that = this;
    getMapConfig().then(data => {
      let params = {
        id:"cesiumContainer",
        data: data
      }
      InitMap(params, that);
       let urlArr = UrlArr();
      startRadar(urlArr,1); //时空雷达
    });
  },

  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.radar-reflect {
  width: 100%;
  height: 100%;
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
</style>
