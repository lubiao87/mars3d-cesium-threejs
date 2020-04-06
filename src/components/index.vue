<template>
  <div class="page-index">
    <index-nav></index-nav>
    <keep-alive>
      <router-view
        class="router-view"
        v-if="!($route.meta.keepAlive === false)"
      ></router-view>
    </keep-alive>
    <router-view
      class="router-view"
      v-if="$route.meta.keepAlive === false"
    ></router-view>
  </div>
</template>

<script>
import indexNav from "./indexNav.vue";

export default {
  name: "index",
  components: {
    indexNav
  }
};
</script>

<style>
@import "../map/mars3d/mars3d.css";
@import "../assets/theme/base.css";


.page-index {
  /* overflow-y: auto; */
  height: 100vh;
  background: url(../assets/common/image/common/main_bg.jpg) no-repeat fixed
    #0b192c;
}
.router-view {
  position: absolute;
  top: 0;
  left: 0;
  /*width: 100%;*/
  /*height: 100%;*/
}
.page-index::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
}

.page-index::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 0px;
  /* -webkit-box-shadow: inset 0 0 5px rgba(225,225,225,0.2); */
  background: rgba(225, 225, 225, 0.2);
}

.page-index::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  /* -webkit-box-shadow: inset 0 0 5px rgba(225,225,225,0.2); */
  border-radius: 0;
  background: rgba(225, 225, 225, 0.2);
}
</style>
<style lang="scss" rel="stylesheet/scss">
@import "../assets/theme/common.scss";
.top0 {
  top: -70px;
}
</style>
