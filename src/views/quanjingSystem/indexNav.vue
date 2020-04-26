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
import { getMenus, settingapi} from "@/api/api"; //api配置请求的路径
import { listSearchMixin } from "@/mixin"; //混淆请求

export default {
  name: "indexNav",
  mixins: [listSearchMixin],
  data() {
    return {
      logined: false,
      navList:[
        {
          name: "基础",
          icon: "el-icon-menu",
          component_right: "basicInfor",
          component: "childrenCenter"
        },
        {
          name: "视角",
          icon: "el-icon-document",
          component_right: "visualAngle",
          component: "createLayer"
        },
        {
          name: "热点",
          icon: "el-icon-setting",
          component_right: "hotspot",
          component: "createLayer"
        }
      ]
    };
  },
  computed: {
    currentPath() {
      return this.$route.path;
    }
  },
  mounted() {
    settingapi('916bf9fc-34be-4979-af4c-0f08f328448c').then(data => {
        console.log("916bf9fc-34be-4979-af4c-0f08f328448c", data)
      });
  },
  methods: {
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
