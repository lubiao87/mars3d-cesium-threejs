/*
 * 列表搜索的 mixin
 */
import Vue from "vue";
import request from "./server";
import axios from "axios";
import { Message } from "element-ui";
Vue.component(Message);
/* eslint-disable */
export const listSearch = {
  methods: {
    /*
     * 发送请求
     */
    sendReq (params, callback) {
      let self = this
      request({
        method: params.method || 'POST',
        url: params.url,
        data: params.data || {},
        headers: {
          'Content-type': params.contentType || 'application/json'
        }
      }).then((res) => {
        // 如果该请求不需要干扰到loading，那么需要设置 doNotDisturbLoading 为 true
        if (res && res.data) {
          // callback && callback(res.data)
          return Promise.resolve(res.data)
        }
      }, (error) => {
        let res = error.data
        Message({
          showClose: true,
          message: res.error,
          type: 'error',
          duration: 1000
        })
      })
    }
  }
}
