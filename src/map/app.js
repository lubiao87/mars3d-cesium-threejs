import * as Cesium from 'cesium/Cesium'
import * as mars3d from '@/map/mars3d/mars3d'
import { loadCesiumZH } from '@/map/plugins/class/cesium-zh'
var camera, scene, clock, viewer, geoCoder, layerWork

export function InitMap(params, fn) {
  console.log('params.data', params.data)
  mars3d.createMap({
    id: params.id,
    data: params.data.map3d,
    center: {
      x: 121.466139,
      y: 31.257341,
      z: 2170.8,
      heading: 357.9,
      pitch: -86.7,
      roll: 0,
    },
    success: function(_viewer, jsondata) {
      //地图成功加载完成后执行
      viewer = _viewer
      // Sandcastle.declare(flyToSanDiego);
      camera = viewer.camera
      scene = viewer.scene
      clock = viewer.clock
      //汉化
      loadCesiumZH()
      let geoCoder = new Cesium.Geocoder({
        container: document.getElementById('inputText'),
        scene: scene,
        // geocoderServices: "https://api.cesium.com/v1/geocode/autocomplete",
        flightDuration: 2,
        destinationFound: searchTextCaback,
      })
      // console.log("geoCoder", geoCoder);
      let viewModel = geoCoder.viewModel

      viewModel._searchCommand.beforeExecute._listeners.push(function(e) {
        // 开始搜索之前你的操作
        console.log('开始搜索之前', e)
      })

      viewModel._searchCommand.afterExecute._listeners.push(function(e) {
        //  搜索执行之后你的操作
        console.log('搜索执行之后', e)
      })

      // clock.multiplier = 3 * 60 * 60;
      // scene.postUpdate.addEventListener(icrf);
      // scene.globe.enableLighting = true;
      setTimeout(function() {
        camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            121.466139,
            31.257341,
            2170.8
          ),
          easingFunction: Cesium.EasingFunction.LINEAR_NONE,
          // orientation : {
          //   heading : Cesium.Math.toRadians(20.0),
          //   pitch : Cesium.Math.toRadians(-50.0),
          //   roll : 0.2
          // },
          complete: function() {
            setTimeout(function(params) {
              startRaodian()
            }, 2000)
          },
        })
      }, 3000)
      fn(viewer)
    },
  })
}
//上海白模页面业务相关
export function initWork() {
  // viewer.camera.flyHome(0);
  layerWork = mars3d.layer.createLayer(
    {
      type: '3dtiles',
      name: '上海市区',
      url: 'http://data.marsgis.cn/3dtiles/jzw-shanghai/tileset.json',
      style: {
        color: {
          conditions: [
            ['${floor} >= 300', 'rgba(45, 0, 75, 0.5)'],
            ['${floor} >= 200', 'rgb(102, 71, 151)'],
            ['${floor} >= 100', 'rgb(170, 162, 204)'],
            ['${floor} >= 50', 'rgb(224, 226, 238)'],
            ['${floor} >= 25', 'rgb(252, 230, 200)'],
            ['${floor} >= 10', 'rgb(248, 176, 87)'],
            ['${floor} >= 5', 'rgb(198, 106, 11)'],
            ['true', 'rgb(127, 59, 8)'],
          ],
        },
      },
      center: {
        x: 36.700614,
        y: -50.919516,
        z: 22275206.0,
        heading: 357.9,
        pitch: -86.7,
        roll: 0.2,
      },
      visible: true,
      flyTo: true,
    },
    viewer
  )

  showPickedFeatureinfo()
}

//3dtile模型的单体化信息鼠标移入显示
function showPickedFeatureinfo() {
  var nameOverlay = document.createElement('div')
  viewer.container.appendChild(nameOverlay)
  nameOverlay.className = 'backdrop'
  nameOverlay.style.display = 'none'
  nameOverlay.style.position = 'absolute'
  nameOverlay.style.bottom = '0'
  nameOverlay.style.left = '0'
  nameOverlay.style['pointer-events'] = 'none'
  nameOverlay.style.padding = '4px'
  nameOverlay.style.backgroundColor = 'black'

  // Information about the currently highlighted feature
  var highlighted = {
    feature: undefined,
    originalColor: new Cesium.Color(),
  }

  // Color a feature yellow on hover.
  viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
    // If a feature was previously highlighted, undo the highlight
    if (Cesium.defined(highlighted.feature)) {
      highlighted.feature.color = highlighted.originalColor
      highlighted.feature = undefined
    }

    // Pick a new feature
    var pickedFeature = viewer.scene.pick(movement.endPosition)
    if (!Cesium.defined(pickedFeature) || !pickedFeature.getProperty) {
      nameOverlay.style.display = 'none'
      return
    }

    var name = pickedFeature.getProperty('name')
    if (!Cesium.defined(name)) {
      name = pickedFeature.getProperty('id')
    }
    if (!Cesium.defined(name)) return

    // A feature was picked, so show it's overlay content
    if (name != '') {
      nameOverlay.style.display = 'block'
      nameOverlay.style.color = '#ffffff'
      nameOverlay.style.bottom =
        viewer.canvas.clientHeight - movement.endPosition.y + 'px'
      nameOverlay.style.left = movement.endPosition.x + 'px'
      nameOverlay.textContent = name
    }

    // Highlight the feature if it's not already selected.
    highlighted.feature = pickedFeature
    Cesium.Color.clone(pickedFeature.color, highlighted.originalColor)
    pickedFeature.color = Cesium.Color.YELLOW
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
}

function searchTextCaback(data) {
  console.log('搜索到： ', data)
  var text = data.searchText.split(',')[0]
  console.log('text ', data.searchText)
}
export function UrlArr() {
  var urlArr = [
    'http://data.marsgis.cn/mapimg/radar/201906211112.PNG',
    'http://data.marsgis.cn/mapimg/radar/201906211124.PNG',
    'http://data.marsgis.cn/mapimg/radar/201906211130.PNG',
    'http://data.marsgis.cn/mapimg/radar/201906211136.PNG',
    'http://data.marsgis.cn/mapimg/radar/201906211142.PNG',
  ]
  return urlArr
}
var layerArr
var idxTimer
var step = 0
var alphaStep = 0.01
// 时空雷达
export function startRadar(urlArr, time) {
  var arr = []
  for (var i = 0, len = urlArr.length; i < len; i++) {
    var imageryProvider = mars3d.layer.createImageryProvider({
      type: 'image',
      url: urlArr[i],
      rectangle: {
        xmin: 73.16895,
        xmax: 134.86816,
        ymin: 12.2023,
        ymax: 54.11485,
      },
    })
    var imagelayer = new Cesium.ImageryLayer(imageryProvider, { alpha: 0 })
    viewer.imageryLayers.add(imagelayer)

    arr.push(imagelayer)
  }
  layerArr = arr

  step = 0
  changeRadarAlpha(time)
}
function changeRadarAlpha(time) {
  if (step > layerArr.length - 1) {
    step = 0
    layerArr[layerArr.length - 1].alpha = 0
  }
  var layer1 = layerArr[step]
  var layer2 = layerArr[step + 1]
  if (!layer1 || !layer2) return
  layer1.alpha = 1
  layer2.alpha = 0

  clearInterval(idxTimer)
  idxTimer = window.setInterval(function() {
    layer1.alpha -= alphaStep
    layer2.alpha += alphaStep

    if (layer1.alpha < alphaStep) {
      layer1.alpha = 0
      step++
      changeRadarAlpha(time)
    }
  }, time * 1000 * alphaStep)
}
function icrf(scene, time) {
  if (scene.mode !== Cesium.SceneMode.SCENE3D) {
    return
  }

  var icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time)
  if (Cesium.defined(icrfToFixed)) {
    // var camera = viewer.camera;
    var offset = Cesium.Cartesian3.clone(camera.position)
    var transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed)
    camera.lookAtTransform(transform, offset)
  }
}
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

export function drawTextPoint(html,data, fn) {
  // viewer.mars.draw.deleteAll()
  var position = Cesium.Cartesian3.fromDegrees(data.X, data.Y, 10);
  var divpoint2 = new mars3d.DivPoint(viewer, {
      html: html,
      anchor: [0, 0],
      position: position,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000, 100000),//按视距距离显示
      scaleByDistance: new Cesium.NearFarScalar(1000, 1.0, 100000, 0.1),
      click: function (e) {//单击后的回调
          // haoutil.msg('单击了点');

      },
  });
  fn(divpoint2);
}
// 删除文字标签
export function deletTextPoint(obj) {
  console.log(obj);
  viewer.mars.draw.remove(obj);

}
//地图文庙创建 2
export function createWenmiao(id, config, fn) {
  //url传参，一个系统动态使用不同配置
  mars3d.createMap({
    id: id,
    data: config.map3d,
    infoBox: false,
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
    destination: Cesium.Cartesian3.fromDegrees(
      data.X,
      data.Y,
      2000
    ),
    easingFunction: Cesium.EasingFunction.LINEAR_NONE
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
      height
    });
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
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
