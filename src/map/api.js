// 图层
import axios from 'axios';


export function getMapConfig(){
	// const url = 'config/config.json';
	const url = '/cesium/manager/api/configs/';
	const data = '';
	return axios.get(url, {
    params: data,
    dataType: "json",
	}).then(res => {
    console.log("data--", res.data[0])
		return Promise.resolve(res.data[1].data);
	});
}


export function getPoint(){
	const url = 'http://data.marsgis.cn/file/apidemo/qiye/point.json';
	const data = '';
	return axios.get(url, {
		params: data
	}).then(res => {
		return Promise.resolve(res.data);
	});
}
