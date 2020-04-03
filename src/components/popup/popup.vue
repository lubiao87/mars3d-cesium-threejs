<template>
  <div style="width: 100%;height:100%;" class="lb-mochine" v-show="showMachine">
    <div class="lb-iframe">
      <div class="lb-top clearfix">
        <div class="lb-title">机柜详情</div>
        <i
          class="el-icon-close"
          @click="setShowPane"
          style="cursor: pointer;"
        ></i>
      </div>
      <el-row>
        <!-- 左 -->
        <el-col :span="9">
          <div class="grid-content" style="width: 100%;">
            <div class="lb-bread">
              <div class="cabinet_ico"></div>
              直流功率信息
            </div>
            <div class="lb-table">
              <h5 class="ui-city-title ui-height48">
                <span class="ui-linebg"></span>{{ currentType }}
              </h5>
              <el-table
                :data="cunrrentData"
                border
                style="width: 100%; color: #BACDE6;font-size: 14px;"
              >
                <el-table-column prop="type" label="类别" width="80">
                </el-table-column>
                <el-table-column prop="currentOne" label="直流1" width="120">
                </el-table-column>
                <el-table-column prop="cunrrentTwo" label="直流2">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <!-- 中 -->
        <el-col :span="7" style="height: 500px;">
          <div class="grid-content" style="position: relative;height: 100%;">
            <div class="cabinet_empty"></div>
            <div class="cabinet-list">
              <div
                class="server_ico"
                v-for="index in cabinetLength"
                :key="index"
              ></div>
            </div>
            <!-- <div class="lb-top-server lb-loggo">
              <div class="lb-font">上</div>
              <div class="lb-line"></div>
              <div class="lb-radiu"></div>
              <div class="lb-contenter">
                <div class="lb-name">温度：32.8</div>
                <div class="lb-value">湿度：25.9</div>
              </div>
            </div>
            <div class="lb-center-server lb-loggo">
              <div class="lb-font">中</div>
              <div class="lb-line"></div>
              <div class="lb-radiu"></div>
              <div class="lb-contenter">
                <div class="lb-name">温度：32.8</div>
                <div class="lb-value">湿度：25.9</div>
              </div>
            </div>
            <div class="lb-bottom-server lb-loggo">
              <div class="lb-font">下</div>
              <div class="lb-line"></div>
              <div class="lb-radiu"></div>
              <div class="lb-contenter">
                <div class="lb-name">温度：32.8</div>
                <div class="lb-value">湿度：25.9</div>
              </div>
            </div> -->
          </div>
        </el-col>
        <!-- 右 -->
        <el-col :span="8">
          <div class="grid-content">
            <div style="width: 100%;">
              <h5 class="ui-city-title ui-height48">
                <span class="ui-linebg"></span>{{ currentType }}
              </h5>
              <div id="rateChart" style="width: 380px; height: 150px;"></div>
            </div>
            <div style="width: 100%; margin-top: 15px;">
              <h5 class="ui-city-title ui-height48">
                <span class="ui-linebg"></span>设备统计
              </h5>
              <el-row :gutter="24" class="lb-Uwei">
                <el-col
                  :span="12"
                  v-for="(item, index) in UweiData"
                  :key="index"
                >
                  <div
                    class="grid-content"
                    :class="item.class"
                    @click="getUnitData(item)"
                    style="cursor: pointer;"
                  >
                    <p>{{ item.name }}</p>
                    <h5>{{ item.value }}</h5>
                    <img :src="item.img" alt="" :class="item.imgClass" />
                  </div>
                </el-col>
                <!-- <el-col :span="8"><div class="grid-content lb-c3AB1C7">2</div></el-col>
                    <el-col :span="8"><div class="grid-content lb-c54B4E0">3</div></el-col> -->
              </el-row>
            </div>

            <!--<div style="width: 100%;" class="lb-alarm">-->
            <!--<h5 class="ui-city-title ui-height48"><span class="ui-linebg"></span>告警统计</h5>-->
            <!--<el-row>-->
            <!--<el-col :span="8" v-for="(item, index) in alarmData" :key="index">-->
            <!--<div class="grid-content">-->
            <!--<div>{{item.value}}</div>-->
            <!--<div>{{item.name}}</div>-->
            <!--</div>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--<div class="lb-bamboo clearfix">-->
            <!--<div :style="{'width': alarm1}"></div>-->
            <!--<div :style="{'width': alarm2}"></div>-->
            <!--<div :style="{'width': alarm3}"></div>-->
            <!--</div>-->
            <!--</div>-->
          </div>
        </el-col>
      </el-row>
      <div class="lb-table readyStatusTab" v-show="showUnitData">
        <div class="lb-top clearfix">
          <div class="lb-title">设备详情</div>
          <i
            class="el-icon-close"
            @click="showUnitData = false"
            style="cursor: pointer;"
          ></i>
        </div>
        <el-table
          class="ui-busin-ul"
          :data="UnitData"
          border
          style="width: 100%; color: #BACDE6;font-size: 14px;"
        >
          <el-table-column prop="type" label="设备名称"> </el-table-column>
          <el-table-column prop="major" label="设备专业"> </el-table-column>
          <el-table-column prop="currentOne" label="设备额定功率">
            <template slot-scope="scope">
              <div>{{ scope.row.currentOne }} kw</div>
            </template>
          </el-table-column>
          <el-table-column prop="cunrrentTwo" label="设备实时功率">
            <template slot-scope="scope">
              <div>{{ scope.row.cunrrentTwo }} kw</div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="设备状态">
            <template slot-scope="scope">
              <div v-if="scope.row.status == 1">未交付/预占</div>
              <div v-if="scope.row.status == 2">已交付</div>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="用户名称">
            <template slot-scope="scope">
              <div>
                {{ scope.row.userName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="applyDate" label="申请时间">
            <template slot-scope="scope">
              <div>2018-03-23</div>
              <div>14:21:44</div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="上架时间">
            <template slot-scope="scope">
              <div>2018-04-23</div>
              <div>14:21:44</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts"; // 引入echarts
export default {
  name: "machineCabinet",
  data() {
    return {
      UweiData: [
        {
          name: "总U位",
          value: 46,
          class: "lb-c7589F0",
          img: "./Assets/img/right_module_ico@2x.png",
          imgClass: "lb-52"
        },
        {
          name: "已使用U位",
          value: 25,
          class: "lb-c3AB1C7",
          img: "./Assets/img/right_planning_ico@2x.png",
          imgClass: "lb-49"
        },
        {
          name: "空闲U位",
          value: 21,
          class: "lb-c54B4E0",
          img: "./Assets/img/right_cabinet_ico@2x.png",
          imgClass: "lb-52"
        }
      ],
      cabinetLength: 12,
      // 直流电
      currentType: "直流情况",
      cunrrentData: [
        {
          type: "电流",
          currentOne: "256.52 A",
          cunrrentTwo: "676.21 A"
        }
      ],
      showUnitData: false,
      UnitData: [
        {
          type: "BH棠盛园宾馆2YTU-1(D)",
          major: "ATMDDNFR设备",
          currentOne: "256.52",
          cunrrentTwo: "676.21",
          shishigonglv: "",
          status: 1, // 1 未交付/预占 2 已交付
          userName: "张三"
        },
        {
          type: "BZ华景新城福门阁YTU-1(D)",
          major: "DSLAM设备",
          currentOne: "256.52",
          cunrrentTwo: "676.21",
          status: 2,
          userName: "李四"
        },
        {
          type: "BH卫生防疫大楼U-1(D)",
          major: "光电转换设备",
          currentOne: "256.52",
          cunrrentTwo: "676.21",
          status: 1,
          userName: "王五"
        }
      ],
      myChart: null,
      alarmData: [
        { name: "严重警告", value: 2 },
        { name: "一般警告", value: 1 },
        { name: "正常", value: 20 }
      ],
      chartData: [
        { value: 8, name: "未用" },
        { value: 10, name: "已用" },
        { value: 8, name: "预占" }
      ]
    };
  },
  props: ["propsFlag"],
  computed: {
    alarm1() {
      let n = 0;
      this.alarmData.forEach((element, index) => {
        n += element.value;
      });
      return (this.alarmData[0].value / n) * 100 + "%";
    },
    alarm2() {
      let n = 0;
      this.alarmData.forEach((element, index) => {
        n += element.value;
      });
      return (this.alarmData[1].value / n) * 100 + "%";
    },
    alarm3() {
      let n = 0;
      this.alarmData.forEach((element, index) => {
        n += element.value;
      });
      return (this.alarmData[2].value / n) * 100 + "%";
    },
    showMachine() {
      return this.propsFlag;
    }
  },
  mounted() {
    let $this = this;
    this.$nextTick(() => {
      this.myChart = echarts.init(document.getElementById("rateChart"));
      this.newMap();
    });
  },
  methods: {
    setOption() {
      let $this = this;
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          top: "center",
          right: 50,
          trigger: "item",
          icon: "rect",
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          data: ["未用", "已用", "预占"],
          textStyle: {
            //图例文字的样式
            color: ["#13A86E", "#7B91FF", "#35a0e4"],
            fontSize: 12
          },
          formatter: function(params) {
            for (var i = 0; i < option.series[0].data.length; i++) {
              if (option.series[0].data[i].name == params) {
                return params + " " + option.series[0].data[i].value + "KW";
              }
            }
          }
        },
        color: ["#13A86E", "#6B7FE3", "#35a0e4"],
        series: [
          {
            name: "功率统计",
            type: "pie",
            selectedMode: "single",
            radius: ["60%", "85%"],
            center: ["25%", "50%"],
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              // 此配置
              normal: {
                borderWidth: 3,
                borderColor: "rgb(28, 50, 76)"
              },
              emphasis: {
                borderWidth: 0
              }
            },
            data: $this.chartData
          }
        ]
      };
      return option;
    },
    newMap() {
      this.myChart.clear();
      let option = this.setOption();
      this.myChart.setOption(option);
    },
    getUnitData(item) {
      console.log("item", item);
      this.showUnitData = true;
      // let params = "";
      // if (item.name === "已交付数量") {
      //   params = 2;
      // } else if (item.name === "预占数量") {
      //   params = 1;
      // } else {
      //   params = "";
      // }
      // this.showUnitData = true;
      // let param = {
      //   url: api2.getUnit + this.IDS + "?readyStatus=" + params, //获取request_url.js文件的请求路径
      //   method: "get"
      // };
      // let _this = this;
      // this.sendReq(param, res => {
      //   console.log("getUnit:", res);
      //   this.UnitData = res.respBody.unitList;
      //   // if (res.respBody.unitList.length > 0) {
      //   //   res.respBody.unitList.forEach((item, idnex) => {
      //   //     this.UnitData.push(item);

      //   //   })
      //   // }
      // });
    },
    setShowPane() {
      this.$parent.propsFlag = false;
    }
  }
};
</script>
<style scoped lang="scss">
.lb-mochine {
  .ui-height48:hover {
    background-color: inherit;
    cursor: inherit;
  }
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgb(28, 50, 76);
  z-index: 9999;
  color: #fff;
  .lb-iframe {
    position: absolute;
    width: 1200px;
    height: 614px;
    margin: auto;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgb(22, 40, 74);
    -moz-box-shadow: 0px 0px 10px 10px #1c3561 inset; /* 老的 Firefox */
    box-shadow: 0px 0px 10px 10px #1c3561 inset;
    padding: 20px;
    .cabinet-list {
      height: 372px;
      width: 100px;
      // border: 1px solid red;
      position: absolute;
      top: 92px;
      /*left: 64px;*/
      left: 25%;
      display: flex;
      flex-direction: column-reverse;
      & > div {
        margin-top: -9px;
        width: 100%;
        height: 32px;
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .lb-top-server {
      position: absolute;
      top: 30%;
      left: 20%;
    }
    .lb-center-server {
      position: absolute;
      top: 50%;
      left: 20%;
    }
    .lb-bottom-server {
      position: absolute;
      top: 70%;
      left: 20%;
    }
    .lb-loggo {
      & > div {
        float: left;
      }
      .lb-font {
        margin-top: 15px;
        width: 38px;
        height: 34px;
        background: #7a90ff;
        // opacity:0.6;
        border-radius: 6px;
        text-align: center;
        line-height: 34px;
      }
      .lb-line {
        margin-top: 30px;
        width: 101px;
        height: 2px;
        border: 1px solid rgb(113, 135, 240);
      }
      .lb-radiu {
        margin-top: 25px;
        width: 14px;
        height: 14px;
        background: #7a90ff;
        border: 3px solid #657ada;
        // opacity:0.45;
        border-radius: 50%;
        margin-right: 10px;
      }
      .lb-contenter {
        width: 101px;
        height: 64px;
        background: #2a3d6e;
        border: 1px solid rgba(113, 135, 240, 1);
        text-align: center;
        line-height: 26px;
      }
    }
    .cabinet_empty {
      width: 145px;
      height: 482px;
      background-size: 100%;
      position: absolute;
      /*left: 10%;*/
      left: 20%;
      top: 0;
      background-repeat: no-repeat;
    }
    .lb-Uwei {
      h5 {
        font-size: 30px;
        font-family: "ArialMT";
      }
      padding: 0 15px;
      .grid-content {
        text-align: left;
        /*height: 75px;*/
        border-radius: 5px;
        padding: 10px;
        box-sizing: border-box;
        p {
          font-size: 12px;
          font-weight: 400;
          line-height: inherit;
          color: rgba(255, 255, 255, 1);
          // opacity:0.8;
        }
        h5 {
          font-size: 24px;
          font-weight: 400;
          line-height: 15px;
          margin: 20px 0 4px 0;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
    .lb-alarm {
      margin-top: 15px;
    }
    .grid-content {
      width: 100%;
    }
    .lb-top {
      padding: 10px;
      .lb-title {
        float: left;
        font-size: 16px;
      }
      i {
        float: right;
      }
    }
    .lb-bread {
      font-size: 18px;
      margin-top: 20px;
      margin-left: 15px;
      font-family: "MicrosoftYaHei";
      .cabinet_ico {
        width: 18px;
        height: 18px;
        background-size: 100%;
        display: inline-block;
      }
    }
    .icon-location {
      display: inline-block;
      background-image: url(../../assets/common/image/location@2x.png);
      width: 12px;
      height: 16px;
      background-size: 100%;
      position: absolute;
      left: 0;
      top: 2px;
    }
    .lb-table {
      padding: 0 15px;
    }
  }
  .readyStatusTab.lb-table {
    position: absolute;
    width: 900px;
    height: 400px;
    margin: auto;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #16284a;
    -moz-box-shadow: 0px 0px 10px 10px #1c3561 inset;
    box-shadow: 0px 0px 10px 10px #1c3561 inset;
    padding: 20px;
    overflow: hidden;
  }
}
</style>
<style>
.lb-mochine .el-table::before,
.lb-mochine .el-table::after {
  background-color: #16284a;
}
.lb-table .el-table__header-wrapper thead div {
  background-color: transparent;
  color: #bacde6;
}
.lb-table .el-table th {
  background-color: transparent;
}
/*   chen 2019-2月27  设备统计图标大小 */
.grid-content {
  position: relative;
  min-width: 119px;
  margin-right: 18px;
  margin-bottom: 16px;
}
.lb-52 {
  width: 52px;
  height: 45px;
  position: absolute;
  right: 0;
  bottom: 0;
}
.lb-49 {
  width: 49px;
  height: 52px;
  position: absolute;
  right: 0;
  bottom: 0;
}
.readyStatusTab > div {
  background-color: #16284a;
}
.readyStatusTab .ui-busin-ul {
  overflow: auto;
  height: 320px;
}
.readyStatusTab .el-table tr {
  background-color: #16284a;
}
</style>
