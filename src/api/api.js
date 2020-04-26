// 图层
import axios from 'axios'
axios.defaults.withCredentials = true;

export function getMenus(id) {
  // const url = 'config/config.json';
  const url = '/cesium/manager/api/menus/?project__id=' + id
  return axios
    .get(url, {
      // params: data,
      dataType: 'json',
    })
    .then((res) => {
      console.log('getMenus--', res)
      return Promise.resolve(res.data)
    })
}

export function getTool(id) {
  const url = '/cesium/manager/api/widgets/?project__id=' + id
  return axios.get(url, {}).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function putUserdata(data, id) {
  // const url = 'config/config.json';
  const url = `/cesium/manager/api/menus/${id}/`;
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime(),
    }
  };
  return axios.put(url, data, config).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function settingapi(id) {
  // const url = 'config/config.json';
  const url = `http://172.16.13.102:8000/projects/${id}/settingapi`;
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime(),
      'Cookie': 'sessionid=cikpo4p0t1w4c1qqzofy2i1d07yd54fq; csrftoken=5sMmIqbHSwnycXhbDImeCKkF8VUXy2sOoQ4QzqLiUQJP8P82KTq7BIBLa9CLi7Pe'
    }
  };
  return axios.get(url,{}, config).then((res) => {
    return Promise.resolve(res.data)
  })
}