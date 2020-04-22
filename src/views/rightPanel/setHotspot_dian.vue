<template>
    <right-panel>
      <el-form ref="form" :model="formData">
        <el-form-item label="名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="住用单位">
          <el-input v-model="formData.zydw"></el-input>
        </el-form-item>
        <el-form-item label="建筑面积">
          <el-input v-model="formData.jzmj"></el-input>
        </el-form-item>
        <el-form-item label="建筑层次">
          <el-input v-model="formData.jzcs"></el-input>
        </el-form-item>
        <el-form-item label="建筑结构">
          <el-input v-model="formData.jzjg"></el-input>
        </el-form-item>
        <el-form-item label="建筑年份">
          <el-input v-model="formData.jzlf"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="setHotspot">完成</el-button>
          <el-button @click="deletHotspot">删除</el-button>
        </el-form-item>
      </el-form>
    </right-panel>
</template>

<script>
import rightPanel from "@/components/rightPanel/rightPanel";

export default {
  name: "setHotspot",
  components: {rightPanel},
  props:['data'],
  data: function() {
    return {
      formData: {
      }
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
      this.$emit("deletChildrenData", this.formData);
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
  }
}


</style>
