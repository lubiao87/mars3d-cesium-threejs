<template>
  <div>
    <el-col :span="12">
    <h5>自定义颜色</h5>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  </div>
</template>

<script>
import { getMenus } from "../api/api"; //api配置请求的路径
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入

export default {
  name: "indexNav",
  // mixins: [listSearchMixin],
  data() {
    return {
      logined: false,
      navList:[]
    };
  },
  computed: {
    ...mapState({
      //这里的...是超引用，ES6的语法，意思是state里有多少属性值用户1可以在这里放多少属性值
      isShow: state => state.footerStatus.showFooter, //注意这些与上面的区别就是state.footerStatus,
      MyordersData: state => state.MyordersData
      // arrList: state => state.collection.collects
      //里面定义的showFooter是指footerStatus.js里state的showFooter
    }),
    ...mapGetters("collection", {
      //用mapGetters来获取collection.js里面的getters
      arrList: "renderOrdersData",
      // MyordersData: "renderOrdersData"
    }),
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
    ...mapActions("collection", [
      //collection是指modules文件夹下的collection.js
      "ORDERSDATA" //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
    ]),
    tologin() {
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
};
</script>
<style  scoped lang="scss">
.header_icon_logout {
  background-image: url(../assets/common/image/header_icon_logout.png);
  width: 20px;
  height: 20px;
  opacity: 0.6;
}
.header_icon_logout:hover {
  opacity: 1;
  cursor: pointer;
}
.nohover:hover {
 cursor: initial;
 width: 100%;
}
.nohover {
    text-align: left;
    margin-left: 15px;
    padding-top: 6px;
}
.ui-menu-seconda {
    text-align: left;
    padding-left: 30px;
    padding-top: 6px;
}
</style>
<style scoped>
.header_icon_logout.fn-ml20 {
  display: inline-block;
  float: left;
  margin-top: 24px;
}
</style>
