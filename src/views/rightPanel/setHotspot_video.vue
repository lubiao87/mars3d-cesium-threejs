<template>
  <right-panel>
    <el-form ref="form" :model="formData">
      <el-form-item label="名称">
        <el-input v-model="formData.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="视频地址">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="setVideospot">确定</el-button>
        <el-button @click="deletVideospot">删除</el-button>
      </el-form-item>
    </el-form>
  </right-panel>
</template>

<script>
import rightPanel from "@/components/rightPanel/rightPanel";

export default {
  name: "setVideospot",
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
    setVideospot() {
      this.$emit("setVideoData", this.formData);
      this.$store.dispatch("collection/set_ComponentName", "");
    },
    deletVideospot() {
      this.$emit("deletVideoData", this.formData);
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
