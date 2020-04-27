<template>
  <div class="index-hearder border-style1">
    项目001
    <div class="fanhui">
      <span class="iconfont icon-undo-outline"></span>
       <span class="fh">返回</span>
    </div>
    <div class="baocun" @click="baocunPut">
      <span class="iconfont icon-checkmark-square-outline"></span>
       <span class="fh">保存</span>
    </div>
    <div class="baocun" @click="yuLan">
      <span class="iconfont icon-yulan"></span>
       <span class="fh">预览</span>
    </div>
  </div>
</template>

<script>
import { putUserdata } from "@/api/api"; //api配置请求的路径
import { listSearchMixin } from "@/mixin"; //混淆请求
import { Message } from "element-ui";

import * as Cesium from "cesium/Cesium";

export default {
  mixins: [listSearchMixin],
  name: "indexHearder",
  data() {
    return {
      logined: false,
      navList:[
      ]
    };
  },
  computed: {
    currentPath() {
      return this.$route.path;
    }
  },
  mounted() {
    // this.getMenu();
  },
  methods: {
    getMenu(){
      let self = this;
      let project__id = this.$route.query.project__id;
      getMenus(project__id).then(data => {
        console.log("nav", data)
        self.navList = data[0].data;
      });
    },
    yuLan() {
      this.$router.push("/createLayer");
    },
    baocunPut() {
      const that = this;
      this.getUserdata();
      this.getViewerData();
      if(this.viewer) {
        this.setMoveEnd();
      }
      let formData = new FormData();
      formData.append("data", JSON.stringify(this.Userdata));
      console.log("this.Userdata提交", this.Userdata);
      if(this.Userdata) {
        putUserdata(formData, 3).then(data => {
          Message({
            showClose: true,
            message: "保存成功",
            type: 'success',
            duration: 1000
          });
        })
      } else {
        Message({
          showClose: true,
          message: "保存失败",
          type: 'error',
          duration: 1000
        });
      }

    },
    setMoveEnd() {
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
        y: lat,
        x: lng,
        z: alt,
        heading: JSON.parse(heading),
        pitch: JSON.parse(pitch),
        roll: JSON.parse(roll)
      };
      this.Userdata.map3d.center = this.center;
      console.log("this.center: ", this.center);
      this.$store.dispatch("collection/ORDERS_DATA", this.Userdata);

    }
  }
};
</script>
<style  scoped lang="scss">
@import "@/assets/theme/common.scss";
 .index-hearder {
   -webkit-box-flex: 0;
    -ms-flex: 0 0 40px;
    flex: 0 0 40px;
    -webkit-box-ordinal-group: 2;
    -ms-flex-order: 1;
    order: 1;
    text-align: center;
    line-height: 40px;
    color: $writeColor;
    .fanhui, .baocun {
      padding-left: 15px;
      padding-right: 15px;
      float: left;
      cursor: pointer;
      vertical-align:middle;
      .iconfont {
        font-size: 16px;
      }
      .fh {
        color: $mainTextColor;
        margin-left: 5px;
      }
    }
    .fanhui:hover .fh, .baocun:hover .fh {
      color: $writeColor;
    }
    .baocun {
      float: right;
    }
 }
</style>
