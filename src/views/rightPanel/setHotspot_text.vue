<template>
  <right-panel>
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="标签描述">
        <el-input v-model="formData.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setHotspot">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <div class="divpoint2">
      <div class="title">测试DIV点2</div>
      <div class="content">此处可以绑定任意Html代码和css效果</div>
    </div>
  </right-panel>
</template>

<script>
import rightPanel from "@/components/rightPanel/rightPanel";

export default {
  name: "setHotspot",
  components: { rightPanel },
  props: ["data"],
  data: function() {
    return {
      formData: {}
    };
  },
  // created() {
  //   this.formData = this.data;
  // },
  methods: {
    setHotspot() {
      this.$emit("setChildrenData", this.formData);
      this.$store.dispatch("collection/set_ComponentName", "");
    },
    deletHotspot() {
      this.$emit("deletHotData", this.formData);
      this.$store.dispatch("collection/set_ComponentName", "");
    },
    addHotspot() {
      this.formData.id = Date.now().toString(36);
      this.$emit("addHotData", this.formData);
    },
    cancelHotspot() {
      this.$emit("cancelHotData", null);
    }
  }
  // activated() {
  //   this.formData = this.data;
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/theme/common.scss";
.el-form {
  padding: 10px;
  .el-form-item {
    display: flex;
    align-items: center;
    justify-content: center;
    .el-form-item__label {
      flex: 0 0 70px;
    }
    .el-form-item__content {
      margin-left: 10px !important;
    }
  }
}
.divpoint2 {
  top: -1000px;
  left: -1000px;
  width: 200px;
  height: 157px;
  background: rgba(42, 42, 42, 0.8);
  border-radius: 4px;
  position: absolute;
  background: url("../../assets/common/image/div2.png");
  background-size: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;

  -webkit-animation: mymove 5s infinite;
  animation: mymove 5s infinite;
  animation-duration: 5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: mymove;

  /*加上这个css后鼠标可以穿透，但是无法触发单击事件*/
  /* pointer-events:none; */
}

.divpoint2 .title {
  position: inherit;
  top: 22px;
  left: 70px;
  font-size: 14px;
  text-align: left;

  color: rgba(255, 255, 255, 1);
  text-shadow: 0px 0px 9px rgba(0, 0, 0, 0.75);
}

.divpoint2 .content {
  position: inherit;
  font-size: 14px;
  top: 50px;
  left: 50px;
  width: 140px;
  height: auto;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
</style>
