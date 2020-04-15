<template>
  <div id="footer">
    <ul>
      <li @click="handleClick(1)">首页</li>
      <li @click="handleClick(2)">列表页</li>
      <li @click="handleClick(3)">详情页</li>
    </ul>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleClick(n) {
      this.$emit("handleToggle", n);
    }
  }
};
</script>


<style lang="scss">
#footer {
  width: 100%;
  height: 3.75rem;
  background: grey;
  position: fixed;
  top: 0;
  left: 0;
}
ul {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  list-style: none;
}
</style>