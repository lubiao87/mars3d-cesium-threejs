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
            <a
              class="ui-menu-firsta"
              @click="pushPage('首页')"
              :class="{
                iscur:
                  [
                    '/index',
                    '/populationTrends',
                    '/populationPortrait',
                    '/populationFlow'
                  ].indexOf(currentPath) > -1
              }"
              >首页</a>
          </li> -->

          <li class="ui-menu-firstli" v-for="(item, index) in navList.menu" :key="index">
            <a
              class="ui-menu-firsta"
              >
              <span class="iconfont icon-archive-outline" v-if="item.icon"></span>
              {{item.name}}
              </a
            >
            <ul class="ui-menu-second">
              <li
                class=""
                 v-for="(children, index) in item.children" :key="children.name"
              >
                <a class="" >
                  <div  class="nohover"> <span class="iconfont icon-activity-outline" v-if="children.icon"></span> {{children.name}}</div>
                  <ul class="">
                    <li
                      class=""
                      v-for="(grandson, index) in children.children" :key="grandson.name"
                    >
                      <a class="ui-menu-seconda" @click="pushPage(children.name)"
                        >
                        {{grandson.name}}

                        </a
                      >
                    </li>
                  </ul>
                  </a
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
// import { listSearchMixin } from "../mixin"; //混淆请求
import { getMenus } from "../api/api"; //api配置请求的路径
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入

export default {
  name: "indexNav",
  // mixins: [listSearchMixin],
  data() {
    return {
      logined: false,
      userName: "",
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
    this.getMenu();
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
    pushPage(name) {
      let obj = {
        name: name,
        id: Math.random()
      };
      this.$store.dispatch("collection/ORDERS_DATA", obj);
      console.log(this.$store.getters["collection/renderOrdersData"]);
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
