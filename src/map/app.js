import * as Cesium from "cesium/Cesium";
import * as mars3d from "@/map/mars3d/mars3d";
import {loadCesiumZH} from "@/map/plugins/class/cesium-zh";
var camera, scene, clock, viewer, geoCoder, layerWork;

export function InitMap(params, fn) {
  console.log("params.data", params.data)
  mars3d.createMap({
      id: params.id,
      data: params.data.map3d,
      center:{"x":121.466139,"y":31.257341,"z":2170.8,"heading":357.9,"pitch":-86.7,"roll":0},
      success: function (_viewer, jsondata) { //地图成功加载完成后执行
        viewer = _viewer;
        // Sandcastle.declare(flyToSanDiego);
        camera = viewer.camera;
        scene = viewer.scene;
        clock = viewer.clock;
        //汉化
        loadCesiumZH();
        let geoCoder = new Cesium.Geocoder({
          container: document.getElementById("inputText"),
          scene: scene,
          // geocoderServices: "https://api.cesium.com/v1/geocode/autocomplete",
          flightDuration: 2,
          destinationFound: searchTextCaback
        });
        // console.log("geoCoder", geoCoder);
        let viewModel=geoCoder.viewModel;

        viewModel._searchCommand.beforeExecute._listeners.push(function (e) {
          // 开始搜索之前你的操作
          console.log("开始搜索之前", e)

        });

        viewModel._searchCommand.afterExecute._listeners.push(function (e) {
        //  搜索执行之后你的操作
        console.log("搜索执行之后",e)
        });

        // clock.multiplier = 3 * 60 * 60;
        // scene.postUpdate.addEventListener(icrf);
        // scene.globe.enableLighting = true;
        setTimeout(function() {
            camera.flyTo({
              destination : Cesium.Cartesian3.fromDegrees(121.466139, 31.257341, 2170.8),
              easingFunction : Cesium.EasingFunction.LINEAR_NONE,
              // orientation : {
              //   heading : Cesium.Math.toRadians(20.0),
              //   pitch : Cesium.Math.toRadians(-50.0),
              //   roll : 0.2
              // },
              complete: function () {
                setTimeout(function (params) {
                  startRaodian();
                },2000);
              }
            });
        }, 3000);
        fn(viewer);
      }
  });
}
//上海白模页面业务相关
export function initWork() {
  // viewer.camera.flyHome(0);
  layerWork = mars3d.layer.createLayer({
      "type": "3dtiles",
      "name": "上海市区",
      "url": "http://data.marsgis.cn/3dtiles/jzw-shanghai/tileset.json",
      "style":{
          "color": {
              "conditions": [
                  ["${floor} >= 300", "rgba(45, 0, 75, 0.5)"],
                  ["${floor} >= 200", "rgb(102, 71, 151)"],
                  ["${floor} >= 100", "rgb(170, 162, 204)"],
                  ["${floor} >= 50", "rgb(224, 226, 238)"],
                  ["${floor} >= 25", "rgb(252, 230, 200)"],
                  ["${floor} >= 10", "rgb(248, 176, 87)"],
                  ["${floor} >= 5", "rgb(198, 106, 11)"],
                  ["true", "rgb(127, 59, 8)"]
              ]
          }
      },
      center:{ "x":36.700614, "y":-50.919516, "z":22275206.0, "heading":357.9, "pitch":-86.7, "roll":0.2},
      "visible": true,
      "flyTo": true
  }, viewer);


  showPickedFeatureinfo();
}

//3dtile模型的单体化信息鼠标移入显示
function showPickedFeatureinfo() {
  var nameOverlay = document.createElement('div');
  viewer.container.appendChild(nameOverlay);
  nameOverlay.className = 'backdrop';
  nameOverlay.style.display = 'none';
  nameOverlay.style.position = 'absolute';
  nameOverlay.style.bottom = '0';
  nameOverlay.style.left = '0';
  nameOverlay.style['pointer-events'] = 'none';
  nameOverlay.style.padding = '4px';
  nameOverlay.style.backgroundColor = 'black';

  // Information about the currently highlighted feature
  var highlighted = {
      feature: undefined,
      originalColor: new Cesium.Color()
  };

  // Color a feature yellow on hover.
  viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
      // If a feature was previously highlighted, undo the highlight
      if (Cesium.defined(highlighted.feature)) {
          highlighted.feature.color = highlighted.originalColor;
          highlighted.feature = undefined;
      }

      // Pick a new feature
      var pickedFeature = viewer.scene.pick(movement.endPosition);
      if (!Cesium.defined(pickedFeature) || !pickedFeature.getProperty) {
          nameOverlay.style.display = 'none';
          return;
      }

      var name = pickedFeature.getProperty('name');
      if (!Cesium.defined(name)) {
          name = pickedFeature.getProperty('id');
      }
      if (!Cesium.defined(name)) return;

      // A feature was picked, so show it's overlay content
      if (name != "") {
          nameOverlay.style.display = 'block';
          nameOverlay.style.color = "#ffffff";
          nameOverlay.style.bottom = viewer.canvas.clientHeight - movement.endPosition.y + 'px';
          nameOverlay.style.left = movement.endPosition.x + 'px';
          nameOverlay.textContent = name;
      }

      // Highlight the feature if it's not already selected.
      highlighted.feature = pickedFeature;
      Cesium.Color.clone(pickedFeature.color, highlighted.originalColor);
      pickedFeature.color = Cesium.Color.YELLOW;

  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

}

function searchTextCaback(data) {
  console.log("搜索到： ",data)
  var text = data.searchText.split(",")[0];
  console.log("text ",data.searchText)
};
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
// 时空雷达
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
function icrf(scene, time) {
  if (scene.mode !== Cesium.SceneMode.SCENE3D) {
      return;
  }

  var icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);
  if (Cesium.defined(icrfToFixed)) {
      // var camera = viewer.camera;
      var offset = Cesium.Cartesian3.clone(camera.position);
      var transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
      camera.lookAtTransform(transform, offset);
  }
}
// 环绕旋转
export function startRaodian() {
  stopRaodian();
  var point = mars3d.point.getCenter(viewer);
  mars3d.point.windingPoint.start(viewer,point);
}
export function stopRaodian() {
  // if (lastModel) {
  //     viewer.entities.remove(lastModel);
  //     lastModel = null;
  // }
  mars3d.point.windingPoint.stop();
}
var arrPoint = [];

//当前标签业务相关
export function initPointWork() {
  // (121.466139, 31.257341, 2170.8)
    //============================
    var divpoint1 = new mars3d.DivPoint(viewer, {
        html: `<div class="divpoint1">
                <div class="title">测试DIV点1</div>
              </div >`,
        anchor: [0, 0],
        position: Cesium.Cartesian3.fromDegrees(121.4575159, 31.256899, 100),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000, 200000),//按视距距离显示

        click: function (e) {//单击后的回调
            haoutil.msg('单击了点');
        },
    });
    arrPoint.push(divpoint1);
    //============================
    var position = Cesium.Cartesian3.fromDegrees(121.4735159, 31.253899, 100);

    var divpoint2 = new mars3d.DivPoint(viewer, {
        html: `<div class="divpoint2">
                <div class="title">省体育馆</div>
                <textarea class="content" rows="2">此处可以绑定任意Html代码和css效果 </textarea >
              </div >`,
        anchor: [0, 0],
        position: position,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000, 200000),//按视距距离显示
        scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 100000, 0.5),
        click: function (e) {//单击后的回调
            // haoutil.msg('单击了点');
        },
    });
    arrPoint.push(divpoint2);
    //添加实体
    var entitie = viewer.entities.add({
        name: "测试位置,与DIV点进行对比",
        position: position,
        point: {
            color: new Cesium.Color.fromCssColorString("#00ff00"),
            pixelSize: 5,
        },
    });
}
function drawPoint() {
  viewer.mars.draw.deleteAll();

  viewer.mars.draw.startDraw({
      type: "point",
      style: {
          pixelSize: 12,
          color: '#ffff00'
      },
      success: function (entity) {
          var position = entity.position.getValue();
          viewer.mars.draw.deleteAll();

          var divpoint = new mars3d.DivPoint(viewer, {
              html: `<div class="divpoint2">
                  <div class="title">测试DIV点</div>
                  <div class="content" contenteditable="true">此处可以绑定任意Html代码和css效果 </div >
              </div >`,
              position: position,
              anchor: [0, 0],
              // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000, 100000),//按视距距离显示
              click: function (e) {//单击后的回调
                  // haoutil.msg('单击了点');

              },
          });
          arrPoint.push(divpoint);
      }
  });
}
//地图文庙创建 2
export function createWenmiao(id, config) {
  //url传参，一个系统动态使用不同配置
  mars3d.createMap({
    id: id,
    data: config.map3d,
    "infoBox": false,
    center: { "y": 33.589536, "x": 119.032216, "z": 145.08, "heading": 3.1, "pitch": -22.9, "roll": 0 },
    success: function (_viewer, jsondata) {//地图成功加载完成后执行
        viewer = _viewer;
        // console.log("_viewer", _viewer)
        initWenMiaoWork();
    }
});
  //汉化
  loadCesiumZH();
}
//当前页面业务相关
function initWenMiaoWork() {

  //三维模型
  var layerWork = mars3d.layer.createLayer({
      "name": "文庙",
      "type": "3dtiles",
      "url": "http://data.marsgis.cn/3dtiles/qx-simiao/tileset.json",
      "offset": { "z": 81.5 },
      "visible": true
  }, viewer);


  //单体化图层
  // var layerWorkDTH = mars3d.layer.createLayer({
  //     "type": "geojson",
  //     "name": "文庙-单体化",
  //     "url": " http://data.marsgis.cn/file/geojson/draw-dth-wm.json",
  //     "symbol": {
  //         "styleOptions": {
  //             "clampToGround": true
  //         }
  //     },
  //     "dth": {//表示“单体化”专用图层
  //         "buffer": 3,
  //         "color": "#ffff00",
  //         "opacity": 0.5
  //     },
  //     "popup": [
  //         { "field": "name", "name": "房屋名称" },
  //         { "field": "jznf", "name": "建造年份" },
  //         { "field": "ssdw", "name": "所属单位" },
  //         { "field": "remark", "name": "备注信息" }
  //     ],
  //     "visible": true
  // }, viewer);

}
export function getWindowObj() {
  return {
    camera,
    scene,
    clock,
    viewer,
    geoCoder,
    layerWork
  };
}