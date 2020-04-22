<template>
  <div class="SidePanel_container_3QKxiU">
    <div class="SidePanel_header_1djsTp">
      <div class="SidePanel_title_EMYC65">添加热点</div>
      <div class="SidePanel_close_3DAMye" @click="close">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "rightPanel",
  data: function (params) {
    return {
      data: {
        text: "关闭"
      }
    }
  },
  methods: {
    close() {
      this.$store.dispatch("collection/set_ComponentName", "");
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
