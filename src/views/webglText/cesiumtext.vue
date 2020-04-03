<template>
  <div id="cesiumContainer" class="cesium-container"></div>
</template>

<script>
import "cesium/Widgets/widgets.css";
import * as Cesium from "cesium/Cesium";

import { load_model } from "@/utils/cesium/model_loader.js";

export default {
  name: "cesiumContainer",
  mounted() {
    // load_model("config/tileset.json", "cesiumContainer");
    load_model("http://reparo.okaygis.com:10092/result/005a417b-0761-4842-9d43-f2be3da3fd55/Scene/Production_1.json", "cesiumContainer");
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

</style>
