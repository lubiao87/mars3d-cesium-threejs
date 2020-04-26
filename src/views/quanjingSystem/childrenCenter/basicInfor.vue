<template>
  <div class="EditBasic_container_ceGEWA">
    <div class="EditBasic_panel_EEsReb">
      <div class="EditBasic_group_3RiBpQ">
        <div class="EditBasic_header_wTsDFd">
          <div class="EditBasic_title_9aQeoj">基础设置</div>
          <a
            class="EditBasic_imgTip_QQfRj0"
            href="https://bbs2.720yun.com/article?id=212"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(1 1)" fill="none" fill-rule="evenodd">
                <circle stroke="#AAA" stroke-width="1.4" fill="#2C2C2C" cx="8" cy="8" r="8" />
                <g fill="#AAA">
                  <path
                    d="M8 13c-.547 0-1-.453-1-1 0-.547.453-1 1-1 .566 0 1 .453 1 1 0 .528-.453 1-1 1zM8.251 8.417c-.024.014-.123.068-.135.11a.876.876 0 0 0-.062.286c-.012.082 0 .396 0 .464 0 .41-.295.723-.653.723-.32 0-.59-.26-.652-.614 0-.041-.013-.177-.013-.273 0-.246 0-.723.013-.955 0-.068.024-.218.037-.26.123-.477.43-.709.69-.804.086-.041.32-.11.406-.137.43-.177.739-.628.739-1.173 0-.683-.505-1.242-1.121-1.242-.579 0-1.047.477-1.12 1.092 0 .054-.062.45-.075.518-.073.287-.32.505-.603.505a.594.594 0 0 1-.517-.314A1.443 1.443 0 0 1 5 5.702c0-.15.037-.382.037-.423C5.247 3.982 6.268 3 7.5 3 8.88 3 10 4.242 10 5.77c-.025 1.242-.751 2.279-1.749 2.647z"
                  />
                </g>
              </g>
            </svg>
          </a>
        </div>
        <div class="EditBasic_basic_8PY8_A">
          <div class="EditBasic_thumb_1m04VK">
            <img src="http://m3d2.okaygis.com:8000/static/reparo/web/images/logo.png" style="width: 100%; height: 100%;" />
            <div class="EditBasic_thumbBtn_1v7tq-">
              <div>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  style="position: absolute; z-index: -1; width: 0.1px; height: 0.1px; opacity: 0; overflow: hidden;"
                />
                <!-- <a
                  class="StyledButton_button_3hxqk3 StyledButton_default_25Ch8E"
                  href="javascript: void 0;"
                  style="width: 85px; height: 30px; padding-left: 0px; padding-right: 0px;"
                >修改封面</a> -->
              </div>
              <!-- <div class="EditBasic_thumbTip_1gyY0X">
                <p>建议尺寸</p>
                <p>512 X 512</p>
              </div> -->
            </div>
          </div>
          <!-- 输入框 -->
          <div class="EditBasic_detail_1f1dZn">
            <div class="EditBasic_row_15Q7LM EditBasic_channel_2Qpsfk">
              <div class="DictSearch_container_L6Hx5J">
                <input
                  type="text"
                  class="pano-input pano-input-md pano-input-dark EditBasic_subTitle_2vGxsD"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded="false"
                  autocomplete="off"
                  id="downshift-9-input"
                  name="subChannel"
                  placeholder="请输入模型名称"
                  :value="modelName"
                />
              </div>

              <!-- <div class="EditBasic_count_31c106">2/50</div> -->
            </div>
            <div class="EditBasic_row_15Q7LM DropdownSelect_container_Rwamey">
              <el-select
                v-model="classifyValue"
                placeholder="选择分类"
                style="width: 240px;"
              >
                <el-option
                  v-for="item in classifyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="EditBasic_row_15Q7LM">
              <!-- <div class="EditBasic_count_31c106">2/50</div> -->
              <el-col :span="4" style="line-height: 1;">模型公开：</el-col>
              <el-col :span="20">
                <el-radio v-model="radio" label="公开">公开</el-radio>
                <el-radio v-model="radio" label="仅自己可见">仅自己可见</el-radio>
              </el-col>
            </div>
            <div class="EditBasic_row_15Q7LM">
              <textarea
                class="pano-textarea pano-textarea-dark EditBasic_textarea_1q0Kwq"
                name="remark"
                placeholder="作品简介"
              ></textarea>
            </div>

            <!-- <div class="EditBasic_tag_AHm2km EditBasic_row_15Q7LM">
              <a
                class="StyledButton_button_3hxqk3 StyledButton_default_25Ch8E"
                href="javascript: void 0;"
                style="width: 85px; height: 30px; padding-left: 0px; padding-right: 0px;"
              >添加标签</a>
              <div class="EditBasic_tagList_jAI1mS">
                <div class="BasicTag_item_1Fm1tw" title="地面">
                  <span class="BasicTag_text_3eW56_ ellipsis">地面</span>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="EditBasic_group_3RiBpQ">
        <div class="EditBasic_header_wTsDFd">
          <div class="EditBasic_title_9aQeoj">全局设置</div>
        </div>
        <div class="EditBasic_btnList_3sRr64">
          <a
            class="StyledButton_button_3hxqk3 StyledButton_default_25Ch8E EditBasic_advBtn_3KOaXM"
            href="javascript: void 0;"
            style="width: auto; height: 30px; padding-left: 15px; padding-right: 15px;"
          >开场提示</a>
        </div>
      </div>
      <div>
        <div class="GlobalToggles_title_37rLpE">全局开关</div>
        <div
          class="GlobalToggles_toggles_fxGXfs"
          v-for="(item, index) in btnList"
          :key="index + 'a'"
        >
          <div
            class="Item_item_wUwqyA tether-target tether-element-attached-bottom tether-element-attached-center tether-target-attached-top tether-target-attached-center"
          >
            <div class="Item_title_1AQDG3">{{item.text}}</div>
            <el-switch
              v-model="item.show"
              active-color="#286efa"
              @change="switchBtn(item)"
              inactive-color="#2c2c2c"
            ></el-switch>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import { listSearchMixin } from "@/mixin"; //混淆请求
import { getMapConfig } from "@/map/api";
import { putUserdata } from "@/api/api"; //api配置请求的路径
import { Message } from "element-ui";

export default {
  name: "jiChuCenter",
  mixins: [listSearchMixin],
  data: function(params) {
    return {
      radio: "公开",
      modelName: "",
      classifyList: [
        {
          value: "1",
          label: "古遗迹"
        },
        {
          value: "2",
          label: "古墓葬"
        },
        {
          value: "3",
          label: "古建筑"
        },
        {
          value: "4",
          label: "石窟寺\\时刻"
        },
        {
          value: "5",
          label: "近现在史迹\\建筑"
        },
        {
          value: "6",
          label: "可移动文物"
        },
        {
          value: "7",
          label: "其它"
        }
      ],
      classifyValue: "",
      btnList: [
        {
          value: "geocoder",
          text: "搜索工具",
          show: true
        },
        {
          value: "homeButton",
          text: "默认窗口",
          show: true
        },
        {
          value: "sceneModePicker",
          text: "23D切换",
          show: true
        },
        {
          value: "navigationHelpButton",
          text: "控件帮助",
          show: true
        },
        {
          value: "animation",
          text: "播放控制器",
          show: true
        },
        {
          value: "fullscreenButton",
          text: "全屏切换",
          show: true
        },
        {
          value: "vrButton",
          text: "vr模式",
          show: true
        }
      ]
    };
  },
  created() {
    const that = this;
    getMapConfig(3).then(data => {
      that.Userdata = data.data;
      that.btnList.forEach((item, i) => {
        that.btnList[i].show = that.Userdata.map3d[item.value];
      });
    });
  },
  methods: {
    ...mapActions("collection", [
      //collection是指modules文件夹下的collection.js
      "ORDERSDATA", //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
      "setViewer"
    ]),
    switchBtn(value) {
      console.log(value);
      const that = this;
      that.Userdata.map3d[value.value] = value.show;
      that.$store.dispatch("collection/ORDERS_DATA", that.Userdata);
      let formData = new FormData();
      formData.append("data", JSON.stringify(this.Userdata));
      console.log("this.Userdata提交", this.Userdata);
      if (this.Userdata) {
        putUserdata(formData, 3);
      } else {
        Message({
          showClose: true,
          message: "系统错误",
          type: "error",
          duration: 1000
        });
      }
    }
  }
};
</script>

<style  lang="scss" scoped>
@import "./app.scss";
@import "@/assets/theme/common.scss";
.StyledButton_default_25Ch8E {
  background-color: $mainColor;
  color: #fff;
}
.EditBasic_row_15Q7LM {
  margin-bottom: 15px;
  width: 500px;
}
.StyledButton_button_3hxqk3 {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 30px;
  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.pano-input-dark {
  background-color: #2c2c2c;
  border-color: #525252 !important;
  color: #fff !important;
}
.pano-input-md {
  height: 34px;
}
.pano-input {
  width: 100%;
  border-radius: 2px;
  padding-left: 10px;
  padding-right: 10px;
  border-style: solid;
  border-width: 1px;
  -webkit-transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  font-size: 14px;
}
.DictSearch_container_L6Hx5J {
  position: relative;
}
.EditBasic_subTitle_2vGxsD {
  width: 240px;
}
.DropdownSelect_trigger_dqkT0F {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-right: 10px;
  padding-left: 15px;
  height: 34px;

  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  fill: #5f5f5f;
  color: #333;
}
.Item_item_wUwqyA {
  align-items: center;
}
.GlobalToggles_toggles_fxGXfs {
  display: inline-block;
  margin-right: 30px;
  margin-bottom: 10px;
  cursor: pointer;
}
.EditBasic_thumbTip_1gyY0X {
  font-size: 12px;
  // line-height: 15px;
  margin-left: 10px;
  p {
    font-size: 12px;
  }
}
</style>
<style lang="scss">
.el-input--suffix .el-input__inner {
  height: 34px;
}
.DropdownSelect_container_Rwamey > div {
  margin-top: 0;
}
.el-input__icon {
  line-height: 34px;
}
</style>