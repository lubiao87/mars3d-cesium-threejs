<template>
  <div class="SidePanel_container_3QKxiU">
    <div class="SidePanel_header_1djsTp">
      <div class="SidePanel_title_EMYC65">添加热点</div>
      <div class="SidePanel_close_3DAMye" @click="close">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <div class="SidePanelHotspot_groupTitle_yD3pNx">选择图标</div>

    <div class="SidebarHotspot_list_2NQybN">
        <div class="SidebarHotspotItem_item_3Ugj4a"
          v-for="(item, index) in pointTypeList"
          @click="listClickDot(item)">
          <div class="SidebarHotspotItem_icon_2nsHhN">
             <div style="width: 100%; height: 100%;" :class="item.imgClass"></div>
          </div>
          <!-- <div class="SidebarHotspotItem_name_3mSobB ellipsis"></div> -->
          <div class="SidebarHotspotItem_typeName_1KKpEZ">{{item.text}}</div>
        </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "addHotspot",
  data: function(params) {
    return {
      data: {
        text: "关闭"
      },
      pointTypeList: [
        {
          text: "点标签",
          imgClass: "dian_point"
        },
        {
          text: "文字标签",
          imgClass: "dian"
        },
        {
          text: "文字描述标签",
          imgClass: "dian"
        },
      ]
    };
  },
  methods: {
    close() {
      this.$emit("childByValue", this.data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/theme/common.scss";

.SidePanel_container_3QKxiU {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;
  top: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  width: 260px;
  background: #fff;
  -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.5);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.5);
  background-color: #333;
  color: #fff;
  -webkit-animation-name: SidePanel_slideInRight_1Fl43D;
  animation-name: SidePanel_slideInRight_1Fl43D;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
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
}

@-webkit-keyframes SidePanel_slideInRight_1Fl43D {
  0% {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }
  to {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}
@keyframes SidePanel_slideInRight_1Fl43D {
  0% {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }
  to {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}
</style>
