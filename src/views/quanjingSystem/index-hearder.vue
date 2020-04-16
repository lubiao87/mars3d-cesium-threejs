<template>
  <div class="index-hearder border-style1">
    项目001
    <div class="fanhui">
      <span class="iconfont icon-undo-outline"></span>
       <span class="fh">返回</span>
    </div>
    <div class="baocun" @click="baocunPut">
      <span class="iconfont icon-checkmark-square-outline"></span>
       <span class="fh">保存</span>
    </div>
    <div class="baocun">
      <span class="iconfont icon-yulan"></span>
       <span class="fh">预览</span>
    </div>
  </div>
</template>

<script>
import { putUserdata } from "@/api/api"; //api配置请求的路径
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import { listSearchMixin } from "@/mixin"; //混淆请求
import { Message } from "element-ui";


export default {
  mixins: [listSearchMixin],
  name: "indexHearder",
  data() {
    return {
      logined: false,
      navList:[
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
    baocunPut() {
      const that = this;
      this.getUserdata();
      let formData = new FormData();
      formData.append("data", JSON.stringify(this.Userdata));
      putUserdata(formData).then(data => {
        Message({
          showClose: true,
          message: "保存成功",
          type: 'success',
          duration: 1000
        });

      })
    }
  }
};
</script>
<style  scoped lang="scss">
@import "../../assets/theme/common.scss";
 .index-hearder {
   -webkit-box-flex: 0;
    -ms-flex: 0 0 40px;
    flex: 0 0 40px;
    -webkit-box-ordinal-group: 2;
    -ms-flex-order: 1;
    order: 1;
    text-align: center;
    line-height: 40px;
    color: $writeColor;
    .fanhui, .baocun {
      padding-left: 15px;
      padding-right: 15px;
      float: left;
      cursor: pointer;
      vertical-align:middle;
      .iconfont {
        font-size: 16px;
      }
      .fh {
        color: $mainTextColor;
        margin-left: 5px;
      }
    }
    .fanhui:hover .fh, .baocun:hover .fh {
      color: $writeColor;
    }
    .baocun {
      float: right;
    }
 }
</style>
