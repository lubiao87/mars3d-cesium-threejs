<template>
  <div class="radar-reflect">
    <!--加载前进行操作提示，优化用户体验-->
    <el-row class="block-col-2 tool-btn">
      <el-col>
        <el-dropdown>
          <span class="el-dropdown-link">
            <span class="iconfont">&#xe606;</span>工具<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-picture-outline-round"
              v-for="(item, index) in toolList"
              :key="index"
              v-if="Object.keys(item).length > 3"
              @click.native="addCloud(item)">
              {{item.name}}
            </el-dropdown-item>
            <!-- <el-dropdown-item icon="el-icon-plus">标签工具</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">测量工具</el-dropdown-item>
            <el-dropdown-item icon="el-icon-picture-outline-round" @click.native="addCloud">雷达预警</el-dropdown-item> -->

          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <!-- <div v-text="inputText" class="inputText" id="inputText"></div> -->

  </div>

</template>

<script>


import {
  InitMap,
  UrlArr,
  startRadar,
  initWork,
  stopRaodian,
  initPointWork,
  startRaodian
} from "../map/app";

import { getTool } from "../api/api"; //api配置请求的路径
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入


export default {
  name: "radarReflect",
  data: function (){
    return {
      toolList: []
    }
  },
  mounted() {
    const that = this;
    this.getMenu();
  },
  computed: {
    ...mapState({
      //这里的...是超引用，ES6的语法，意思是state里有多少属性值用户1可以在这里放多少属性值
      isShow: state => state.footerStatus.showFooter, //注意这些与上面的区别就是state.footerStatus,
      MyordersData: state => state.collection.MyordersData
      // arrList: state => state.collection.collects
      //里面定义的showFooter是指footerStatus.js里state的showFooter
    }),
    ...mapGetters("collection", {
      //用mapGetters来获取collection.js里面的getters
      arrList: "renderOrdersData",
      // MyordersData: "renderOrdersData"
    })
  },
  methods: {
    addCloud() {
      let urlArr = UrlArr();
      startRadar(urlArr,1); //时空雷达
    },
    getMenu(){
      let self = this;
      let project__id = this.$route.query.project__id;
      getTool(project__id).then(data => {
        console.log("toolList", data)
        data[0].data.widgets.forEach((item) => {
          if(item.name === "地图工具") {
            self.toolList = item.children;
          }
        })

      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.radar-reflect {
  width: 100%;
  height: 100%;
  .inputText {
    position: absolute;
    top: 75px;
    left: 15px;
  }
  .cesium-container {
    width: 100%;
    height: 100%;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .tool-btn {
    position: absolute;
    top: 70px;
    right: 5px;
    width: 70px;
    height: 30px;
        background: rgba(43, 44, 47, 0.8);
    border-radius: 3px;
    box-shadow: 1px 2px 1px rgba(0,0,0,.15);
  }


}

</style>
<style>
  .radar-reflect .el-dropdown-link.el-dropdown-selfdefine {
    width: 100%;
    display: block;
    color: #fff;
    padding:4px 2px 2px;
  }
  .radar-reflect .el-dropdown-link.el-dropdown-selfdefine .iconfont {
    /* font-size: 22px; */
    margin:0 2px;
  }
   .radar-reflect .el-dropdown-link.el-dropdown-selfdefine:hover {
    color: #89bceb;
  }
   .radar-reflect .el-dropdown-link.el-dropdown-selfdefine:focus {
    color: #89bceb;
  }
  .radar-reflect .cesium-viewer-vrContainer,.radar-reflect .cesium-viewer-fullscreenContainer {
    bottom: initial;
    top: 70px;
    width: 31px;
    height: 31px;
    border-radius: 14%;
  }
  .radar-reflect  .cesium-viewer-toolbar {
    top: 70px;
    right: 111px;
  }

  .radar-reflect .cesium-viewer-toolbar > * {
    margin: 0 !important;
  }
  .radar-reflect .cesium-toolbar-button {
    width: 31px;
    height: 31px;
    margin: 0;
  }
  .radar-reflect .cesium-viewer-vrContainer {
    right: 110px !important;
  }
  .radar-reflect .cesium-viewer-fullscreenContainer {
    right: 80px;
  }
</style>
