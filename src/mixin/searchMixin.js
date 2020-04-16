
/* eslint-disable */
export const listSearch = {
  data: function (params) {
    return {
      Userdata: null
    }
  },
  methods: {
    getUserdata() {
      this.Userdata = this.$store.getters["collection/renderOrdersData"];
    }
  }
}
