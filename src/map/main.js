// import * as Cesium from "cesium/Cesium";
import * as mars3d from "./mars3d/mars3d";

//汉化原生cesium
import {loadCesiumZH} from "./plugins/class/cesium-zh";

//导航球插件
import "./plugins/navigation/mars3d-navigation.css";

import  "./plugins/navigation/mars3d-navigation";
// import {Haoutils} from "../utils/cesium/haoutil";
//地图创建
export function createMap(id, config) {
  var viewer = mars3d.createMap({
    id: id,
    data: config.map3d,
    serverURL: config.serverURL,
  });

  //汉化
  loadCesiumZH();

  return viewer;
}
//地图创建 2
export function createLayer(id, config) {
  var viewer;
  //url传参，一个系统动态使用不同配置
  // var haoutil =new Haoutils();
  // var configfile = haoutil.system.getRequestByName("config", config);
  // console.log("configfile", configfile)
  mars3d.createMap({
    id: id,
    data: config.map3d,
    "infoBox": false,
    center: { "y": 33.589536, "x": 119.032216, "z": 145.08, "heading": 3.1, "pitch": -22.9, "roll": 0 },
    success: function (_viewer, jsondata) {//地图成功加载完成后执行
        viewer = _viewer;
        console.log("_viewer", _viewer)
        // setTimeout(removeMask, 3000);
        initWork(viewer);
    }
});
  //汉化
  loadCesiumZH();
}
//当前页面业务相关
//当前页面业务相关
function initWork(viewer) {

  //三维模型
  var layerWork = mars3d.layer.createLayer({
      "name": "文庙",
      "type": "3dtiles",
      "url": "http://data.marsgis.cn/3dtiles/qx-simiao/tileset.json",
      // "url": "http://reparo.okaygis.com:10092/result/005a417b-0761-4842-9d43-f2be3da3fd55/Scene/Production_1.json",
      "offset": { "z": 81.5 },
      "visible": true
  }, viewer);


  //单体化图层
  var layerWorkDTH = mars3d.layer.createLayer({
      "type": "geojson",
      "name": "文庙-单体化",
      "url": " http://data.marsgis.cn/file/geojson/draw-dth-wm.json",
      "symbol": {
          "styleOptions": {
              "clampToGround": true
          }
      },
      "dth": {//表示“单体化”专用图层
          "buffer": 3,
          "color": "#ffff00",
          "opacity": 0.5
      },
      "popup": [
          { "field": "name", "name": "房屋名称" },
          { "field": "jznf", "name": "建造年份" },
          { "field": "ssdw", "name": "所属单位" },
          { "field": "remark", "name": "备注信息" }
      ],
      "visible": true
  }, viewer);

}