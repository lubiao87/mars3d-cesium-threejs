<template>
  <div class="index-nav2 border-style1">
    <el-menu
      default-active="基础"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item :index="item.name" v-for="(item, index) in navList" :key="index">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { getMenus } from "@/api/api"; //api配置请求的路径
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入

export default {
  name: "indexNav",
  data() {
    return {
      logined: false,
      navList:[
        {
          name: "基础",
          icon: "el-icon-menu",
          component: ""
        },
        {
          name: "视角",
          icon: "el-icon-document",
          component: "visualAngle"
        },
        {
          name: "热点",
          icon: "el-icon-setting",
          component: ""
        }
      ]
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
    handleSelect(key, keyPath) {
      let obj = this.navList.find((item)=> item.name === key);
      this.$emit('fromChild', obj);
    }
  }
};
</script>
<style  scoped lang="scss">

.index-nav2 {
  position: relative;
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 50px;
    flex: 0 0 50px;
  .el-menu {
    background-color: transparent !important;
    border-right: none;
    width: 100%;
    flex-direction: row-reverse;
    position: absolute;
    height: 100%;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;

  }
  .el-menu-item {
    line-height: inherit;
    text-align: center;
    padding-top: 10px !important;
    padding-right: 0!important;
    padding-left: 0!important;
    background-color: transparent !important;
    i {
      display: block;
      // margin-right: 0;
      margin: 0 auto;
    }
  }
}
</style>
