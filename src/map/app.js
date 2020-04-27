import * as Cesium from 'cesium/Cesium'
import * as mars3d from '@/map/mars3d/mars3d'
import { loadCesiumZH } from '@/map/plugins/class/cesium-zh'
var camera, scene, clock, viewer, geoCoder, layerWork

// 环绕旋转
export function startRaodian() {
  stopRaodian()
  var point = mars3d.point.getCenter(viewer)
  mars3d.point.windingPoint.start(viewer, point)
}
export function stopRaodian() {
  // if (lastModel) {
  //     viewer.entities.remove(lastModel);
  //     lastModel = null;
  // }
  mars3d.point.windingPoint.stop()
}
// var arrPoint = []

export function drawTextPoint(html, data, fn) {
  // viewer.mars.draw.deleteAll()
  var position = Cesium.Cartesian3.fromDegrees(data.X, data.Y, 10)
  var divpoint2 = new mars3d.DivPoint(viewer, {
    html: html,
    anchor: [0, 0],
    position: position,
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(100, 100000), //按视距距离显示
    scaleByDistance: new Cesium.NearFarScalar(100, 1.0, 100000, 0.1),
    click: function(e) {
      //单击后的回调
      // haoutil.msg('单击了点');
    },
  })
  fn(divpoint2)
}
// 删除文字标签
export function deletTextPoint(obj) {
  console.log(obj)
  viewer.mars.draw.remove(obj)
}
//地图文庙创建 2
export function createWenmiao(id, config, fn) {
  //url传参，一个系统动态使用不同配置
  mars3d.createMap({
    id: id,
    data: config.map3d,
    infoBox: false,
    serverURL: config.serverURL,
    center: {
      y: JSON.parse(config.map3d.center.y),
      x: JSON.parse(config.map3d.center.x),
      z: JSON.parse(config.map3d.center.z),
      heading: JSON.parse(config.map3d.center.heading),
      pitch: JSON.parse(config.map3d.center.pitch),
      roll: JSON.parse(config.map3d.center.roll),
    },
    success: function(_viewer, jsondata) {
      //地图成功加载完成后执行
      viewer = _viewer
      camera = viewer.camera
      scene = viewer.scene
      clock = viewer.clock
      initWenMiaoWork()
      //设置默认地图源
      viewer.baseLayerPicker.viewModel.selectedImagery =
        viewer.baseLayerPicker.viewModel.imageryProviderViewModels[
          config.map3d.selectedImageryIndex || 0
        ]

      if (fn) {
        fn(viewer)
      }
    },
  })
  //汉化
  loadCesiumZH()
}
//当前页面业务相关
function initWenMiaoWork() {
  //三维模型
  var layerWork = mars3d.layer.createLayer(
    {
      name: '文庙',
      type: '3dtiles',
      url: 'http://data.marsgis.cn/3dtiles/qx-simiao/tileset.json',
      offset: { z: 81.5 },
      visible: true,
    },
    viewer
  )

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
//相机移动后
export function setMoveEnd(fn) {
  viewer.scene.camera.moveEnd.addEventListener(fn)
}

// 增加点
// var dataSource = new Cesium.CustomDataSource();
export function addFeature(item) {
  var dataSource = new Cesium.CustomDataSource()

  // for (var i = 0, len = arr.length; i < len; i++) {
  // var item = arr[i];

  var inthtml = `<table style="width: 200px;"><tr>
    <th scope="col" colspan="4"  style="text-align:center;font-size:15px;">
    ${item.name}
    </th></tr><tr>
    <td >住用单位：</td><td >${item.zydw}</td></tr><tr>
    <td >建筑面积：</td><td >${item.jzmj}</td></tr><tr>
    <td >建筑层数：</td><td >${item.jzcs}</td></tr><tr>
    <td >建筑结构：</td><td >${item.jzjg}</td></tr><tr>
    <td >建筑年份：</td><td >${item.jzlf}</td></tr><tr>
    <td colspan="4" style="text-align:right;"><a href="javascript:;">更多</a></td></tr></table>`

  //添加实体
  var entitie = dataSource.entities.add({
    name: item.name,
    position: Cesium.Cartesian3.fromDegrees(item.X, item.Y, 10),
    point: {
      color: new Cesium.Color.fromCssColorString('#3388ff'),
      pixelSize: 10,
      outlineColor: new Cesium.Color.fromCssColorString('#ffffff'),
      outlineWidth: 2,
      // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.2),
    },
    label: {
      text: item.name,
      font: 'normal small-caps normal 17px 楷体',
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      fillColor: Cesium.Color.AZURE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -20), //偏移量
      // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
        0.0,
        2000000
      ),
    },
    data: item,
    tooltip: {
      html: inthtml,
      anchor: [0, -12],
    },
    click: function(entity) {
      //单击
      if (viewer.camera.positionCartographic.height > 1000) {
        viewer.flyTo(entity, {
          offset: {
            heading: 0,
            pitch: Cesium.Math.toRadians(-90),
            range: 1000,
          },
        })
      }
      // viewer.dataSources.remove(dataSource, entitie);
    },
  })

  viewer.dataSources.add(dataSource)
  return { dataSource, entitie }
}
// 删除点
export function removeDntitie(obj) {
  viewer.dataSources.remove(obj.dataSource, obj.entitie)
}
// 飞行目标点
export function flyToPoint(obj) {
  // if (viewer.camera.positionCartographic.height > 500) {
  viewer.flyTo(obj.entitie, {
    offset: {
      heading: 0,
      pitch: Cesium.Math.toRadians(-90),
      range: 500,
    },
  })
  // }
}
export function flyToText(data) {
  camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(data.X, data.Y, 2000),
    easingFunction: Cesium.EasingFunction.LINEAR_NONE,
  })
}
// 点击地图
export function left_click(fn) {
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  handler.setInputAction(function(event) {
    var earthPosition = viewer.camera.pickEllipsoid(
      event.position,
      viewer.scene.globe.ellipsoid
    )
    var cartographic = Cesium.Cartographic.fromCartesian(
      earthPosition,
      viewer.scene.globe.ellipsoid,
      new Cesium.Cartographic()
    )
    var lat = Cesium.Math.toDegrees(cartographic.latitude)
    var lng = Cesium.Math.toDegrees(cartographic.longitude)
    var height = cartographic.height
    // console.log('[Lng=>' + lng + ',Lat=>' + lat + ',H=>' + height + ']');
    fn({
      lat,
      lng,
      height,
    })
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}
export function getWindowObj() {
  return {
    camera,
    scene,
    clock,
    viewer,
    geoCoder,
    layerWork,
  }
}
