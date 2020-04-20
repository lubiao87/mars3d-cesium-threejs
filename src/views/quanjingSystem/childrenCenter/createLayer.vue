<template>
  <div id="cesiumContainer" class="cesium-container"></div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import { listSearchMixin } from "@/mixin"; //混淆请求
import { createWenmiao, setMoveEnd, setLEFT_CLICK } from "@/map/app";
import { getMapConfig } from "@/map/api";

import { expImage } from "@/views/quanjingSystem/childrenRight/visualAngle";

export default {
  name: "createLayer",
  mixins: [listSearchMixin],
  data() {
    return {
      base64: "",
      // creadflag: false,
      Userdata: null,
      center: {},
      clearFlag: false,
      btnList: [
        {
          value: "geocoder",
          text: "搜索工具",
          show: true,
          className: "cesium-viewer-geocoderContainer"
        },
        {
          value: "homeButton",
          text: "默认窗口",
          show: true,
          className: "cesium-home-button"
        },
        {
          value: "sceneModePicker",
          text: "23D切换",
          show: true,
          className: "cesium-sceneModePicker-wrapper"
        },
        {
          value: "navigationHelpButton",
          text: "控件帮助",
          show: true,
          className: "cesium-navigationHelpButton-wrapper"
        },
        {
          value: "animation",
          text: "播放控制器",
          show: true,
          className: "cesium-viewer-animationContainer"
        },
        {
          value: "fullscreenButton",
          text: "全屏切换",
          show: true,
          className: "cesium-viewer-fullscreenContainer"
        },
        {
          value: "vrButton",
          text: "vr模式",
          show: true,
          className: "cesium-viewer-vrContainer"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      //这里的...是超引用，ES6的语法，意思是state里有多少属性值用户1可以在这里放多少属性值
      MyordersData: state => state.collection.MyordersData
      // arrList: state => state.collection.collects
      //里面定义的showFooter是指footerStatus.js里state的showFooter
    })
  },
  created() {
    this.clearFlag = true;
  },
  mounted() {
    const that = this;
    this.getUserdata();
    console.log("this.MyordersData: ", that.MyordersData);
    that.btnList.forEach((item, i) => {
      that.Userdata.map3d[item.value]= true;
      that.btnList[i].show = that.MyordersData.map3d[item.value];

    })
    createWenmiao("cesiumContainer", that.Userdata, function(viewer) {
      that.viewer = viewer;
      that.btnList.forEach((item, i) => {
        console.log(that.Userdata.map3d[item.value]);
        let domArr = document.getElementsByClassName(item.className);
        if(domArr.length) {
          domArr[0].style.zIndex= -1;
        }
      })
      getMapConfig(3).then(data => {
        // console.log("this.Userdata: ", that.Userdata);
        that.btnList.forEach((item, i) => {
          that.btnList[i].show = data.data.map3d[item.value];
          let domArr = document.getElementsByClassName(item.className);
          if(domArr.length) {
            if(that.btnList[i].show ) {
              domArr[0].style.zIndex= 1;
            } else {
              domArr[0].style.zIndex= -1;
            }
          }
        })
      });
    });
  },
  methods: {
    ...mapActions("collection", [
      //collection是指modules文件夹下的collection.js
      "ORDERSDATA", //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
      "setViewer"
    ]),
    setMoveEnd(data) {
      console.log("setMoveEnd", this.viewer.scene.camera.position);
      let position = this.viewer.scene.camera.position;
      var cartesian3=new Cesium.Cartesian3(position.x,position.y,position.z);
      //拾取笛卡尔坐标
      var ellipsoid = this.viewer.scene.globe.ellipsoid; //全局椭球体
      //中心点位置
      var cartographic=ellipsoid.cartesianToCartographic(cartesian3);
      var lat= Cesium.Math.toDegrees(cartographic.latitude);
      var lng= Cesium.Math.toDegrees(cartographic.longitude);
      var alt= cartographic.height;
      var heading = Cesium.Math.toDegrees(this.viewer.camera.heading);
      var pitch = Cesium.Math.toDegrees(this.viewer.camera.pitch);
      var roll = Cesium.Math.toDegrees(this.viewer.camera.roll);

      this.center = {
        y: lng,
        x: lat,
        z: alt,
        heading: JSON.parse(heading),
        pitch: JSON.parse(pitch),
        roll: JSON.parse(roll)
      };
      this.Userdata.map3d.center = this.center;
      console.log("this.center: ", this.center);
      this.$store.dispatch("collection/ORDERS_DATA", this.Userdata);

    },
    setLEFT_CLICK(data) {
      // console.log(e);
      this.setMoveEnd(data);
    }
  },
  activated() {
    const that = this;
    getMapConfig(3).then(data => {
        console.log("data.data: ", data.data);
        that.btnList.forEach((item, i) => {
          that.btnList[i].show = data.data.map3d[item.value];
          let domArr = document.getElementsByClassName(item.className);
          if(domArr.length) {
            if(that.btnList[i].show ) {
              domArr[0].style.zIndex= 1;
            } else {
              domArr[0].style.zIndex= -1;
            }
          }
        })
      });
    console.log("3d地图组件被激活了", this.btnList);

  },
  deactivated() {
    console.log("3d地图组件被停用了");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.cesium-container {
  width: 100%;
  height: 100%;
  -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.7);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.7);
  overflow: hidden;
}
/**cesium按钮背景色*/
.cesium-button {
  background-color: #3f4854;
  color: #e6e6e6;
  fill: #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.cesium-viewer-geocoderContainer .cesium-geocoder-input {
  background-color: rgba(63, 72, 84, 0.7);
}

.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus {
  background-color: rgba(63, 72, 84, 0.9);
}

.cesium-viewer-geocoderContainer .search-results {
  background-color: #3f4854;
}

.cesium-geocoder-searchButton {
  background-color: #3f4854;
}

.cesium-infoBox-title {
  background-color: #3f4854;
}

.cesium-infoBox {
  background: rgba(63, 72, 84, 0.9);
}
.cesium-toolbar-button img {
  height: 100%;
}

.cesium-performanceDisplay-defaultContainer {
  top: auto;
  bottom: 35px;
}

/**cesium工具栏位置*/
.cesium-viewer-toolbar {
  top: auto;
  left: auto;
  right: 12px;
  bottom: 35px;
}

.cesium-viewer-toolbar > .cesium-toolbar-button,
.cesium-navigationHelpButton-wrapper,
.cesium-viewer-geocoderContainer {
  margin-bottom: 5px;
  float: right;
  clear: both;
  text-align: center;
}

.cesium-baseLayerPicker-dropDown {
  bottom: 0;
  right: 40px;
  max-height: 700px;
  margin-bottom: 5px;
}

.cesium-navigation-help {
  top: auto;
  bottom: 0;
  right: 40px;
  transform-origin: right bottom;
}

.cesium-sceneModePicker-wrapper {
  width: auto;
}

.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-dropDown-icon {
  float: left;
  margin: 0 3px;
}

.cesium-viewer-geocoderContainer .search-results {
  left: 0;
  right: 40px;
  width: auto;
  z-index: 9999;
}

.cesium-infoBox-title {
  background-color: #3f4854;
}

.cesium-infoBox {
  top: 50px;
  background: rgba(63, 72, 84, 0.9);
}

/**左下工具栏菜单*/
.toolbar-dropdown-menu-div {
  background: rgba(43, 44, 47, 0.8);
  border: 1px solid #2b2c2f;

  z-index: 991;
  position: absolute;
  right: 60px;
  bottom: 40px;
  display: none;
}

.toolbar-dropdown-menu {
  min-width: 110px;
  padding: 0;
}
.toolbar-dropdown-menu > li {
  padding: 0 3px;
  margin: 2px 0;
}
.toolbar-dropdown-menu > li > a {
  color: #edffff;
  display: block;
  padding: 4px 10px;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  white-space: nowrap;
  text-decoration: none;
}

.toolbar-dropdown-menu > li > a:hover,
.dropdown-menu > li > a:focus {
  color: #fff;
  background-color: #444d59;
}

.toolbar-dropdown-menu > .active > a,
.dropdown-menu > .active > a:hover,
.dropdown-menu > .active > a:focus {
  color: #fff;
  background-color: #444d59;
}

.toolbar-dropdown-menu i {
  padding-right: 5px;
}
</style>
