<template>
  <div style="width: 100%; height: 100%;">
    <div class="HelpHeader_container_2CDP0j SidebarHotspot_header_3SfNUL">
      <div class="HelpHeader_btn_1i0VHD" @click="addHotFn">
        <a
          class="StyledButton_button_3hxqk3 StyledButton_default_25Ch8E"
          href="javascript: void 0;"
          style="width: 100%; height: 30px; padding-left: 0px; padding-right: 0px;"
        >添加热点</a>
      </div>
      <a href="javascript: void 0;">
        <svg width="18" height="18" viewBox="0 0 18 18" xmlns>
          <g transform="translate(1 1)" fill="none" fill-rule="evenodd">
            <circle stroke="#AAA" stroke-width="1.4" fill="#2C2C2C" cx="8" cy="8" r="8" />
            <g fill="#AAA">
              <path
                d="M8 13c-.547 0-1-.453-1-1 0-.547.453-1 1-1 .566 0 1 .453 1 1 0 .528-.453 1-1 1zM8.251 8.417c-.024.014-.123.068-.135.11a.876.876 0 0 0-.062.286c-.012.082 0 .396 0 .464 0 .41-.295.723-.653.723-.32 0-.59-.26-.652-.614 0-.041-.013-.177-.013-.273 0-.246 0-.723.013-.955 0-.068.024-.218.037-.26.123-.477.43-.709.69-.804.086-.041.32-.11.406-.137.43-.177.739-.628.739-1.173 0-.683-.505-1.242-1.121-1.242-.579 0-1.047.477-1.12 1.092 0 .054-.062.45-.075.518-.073.287-.32.505-.603.505a.594.594 0 0 1-.517-.314A1.443 1.443 0 0 1 5 5.702c0-.15.037-.382.037-.423C5.247 3.982 6.268 3 7.5 3 8.88 3 10 4.242 10 5.77c-.025 1.242-.751 2.279-1.749 2.647z"
              />
            </g>
          </g>
        </svg>
      </a>
    </div>

    <!-- 当前热点 -->
    <div class="dangqian">
      <div class="SidebarHotspot_title_QWUW0D">当前场景热点(18)</div>
      <div class="SidebarHotspot_list_2NQybN">
        <div
          class="SidebarHotspotItem_item_3Ugj4a"
          v-for="(item, index) in dotList"
          @click="listClickDot(item)"
        >
          <div class="SidebarHotspotItem_icon_2nsHhN">
            <div
              style="width: 100%; height: 100%;"
              :class="{
                'dian_point': item.typeName === '圆点标签',
                'text_point': item.typeName === '文字标签',
                'iconfont icon-ziyuan': item.typeName === '视频标签',
                'iconfont icon-lianjie': item.typeName === '链接标签',
              }"
            ></div>
          </div>
          <div class="SidebarHotspotItem_name_3mSobB ellipsis"></div>
          <div class="SidebarHotspotItem_typeName_1KKpEZ">{{item.name}}</div>
        </div>
      </div>
    </div>

    <!-- 失活的组件将会被缓存！-->
    <keep-alive>
      <component
        :class="setClass"
        :key="Date.now().toString(36)"
        v-bind:is="MyrightComponentName"
        :data="selectItem"
        @setHotData="setHotData"
        @deletHotData="deletHotData"
        @deletTextData="deletTextData"
        @setTextData="setTextData"
        @addTextData="addTextData"
        @deletVideoData="deletVideoData"
        @setVideoData="setVideoData"
        @addVideoData="addVideoData"
        @setLinkData="setLinkData"
        @deletLinkData="deletLinkData"
      ></component>
    </keep-alive>
  </div>
</template>


<script>
import {
  getWindowObj,
  addFeature,
  flyToPoint,
  removeDntitie,
  flyToText,
  drawTextPoint,
  deletTextPoint
} from "@/map/app.js";

import { listSearchMixin } from "@/mixin"; //混淆请求
import { getMapConfig } from "@/map/api";

import addHotspot from "@/views/rightPanel/addHotspot";
import setHotspot_dian from "@/views/rightPanel/setHotspot_dian";
import setHotspot_text from "@/views/rightPanel/setHotspot_text";
import setHotspot_video from "@/views/rightPanel/setHotspot_video";
import setHotspot_link from "@/views/rightPanel/setHotspot_link";

export default {
  mixins: [listSearchMixin],
  name: "hotspot",
  components: {
    addHotspot,
    setHotspot_dian,
    setHotspot_text,
    setHotspot_video,
    setHotspot_link
  },
  data() {
    return {
      // point: {
      dotList: [
        {
          name: "丹东港",
          X: 119.033069,
          Y: 33.589196,
          zydw: "茂名单位",
          jzmj: "43平方米",
          jzcs: 2,
          jzjg: "钢混",
          jzlf: "2006年",
          id: 111,
          typeName: "圆点标签"
        },
        {
          name: "文章港",
          X: 119.036069,
          Y: 33.529196,
          id: 2111,
          desc: "此处可以绑定任意Html代码和css效果",
          typeName: "文字标签"
        },
        {
          name: "电影院",
          X: 119.031069,
          Y: 33.529596,
          id: 267923,
          typeName: "视频标签",
          url: "http://data.marsgis.cn/video/lukou.mp4"
        },
        {
          name: "超级链接",
          X: 119.021069,
          Y: 33.539596,
          id: 113479,
          typeName: "链接标签",
          link: "http://www.baidu.com"
        }
      ],
      // },
      selectItem: null,
      featureList: [],
      setClass: "",
      divpointList: []
    };
  },
  created() {
    const that = this;
    this.getUserdata();
    // this.dotList = this.Userdata.dotList || [];
    this.Userdata.dotList = this.dotList;
    this.$store.dispatch("collection/ORDERS_DATA", this.Userdata);
  },
  mounted() {
    const that = this;
    this.dotList.forEach((item, index, arr) => {
      if (item.typeName === "圆点标签") {
        let obj = addFeature(item);
        that.featureList.push({
          id: item.id,
          feature: obj
        });
      } else if (item.typeName === "文字标签") {
        let html = `<div class="divpoint2">
                      <div class="title" id="a${item.id}">${item.name}</div>
                      <div class="content" id="b${item.id}">${item.desc}</div>
                    </div>`;
        drawTextPoint(html, item, function(params) {
          that.divpointList.push({
            divpoint: params,
            id: item.id
          });
        });
      } else if (item.typeName === "视频标签") {
        let html = `<div class="video_con" style="left: 600.707px; bottom: 432.413px;">
                      <video crossorigin=""  id="b${item.id}" autoplay="autoplay" loop="loop" muted="muted" class="video" src="${item.url}"></video>
                      <label class="name" id="a${item.id}">${item.name}</label>
                      <button class="fsbtn"></button>
                      <span class="arrow"></span>
                    </div>`;
        drawTextPoint(html, item, function(params) {
          that.divpointList.push({
            divpoint: params,
            id: item.id
          });
        });
      } else if (item.typeName === "链接标签") {
        let html = `<div class="image_link" id="a${item.id}" title="${item.link}">
                      <span class="iconfont icon-lianjie"></span>
                    </div>`;
        drawTextPoint(html, item, function(params) {
          that.divpointList.push({
            divpoint: params,
            id: item.id
          });
          document.getElementById("a" + item.id).onclick = function(params) {
            window.open(item.link);
          };
        });
      }

      // arr[index].feature = obj;
    });
  },
  methods: {
    listClickDot(item) {
      console.log("item", item);

      this.selectItem = item;
      this.selectItem.type = "修改";
      if (item.typeName === "圆点标签") {
        let select = this.featureList.find(selet => selet.id === item.id);
        flyToPoint(select.feature);
        this.$store.dispatch("collection/set_ComponentName", "setHotspot_dian");
      } else if (item.typeName === "文字标签") {
        flyToText(item);
        this.$store.dispatch("collection/set_ComponentName", "setHotspot_text");
      } else if (item.typeName === "视频标签") {
        flyToText(item);
        this.$store.dispatch(
          "collection/set_ComponentName",
          "setHotspot_video"
        );
      } else if(item.typeName === "链接标签") {
        flyToText(item);
        this.$store.dispatch("collection/set_ComponentName", "setHotspot_link");
      }

      // this.setClass = "noAnimation";
    },
    deletHotData(item) {
      let select = this.featureList.find(selet => selet.id === item.id);
      removeDntitie(select.feature); //删除点
      this.dotList.forEach((val, index) => {
        if (item.id === val.id) {
          this.dotList.splice(index, 1);
        }
      });
      console.log("删除后的结果", this.dotList);
      this.Userdata.dotList = this.dotList;
      this.$store.dispatch("collection/ORDERS_DATA", this.Userdata);
      this.$store.dispatch("collection/set_ComponentName", "");
    },
    addHotFn() {
      this.$store.dispatch("collection/set_ComponentName", "addHotspot");
    },
    setHotData(data) {
      const that = this;
      if (data.type === "增加") {
        this.dotList.push({
          X: data.X,
          Y: data.Y,
          id: data.id,
          jzcs: data.jzcs,
          jzjg: data.jzjg,
          jzlf: data.jzlf,
          zydw: data.zydw,
          jzmj: data.jzmj,
          name: data.name,
          typeName: "圆点标签"
        });
        that.featureList.push({
          id: data.id,
          feature: data.feature
        });
      } else {
        this.dotList.forEach((item, index, arr) => {
          if (item.id === data.id) {
            that.dotList[index] = data;
          }
        });
        let select = that.featureList.find(selet => selet.id === data.id);
        removeDntitie(select.feature); //删除点

        let obj = addFeature(data);
        this.featureList.forEach((val, index) => {
          if (data.id === val.id) {
            that.featureList.splice(index, 1);
          }
        });
        that.featureList.push({
          id: data.id,
          feature: data.feature
        });
      }
      console.log("增加后dotList", this.dotList);
      this.Userdata.dotList = this.dotList;
      this.$store.dispatch("collection/ORDERS_DATA", this.Userdata);
    },
    deletTextData(formData) {
      const that = this;
      this.dotList.forEach((val, index) => {
        if (formData.id === val.id) {
          that.dotList.splice(index, 1);
        }
      });
      this.divpointList.forEach((val, index) => {
        if (formData.id === val.id) {
          val.divpoint.destroy();
          that.divpointList.splice(index, 1);
        }
      });
      this.Userdata.dotList = this.dotList;
      this.$store.dispatch("collection/ORDERS_DATA", this.Userdata);
    },
    setTextData(formData) {
      const that = this;
      // console.log("formData", formData);
      this.dotList.forEach((item, index, arr) => {
        if (item.id === formData.id) {
          that.dotList[index] = formData;
          // document.getElementById("a" + formData.id).innerText = formData.name;
          document.getElementById("b" + formData.id).innerText = formData.desc;
        }
      });
      this.Userdata.dotList = this.dotList;
      this.$store.dispatch("collection/ORDERS_DATA", this.Userdata);
    },
    addTextData(data) {
      const that = this;
      this.dotList.push({
        X: data.X,
        Y: data.Y,
        id: data.id,
        name: data.name,
        desc: data.desc,
        typeName: "文字标签"
      });
      that.divpointList.push({
        id: data.id,
        divpoint: data.divpoint
      });
      this.Userdata.dotList = this.dotList;
      this.$store.dispatch("collection/ORDERS_DATA", this.Userdata);
    },
    deletVideoData(data) {
      this.deletTextData(data);
    },
    setVideoData(data) {
      const that = this;
      this.dotList.forEach((item, index, arr) => {
        if (item.id === data.id) {
          that.dotList[index] = data;
          // document.getElementById("a" + formData.id).innerText = formData.name;
          document.getElementById("b" + data.id).innerText = data.url;
        }
      });
      this.Userdata.dotList = this.dotList;
      this.$store.dispatch("collection/ORDERS_DATA", this.Userdata);
    },
    addVideoData(data) {
      const that = this;
      this.dotList.push({
        X: data.X,
        Y: data.Y,
        id: data.id,
        name: data.name,
        url: data.url,
        typeName: "视频标签"
      });
      that.divpointList.push({
        id: data.id,
        divpoint: data.divpoint
      });
      this.Userdata.dotList = this.dotList;
      this.$store.dispatch("collection/ORDERS_DATA", this.Userdata);
    },
    setLinkData(data) {
      const that = this;
      // console.log("formData", formData);
      this.dotList.forEach((item, index, arr) => {
        if (item.id === data.id) {
          that.dotList[index] = data;
          let demo = document.getElementById("a" + item.id);
          demo.title = data.link;
          demo.onclick = function(params) {
            window.open(data.link);
          };
        }
      });
      this.Userdata.dotList = this.dotList;
      this.$store.dispatch("collection/ORDERS_DATA", this.Userdata);
    },
    deletLinkData(data) {
      this.deletTextData(data);
    }
  },
  activated() {
    // console.log("组件被激活了");
  },
  deactivated() {
    // console.log("组件被停用了");
    this.$store.dispatch("collection/set_ComponentName", "");
  }
};
</script>


<style lang="scss" scoped>
@import "@/assets/theme/common.scss";
.SidebarHotspot_header_3SfNUL {
  padding: 15px;
  border-bottom: 1px solid #000;
  .HelpHeader_btn_1i0VHD {
    width: 155px;
    .StyledButton_default_25Ch8E {
      background-color: $mainColor;
      color: #fff;
      width: 100%;
      height: 30px;
      padding-left: 0px;
      padding-right: 0px;
    }
    .StyledButton_button_3hxqk3 {
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 30px;
      border-radius: 3px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
}
.dangqian {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding-bottom: 60px;
  .SidebarHotspot_title_QWUW0D {
    border-top: 1px solid #4b4b4b;
    padding: 15px;
  }
  .SidebarHotspot_list_2NQybN {
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
        flex: 0 0 100px;
        color: #aaa;
        font-size: 12px;
        text-align: right;
      }
    }
  }
}
</style>
<style lang="scss">
.noAnimation {
  animation-duration: 0;
  animation-name: none;
}
.icon-lianjie {
    font-size: 20px;
    color: #286efa;
    margin-left: 2px;
  }
// 图片
.dian_point {
  background: url("../../../assets/common/image/dian_point.png") no-repeat
    center;
  background-size: 70%;
}
.text_point {
  background: url("../../../assets/common/image/div2.png") no-repeat center;
  background-size: 100%;
}
.icon-ziyuan {
  text-align: right;
  color: #10c1c1;
}
.video_con {
  position: absolute;
  width: 266px;
  height: 155px;
  background: url("../../../assets/common/image/video.png") no-repeat center;
  background-size: 100%;
  .video {
    width: 256px;
    margin-left: 6px;
    margin-top: 6px;
  }
  .name {
    position: absolute;
    top: 4px;
    color: #fff;
    right: 4px;
    width: 124px;
    height: 24px;
    text-align: right;
    padding-right: 8px;
    line-height: 24px;
    background: transparent;
    // background: url("../../../assets/common/image/video_name.png") no-repeat center;
    background-size: 100%;
    font-size: 14px;
  }
  .fsbtn {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 20px;
    height: 20px;
    background: url("../../../assets/common/image/full_screen.png") no-repeat
      center;
    background-size: 100%;
    border: none;
    cursor: pointer;
    outline: none;
    color: #0bfcfc;
  }
  .mapbtn {
    position: absolute;
    bottom: 8px;
    right: 36px;
    width: 30px;
    height: 20px;
    border: none;
    cursor: pointer;
    outline: none;
    background-color: transparent;
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
  .arrow {
    display: inline-block;
    position: absolute;
    right: 59px;
    bottom: -28px;
    width: 138px;
    height: 30px;
    background: url("../../../assets/common/image/bottom_triangle.png")
      no-repeat center;
    background-size: 100%;
  }

}
</style>