<template>
  <div id="cesiumContainer" class="cesium-container"></div>
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
<style >
.cesium-container {
  width: 100%;
  height: 100%;
}
.cesium-viewer-toolbar {
    top: 70px;
}
</style>
