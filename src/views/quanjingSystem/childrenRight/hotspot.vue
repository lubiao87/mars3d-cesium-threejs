<template>
<div style="width: 100%; height: 100%;">
  <div class="HelpHeader_container_2CDP0j SidebarHotspot_header_3SfNUL">
    <div class="HelpHeader_btn_1i0VHD">
      <a
        class="StyledButton_button_3hxqk3 StyledButton_default_25Ch8E"
        href="javascript: void 0;"
        style="width: 100%; height: 30px; padding-left: 0px; padding-right: 0px;"
      >添加热点</a>
    </div>
    <a href="javascript: void 0;">
      <svg width="18" height="18" viewBox="0 0 18 18" xmlns="">
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
      <div class="SidebarHotspotItem_item_3Ugj4a"></div>
      <div class="SidebarHotspotItem_item_3Ugj4a"></div>
      <div class="SidebarHotspotItem_item_3Ugj4a"></div>
    </div>
  </div>
</div>

</template>


<script>
import { getWindowObj } from "@/map/app.js";

import { listSearchMixin } from "@/mixin"; //混淆请求
import { getMapConfig } from "@/map/api";
export default {
  mixins: [listSearchMixin],
  data() {
    return {
      base64: "",
      Userdata: null
    };
  },
  // created() {
  //   const that = this;
  //   getMapConfig(3).then(data => {
  //     that.Userdata = data.data;
  //     that.$store.dispatch("collection/ORDERS_DATA", that.Userdata);
  //   });
  // },
  mounted() {},
  methods: {
  },
  activated() {
    // console.log("组件被激活了");

  },
  deactivated() {
    // console.log("组件被停用了");
  }
};
</script>


<style lang="scss" scoped>
.SidebarHotspot_header_3SfNUL {
  padding: 15px;
  border-bottom: 1px solid #000;
  .HelpHeader_btn_1i0VHD {
    width: 155px;
    .StyledButton_default_25Ch8E {
      background-color: #286efa;
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
      }
    }

}
</style>
<style lang="scss">
</style>