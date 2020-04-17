<template>
  <div class="SidebarView_container_V_iad4">
    <div class="SidebarView_screenshot_1gVYAX">
      <div class="SidebarView_title_16jrja">当前初始视角</div>
      <div id="viewContainer" class="SidebarView_screenshotImg_3zd0D3">
        <img :src="base64" style="width:100%;" ref="base64"/>
      </div>
      <div class="view_frame" ref="view_frame">
        <div
          class="pano-button pano-button-sm pano-button-primary CaptureButton_btn_1RuE7w"
          width="200"
          id="view_frame_btn"
        > 把当前视角设为初始视角</div>
      </div>
    </div>
  </div>
</template>


<script>
import { getWindowObj } from "@/map/app.js";

import { expImage } from "./visualAngle.js";
import { listSearchMixin } from "@/mixin"; //混淆请求

export default {
  mixins: [listSearchMixin],
  data() {
    return {
      base64: "",
      // creadflag: false,
      Userdata: null
    };
  },
  created() {
    this.getUserdata();
  },
  mounted() {
    this.creadflag = true;
    this.base64 = this.Userdata.viewerImgbase64;

    this.view_frameHtml();
  },
  methods: {
    getBase64(data) {
      this.getUserdata();
      this.Userdata.viewerImgbase64 = data;
      this.$store.dispatch("collection/ORDERS_DATA", this.Userdata);
      this.base64 = data;
    },
    view_frameHtml() {
      this.frameHtml = this.$refs.view_frame;
      this.frameHtml.style.display = "block";

      document.getElementById("cesiumContainer").appendChild(this.frameHtml);
      document.getElementById("view_frame_btn").onclick = this.setViewerImage;
    },
    setViewerImage() {
      console.log("ssss");
      let obj = getWindowObj();
      expImage(obj.viewer, this.getBase64);
    }
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
  activated() {
    console.log("组件被激活了");
    if(this.creadflag) {
      this.view_frameHtml();
    }
  },
  deactivated() {
    this.frameHtml.parentNode.removeChild(this.frameHtml);
    console.log("组件被停用了");
  }
};
</script>


<style lang="scss" scoped>
.SidebarView_container_V_iad4 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;
  .SidebarView_screenshot_1gVYAX {
    padding: 30px 15px;
    border-bottom: 1px solid #000;
    cursor: pointer;
    .SidebarView_title_16jrja {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin-bottom: 10px;
    }
    .SidebarView_screenshotImg_3zd0D3 {
      width: 100%;
      height: 100px;
      border-radius: 3px;
      background-color: #4b4b4b;
      background-size: cover;
      background-position: 50%;
      background-repeat: no-repeat;
      -webkit-box-shadow: 0 2px 8px 0 rgba(51, 51, 51, 0.5);
      box-shadow: 0 2px 8px 0 rgba(51, 51, 51, 0.5);
      overflow: hidden;
    }
  }
}
</style>
<style lang="scss">
.view_frame {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  position: absolute;
  z-index: 3001;
  overflow: visible;
  opacity: 1;
  cursor: default;
  pointer-events: none;
  background: url("../../../assets/common/image/view_frame.png") no-repeat
    center;
  background-size: 100%;
  border-style: solid;
  border-color: rgb(0, 0, 0);
  border-width: 0px;
  border-radius: 0px;
  width: 660px;
  height: 360px;
  margin: auto;

  .CaptureButton_btn_1RuE7w {
    width: 200px;
    position: absolute;
    height: 30px;
    background-color: #286efa;
    color: #fff;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    top: 280px;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    margin: auto;
    pointer-events: auto;
  }
}
</style>