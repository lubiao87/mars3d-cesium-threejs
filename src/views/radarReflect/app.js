import * as Cesium from "cesium/Cesium";
import * as mars3d from "@/map/mars3d/mars3d";
import {loadCesiumZH} from "@/map/plugins/class/cesium-zh";

var viewer;
export function InitMap(params) {
  return mars3d.createMap({
      id: params.id,
      data: params.data.map3d,
      center:{"x":30.700614,"y":30.919516,"z":14275206.51,"heading":357.9,"pitch":-66.7,"roll":0},
      success: function (_viewer, jsondata) { //地图成功加载完成后执行
        viewer = _viewer;
        // Sandcastle.declare(flyToSanDiego);
        viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(116.700614, 30.919516, 2275206.0)
        });
        return Promise.resolve(_viewer);
      }
  });
}
export function UrlArr() {

  var urlArr = [
      'http://data.marsgis.cn/mapimg/radar/201906211112.PNG',
      'http://data.marsgis.cn/mapimg/radar/201906211124.PNG',
      'http://data.marsgis.cn/mapimg/radar/201906211130.PNG',
      'http://data.marsgis.cn/mapimg/radar/201906211136.PNG',
      'http://data.marsgis.cn/mapimg/radar/201906211142.PNG'
  ];
  return urlArr;

}
var layerArr;
var idxTimer;
var step = 0;
var alphaStep = 0.01;
export function startRadar(urlArr, time) {
  var arr = [];
  for (var i = 0, len = urlArr.length; i < len; i++) {
      var imageryProvider = mars3d.layer.createImageryProvider({
          "type": "image",
          "url":  urlArr[i],
          "rectangle": { "xmin": 73.16895, "xmax": 134.86816, "ymin": 12.2023, "ymax": 54.11485 },
      });
      var imagelayer = new Cesium.ImageryLayer(imageryProvider, { alpha: 0 })
      viewer.imageryLayers.add(imagelayer);

      arr.push(imagelayer);
  }
  layerArr = arr;

  step = 0;
  changeRadarAlpha(time);
  //汉化
  loadCesiumZH();
}
function changeRadarAlpha(time) {
  if (step > layerArr.length - 1) {
      step = 0;
      layerArr[layerArr.length - 1].alpha = 0;
  }
  var layer1 = layerArr[step];
  var layer2 = layerArr[step + 1];
  if (!layer1 || !layer2) return;
  layer1.alpha = 1;
  layer2.alpha = 0;

  clearInterval(idxTimer);
  idxTimer = window.setInterval(function () {
      layer1.alpha -= alphaStep;
      layer2.alpha += alphaStep;

      if (layer1.alpha < alphaStep) {
          layer1.alpha = 0;
          step++;
          changeRadarAlpha(time)
      }

  }, time * 1000 * alphaStep);
}