<template>
  <div>
    <!-- 头部导航栏开始 -->
    <div class="header ui_header clearfix">
      <h1 class="ui_logo">
        欧科三维GIS综合展示平台
      </h1>
      <div class="ui-nav-center clearfix">
        <ul class="ui-nav-menu clearfix">
          <!-- <li class="ui-menu-firstli">
            <a class="ui-menu-firsta"
               :class="{ 'iscur':['//populationHome','/wifiHome','/regionalHome','/tradeHome'].indexOf(currentPath)>-1}">首页</a>
          </li> -->

          <li class="ui-menu-firstli current" v-show="isShowPlanManagement">
            <a
              class="ui-menu-firsta"
              :class="{
                iscur:
                  [
                    '/index',
                    '/populationTrends',
                    '/populationPortrait',
                    '/populationFlow'
                  ].indexOf(currentPath) > -1
              }"
              >产品模型</a
            >
            <ul class="ui-menu-second">
              <li
                class="ui-menu-secondli"
                v-show="isShowPopulationDistribution"
              >
                <a class="ui-menu-seconda" @click="pushPage('文庙单体化')"
                  >文庙单体化</a
                >
              </li>
            </ul>
          </li>
          <li class="ui-menu-firstli" v-show="isShowPlanManagement">
            <a
              class="ui-menu-firsta"
              :class="{
                iscur:
                  [
                    '/index',
                    '/populationTrends',
                    '/populationPortrait',
                    '/populationFlow'
                  ].indexOf(currentPath) > -1
              }"
              >323</a
            >
            <ul class="ui-menu-second">
              <li
                class="ui-menu-secondli"
              >
                <a class="ui-menu-seconda" @click="pushPage()"
                  >123</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="ui-nav-right clearfix">
        <div class="ui-nav-user">
          <div class="ui-user-System clearfix">
            <span class="ui-nav-userimg"></span>
            <span class="ui-system" v-show="!logined" @click="tologin"
              >请登录</span
            >
            <span class="ui-system" v-show="logined">{{ userName }}</span>
          </div>
          <div class="header_icon_logout fn-ml20" @click="logoutComFirm"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listSearchMixin } from "../mixin"; //混淆请求
import { api } from "../api/api"; //api配置请求的路径
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入

export default {
  name: "indexNav",
  mixins: [listSearchMixin],
  data() {
    return {
      logined: false,
      userName: "",
      isShowPlanManagement: true, //是否展示规划使用管理
      isShowPopulationDistribution: true,
      isShowApplicationList: true, //是否展示申请单
      isShowpreemptMessageList: true, //是否展示预占设备
      isShowMaintainList: true, // false,//是否展示资源列表
      isShowResourcePlanList: true // false,//是否显示资源规划
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
    })
  },
  mounted() {
    let isLogin = sessionStorage.getItem("logined");
    var headers = JSON.parse(sessionStorage.getItem("headers"));
    if (
      isLogin &&
      headers != null &&
      headers.userId != null &&
      headers.userName != null
    ) {
      this.logined = true;
      this.userName = headers.userName;
    }
    if (!headers) {
      return;
    }
    let menuList = JSON.parse(headers.menuList);
    let buttonList = JSON.parse(headers.buttonList);
    // this.menuList = menuList;
    // console.log(menuList);
    // console.log(buttonList);
    for (var i = 0; i < menuList.length; i++) {
      if (menuList[i] == null || menuList[i].menuUrl == null) {
        continue;
      }
      // console.log(menuList[i]);
      let flag = 0; //无查看权限
      if (menuList[i].parenId != 0) {
        //二级目录
        for (var j = 0; j < buttonList.length; j++) {
          if (
            menuList[i].menuId == buttonList[j].parenMenuId &&
            buttonList[j].buttonName == "查看"
          ) {
            flag = 1;
          }
        }
      } else {
        flag = 1;
      }
      //规划使用管理-二级
      if (menuList[i].menuUrl.indexOf("/populationDistribution") >= 0) {
        //这个无须查看
        this.isShowPopulationDistribution = true;
      }
    }
    if (this.isShowPopulationDistribution) {
      this.isShowPlanManagement = true;
    }
    if (menuList[i].menuUrl.indexOf("/application") >= 0) {
      this.isShowApplicationList = true;
    }
    if (menuList[i].menuUrl.indexOf("/preemptMessage") >= 0) {
      this.isShowpreemptMessageList = true;
    }
  },
  methods: {
    ...mapActions("collection", [
      //collection是指modules文件夹下的collection.js
      "ORDERSDATA" //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
    ]),
    pushPage(name) {
      // this.$router.push({ path: url, query: param });
      // this.$store.dispatch("collection/ORDERS_DATA", ); //重新给store中的scorketId赋值（数据格式问题先转了json）
      this.$store.dispatch("collection/ORDERSDATA", {
        name: name,
        id: 23
      });
      console.log(this.$store.state);
    },
    tologin() {
      this.$router.push("/login");
    },
    logoutComFirm() {
      this.$confirm("是否确定退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let self = this;
          let param = {
            url: api.logout,
            method: "get"
          };
          // self.sendReq(param, res => {
          //   this.$router.push("/login");
          //   console.log(res);
          // });
          // window.sessionStorage.removeItem("headers"); //清除session
          // window.sessionStorage.removeItem("logined");
        })
        .catch(() => {});
    }
  },
  computed: {
    currentPath() {
      return this.$route.path;
    }
  }
};
</script>
<style>
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
</style>
<style scoped>
.header_icon_logout.fn-ml20 {
  display: inline-block;
  float: left;
  margin-top: 24px;
}
</style>
