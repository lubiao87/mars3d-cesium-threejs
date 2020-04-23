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
          @cancelChildrenData="cancelChildrenData"
          @addChildrenData="addChildrenData"
        ></component>
      </keep-alive>
    </div>
  </right-panel>
</template>

<script>
import rightPanel from "@/components/rightPanel/rightPanel";
import setHotspot_dian from "@/views/rightPanel/setHotspot_dian";
import { left_click, addFeature } from "@/map/app.js";

export default {
  name: "addHotspot",
  components: { rightPanel, setHotspot_dian },
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
      pointValue: "点标签",
      pointTypeList: [
        {
          text: "点标签",
          imgClass: "dian_point",
          value: "点标签"
        },
        {
          text: "文字标签",
          imgClass: "dian",
          value: "文字标签"
        },
        {
          text: "文字描述",
          imgClass: "dian2",
          value: "文字描述"
        }
      ]
    };
  },
  methods: {
    addChildrenData(value) {
      console.log("增加数据", value);
      const that = this;
      this.selectItem = value;
      document.getElementById("cesiumContainer").style.cursor = "crosshair";
      left_click(function (params) {
        // console.log("得到增加数据", params);
        that.selectItem.X =params.lng;
        that.selectItem.Y =params.lat;
        let obj = addFeature(that.selectItem);

        that.selectItem.feature = obj;
        that.$emit("setChildrenData", that.selectItem);
        that.myTabComponent = "";
        that.pointValue = "";
        document.getElementById("cesiumContainer").style.cursor = "default";
      });
    },
    cancelChildrenData() {
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
        type: "增加"
      };
      this.myTabComponent = "";
      this.pointValue = "";
      document.getElementById("cesiumContainer").style.cursor = "default";
    }
  },
  watch: {
    pointValue(value) {
      console.log("pointValue", value);
      switch (value) {
        case "点标签":
          this.myTabComponent = "setHotspot_dian";
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
