<template>
  <div class="SidebarBasic_container_1H0kS_">
    <p>作品二维码</p>
    <img
      src="https://apiv4.720yun.com/qr/out/aHR0cHM6Ly83MjB5dW4uY29tL3QvMjN2a3NscHdnMm0=/aHR0cHM6Ly9zc2wtYXZhdGFyLjcyMHN0YXRpYy5jb20vQC9hdmF0YXIvc3lzdGVtLzI0LmpwZw=="
      class="SidebarBasic_qr_1IBDjS"
    />
    <div class="SidebarBasic_footer_YjRste">
      <div class="SidebarBasic_tip_RJ09Ow">
        <p>自定义LOGO</p>
        <p>120 X 120</p>
      </div>
      <a class="pano-button pano-button-sm pano-button-primary SidebarBasic_btn_3Cdj2K">选择图片</a>
    </div>
    <div
      class="SidebarBasic_divide_93Hp0i"
      style="width: 100%; height: 2px; border-top: 1px solid rgb(0, 0, 0); border-bottom: 1px solid rgb(75, 75, 75);"
    ></div>
    <div class="SidebarBasic_row_2BO0Fz">
      作品地址
      <span class="link">查看</span>
    </div>
    <input
      type="text"
      class="pano-input pano-input-lg pano-input-dark"
      disabled
      value="https://720yun.com/t/23vkslpwg2m"
    />

    <el-table :data="tableData" border style="width: 100%;margin-top: 30px;">
      <el-table-column prop="name" label="类别"></el-table-column>
      <el-table-column prop="value" label="内容"></el-table-column>
    </el-table>
  </div>
</template>


<script>
import { getWindowObj } from "@/map/app.js";

import { listSearchMixin } from "@/mixin"; //混淆请求
import { getMapConfig } from "@/map/api";
export default {
  mixins: [listSearchMixin],
  data() {
    return {
      tableData: [
        {
          value: "",
          name: "拍摄设备"
        },
        {
          value: "",
          name: "照片尺寸"
        },
        {
          value: "",
          name: "照片数量"
        },
        {
          value: "",
          name: "数据量"
        }
      ]
    };
  },
  created() {
    const that = this;
    this.tableData[0].value = this.MyprojectData.device.name;
    this.tableData[1].value = '4000x3000(单位像素)';
    this.tableData[2].value = this.MyprojectData.img_num;
    this.tableData[3].value = this.MyprojectData.mana_use;
  },
  mounted() {},
  methods: {
  },
  activated() {
    // console.log("组件被激活了");
    if (this.creadflag) {
      this.view_frameHtml();
    }
  },
  deactivated() {
    if (this.frameHtml) this.frameHtml.parentNode.removeChild(this.frameHtml);
    // console.log("组件被停用了");
  }
};
</script>


<style lang="scss" scoped>
@import "@/assets/theme/common.scss";
.SidebarBasic_container_1H0kS_ {
  padding: 25px 24px;
  .SidebarBasic_qr_1IBDjS {
    width: 180px;
    height: 180px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #4b4b4b;
  }
  .SidebarBasic_footer_YjRste {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
  }
  .SidebarBasic_divide_93Hp0i {
    margin: 30px 0;
    width: 100%;
    height: 2px;
    border-top: 1px solid rgb(0, 0, 0);
    border-bottom: 1px solid rgb(75, 75, 75);
  }
  .SidebarBasic_row_2BO0Fz {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 10px;
    .link {
      color: #427afb;
      cursor: pointer;
    }
  }
  .pano-input-dark:disabled {
    background-color: #333;
    color: #777;
    height: 40px;
    border-color: #525252;
  }
  .SidebarBasic_tip_RJ09Ow {
    -webkit-box-flex: 1;
    -ms-flex: 1 auto;
    flex: 1 auto;
    color: #aaa;
    line-height: 15px;
    font-size: 12px;
  }
  .pano-button-primary {
    background-color: $mainColor;
    color: #fff;
  }
}
</style>
<style lang="scss">
.SidebarBasic_container_1H0kS_ .el-table--border::after, .el-table--group::after, .el-table::before {
  background-color: transparent;
  display: none;
}
.SidebarBasic_container_1H0kS_ .el-table--border, .SidebarBasic_container_1H0kS_ .el-table--group {
    border: 0 solid transparent;
}
.SidebarBasic_container_1H0kS_ .el-table td, .SidebarBasic_container_1H0kS_ .el-table th.is-leaf {
    border-bottom: 1px solid #525252;
}
.SidebarBasic_container_1H0kS_ .el-table--border td, .SidebarBasic_container_1H0kS_  .el-table--border th{
    border-right: 1px solid #525252;
}
.SidebarBasic_container_1H0kS_ .el-table--border td:nth-child(2) {
  border-right: none;
}
.SidebarBasic_container_1H0kS_ .el-table th.is-leaf:nth-child(2) {
  border-right: none;
}
.SidebarBasic_container_1H0kS_ .el-table td, .SidebarBasic_container_1H0kS_  .el-table th {
      padding: 6px 0;
}
.SidebarBasic_container_1H0kS_  .el-table .cell {
  line-height: 16px;
}
.SidebarBasic_container_1H0kS_  .el-table__row:hover {
  background-color: transparent;
  cursor: initial;
}
.SidebarBasic_container_1H0kS_  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: transparent;
}
</style>