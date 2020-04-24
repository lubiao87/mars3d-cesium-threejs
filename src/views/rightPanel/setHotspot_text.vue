<template>
  <right-panel>
    <el-form ref="form" :model="formData">
      <el-form-item label="名称">
        <el-input v-model="formData.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="标签描述">
        <el-input type="textarea" row="2" v-model="formData.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="setTextspot">确定</el-button>
        <el-button @click="deletTextspot">删除</el-button>
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
  name: "setTextspot1",
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
    setTextspot() {
      this.$emit("setTextData", this.formData);
      this.$store.dispatch("collection/set_ComponentName", "");
    },
    deletTextspot() {
      this.$emit("deletTextData", this.formData);
      this.$store.dispatch("collection/set_ComponentName", "");
    }
  },
  activated() {
    this.formData = this.data;
  }
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



</style>
