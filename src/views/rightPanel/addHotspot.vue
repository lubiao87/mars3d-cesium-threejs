<template>
  <right-panel>
    <div class="SidePanelHotspot_groupTitle_yD3pNx">选择图标</div>

    <div class="SidebarHotspot_list_2NQybN">
      <!-- <div class="SidebarHotspotItem_item_3Ugj4a"
            v-for="(item, index) in pointTypeList"
            @click="listClickDot(item)">
            <div class="SidebarHotspotItem_icon_2nsHhN">
              <div style="width: 100%; height: 100%;" :class="item.imgClass"></div>
            </div>
            <div class="SidebarHotspotItem_typeName_1KKpEZ">{{item.text}}</div>
      </div>-->
      <el-select v-model="pointValue" placeholder="请选择">
        <el-option
          v-for="item in pointTypeList"
          :key="item.value"
          :label="item.text"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- 失活的组件将会被缓存！-->
      <keep-alive>
        <component
          class="addHots"
          :key="Date.now().toString(36)"
          v-bind:is="myTabComponent"
          :data="selectItem"
          @cancelHotData="cancelHotData"
          @addHotData="addHotData"
          @canselTextData="canselTextData"
          @addTextData="addTextData"
          @addVideoData="addVideoData"
        ></component>
      </keep-alive>
    </div>
  </right-panel>
</template>

<script>
import rightPanel from "@/components/rightPanel/rightPanel";
import setHotspot_dian from "@/views/rightPanel/setHotspot_dian";
import addHotspot_text from "@/views/rightPanel/addHotspot_text";
import addHotspot_video from "@/views/rightPanel/addHotspot_video";
import {
  left_click,
  addFeature,
  drawTextPoint
} from "@/map/app.js";

export default {
  name: "addHotspot",
  components: {
    rightPanel,
    setHotspot_dian,
    addHotspot_text,
    addHotspot_video
  },
  data: function() {
    return {
      selectItem: {
        name: "",
        X: null,
        Y: null,
        zydw: "",
        jzmj: "",
        jzcs: "",
        jzjg: "",
        jzlf: "",
        id: Date.now().toString(36),
        type: "增加"
      },
      myTabComponent: "setHotspot_dian",
      pointValue: "圆点标签",
      pointTypeList: [
        {
          text: "圆点标签",
          imgClass: "dian_point",
          value: "圆点标签"
        },
        {
          text: "文字标签",
          imgClass: "text_point",
          value: "文字标签"
        },
        {
          text: "视频标签",
          imgClass: "video_point",
          value: "视频标签"
        },
      ]
    };
  },
  methods: {
    addHotData(value) {
      // 增加点标签
      console.log("增加数据", value);
      const that = this;
      this.selectItem = value;
      document.getElementById("cesiumContainer").style.cursor = "crosshair";
      left_click(function(params) {
        // console.log("得到增加数据", params);
        that.selectItem.X = params.lng;
        that.selectItem.Y = params.lat;
        let obj = addFeature(that.selectItem);

        that.selectItem.feature = obj;
        that.selectItem.typeName = "圆点标签";
        that.$emit("setHotData", that.selectItem);
        that.myTabComponent = "";
        that.pointValue = "";
        document.getElementById("cesiumContainer").style.cursor = "default";
      });
    },
    cancelHotData() {
      let id = Date.now().toString(36);
      console.log("取消");
      this.selectItem = {
        name: "",
        X: null,
        Y: null,
        zydw: "",
        jzmj: "",
        jzcs: "",
        jzjg: "",
        jzlf: "",
        id: id,
        type: "增加",
        typeName: ""
      };
      this.myTabComponent = "";
      this.pointValue = "";
      document.getElementById("cesiumContainer").style.cursor = "default";
    },
    addTextData(fromData) {
      const that = this;
      let html = `<div class="divpoint2">
                      <div class="title" id="a${fromData.id}">${fromData.name}</div>
                      <div class="content" id="b${fromData.id}">${fromData.desc}</div>
                    </div>`;
      document.getElementById("cesiumContainer").style.cursor = "crosshair";

      left_click(function(params) {
        fromData.X = params.lng;
        fromData.Y = params.lat;
        drawTextPoint(html, fromData, function(divpoint) {
          fromData.divpoint = divpoint;
          that.$emit("addTextData", fromData);
          document.getElementById("cesiumContainer").style.cursor = "default";
        });
      });
    },
    canselTextData() {
      console.log("取消增加");
      this.myTabComponent = "";
      this.pointValue = "";
      document.getElementById("cesiumContainer").style.cursor = "default";
    },
    addVideoData(fromData) {
      const that = this;
      let html = `<div class="video_con" style="left: 600.707px; bottom: 432.413px;">
              <video crossorigin=""  id="b${fromData.id}" autoplay="autoplay" loop="loop" muted="muted" class="video" src="${fromData.url}"></video>
              <label class="name" id="a${fromData.id}">${fromData.name}</label>
              <button class="fsbtn"></button>
              <span class="arrow"></span>
            </div>`;
      document.getElementById("cesiumContainer").style.cursor = "crosshair";
      left_click(function(params) {
        fromData.X = params.lng;
        fromData.Y = params.lat;
        drawTextPoint(html, fromData, function(divpoint) {
          fromData.divpoint = divpoint;
          that.$emit("addVideoData", fromData);
          document.getElementById("cesiumContainer").style.cursor = "default";
        });
      });
    },
    canselVideoData(){
      this.canselTextData();
    }
  },
  watch: {
    pointValue(value) {
      console.log("pointValue", value);
      switch (value) {
        case "圆点标签":
          this.myTabComponent = "setHotspot_dian";
          break;
        case "文字标签":
          this.myTabComponent = "addHotspot_text";
          break;
        case "视频标签":
          this.myTabComponent = "addHotspot_video";
          break;

        default:
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/theme/common.scss";

.SidebarHotspot_list_2NQybN {
  padding: 5px 10px;
  .SidebarHotspotItem_item_3Ugj4a {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 40px;
    margin-bottom: 5px;
    line-height: 20px;
    padding-right: 15px;
    padding-left: 15px;
    cursor: pointer;
    background-color: #3a3a3a;
    .SidebarHotspotItem_icon_2nsHhN {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 22px;
      flex: 0 0 22px;
      width: 22px;
      height: 22px;
    }
    .SidebarHotspotItem_name_3mSobB {
      -webkit-box-flex: 1;
      -ms-flex: 1 auto;
      flex: 1 auto;
      padding-left: 15px;
    }
    .ellipsis {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      min-height: 1em;
    }
    .SidebarHotspotItem_typeName_1KKpEZ {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 60px;
      // flex: 0 0 100px;
      margin-left: 15px;
      color: #fff;
      font-size: 14px;
      text-align: right;
    }
  }
}
.SidePanel_header_1djsTp {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 40px;
  flex: 0 0 40px;
  border-bottom: 1px solid #000;

  .SidePanel_title_EMYC65 {
    -webkit-box-flex: 1;
    -ms-flex: 1 auto;
    flex: 1 auto;
    padding-left: 15px;
    font-size: 16px;
    -ms-flex-align: center;
  }
  .SidePanel_close_3DAMye {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
}
.SidePanel_header_1djsTp,
.SidePanel_title_EMYC65 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.SidePanelHotspot_groupTitle_yD3pNx {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 15px;
  height: 40px;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(4%, hsla(0, 0%, 100%, 0.3)),
    color-stop(98%, hsla(0, 0%, 100%, 0))
  );
  background-image: -o-linear-gradient(
    left,
    hsla(0, 0%, 100%, 0.3) 4%,
    hsla(0, 0%, 100%, 0) 98%
  );
  background-image: linear-gradient(
    90deg,
    hsla(0, 0%, 100%, 0.3) 4%,
    hsla(0, 0%, 100%, 0) 98%
  );
}
.el-select {
  width: 100%;
  margin-top: 15px;
}
.addHots {
  display: block;
  position: relative;
  width: inherit;
  margin-top: 20px;
  .SidePanel_header_1djsTp {
    display: none;
  }
}
</style>
