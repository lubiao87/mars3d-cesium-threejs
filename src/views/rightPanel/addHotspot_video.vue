<template>
  <!-- <right-panel> -->
    <div>
      <el-form ref="form" :model="formData">
        <el-form-item label="名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="标签描述">
          <el-input type="textarea" row="2" v-model="formData.url"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="addVideospot">增加</el-button>
          <el-button @click="canselVideospot">取消</el-button>
        </el-form-item>
      </el-form>
      <div class="divpoint2">
        <div class="title">测试DIV点2</div>
        <div class="content">此处可以绑定任意Html代码和css效果</div>
      </div>

    </div>

  <!-- </right-panel> -->
</template>

<script>
// import rightPanel from "@/components/rightPanel/rightPanel";

export default {
  name: "addVideospot",
  // components: { rightPanel },
  data: function() {
    return {
      formData: {}
    };
  },
  methods: {
    addVideospot() {
      console.log(this.formData)
       this.formData.id = Date.now().toString(36);
      this.$emit("addVideoData", this.formData);
    },
    canselVideospot() {
      this.$emit("canselVideoData", null);
    }
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
     padding: 0;
      flex: 0 0 60px;
    }
    .el-form-item__content {
      margin-left: 10px !important;
    }
  }
}



</style>
