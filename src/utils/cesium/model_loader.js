import * as Cesium from "cesium/Cesium";
let viewer, tileset;
var rotateRadio = 15 * 0.017453293;
var origin_height;
var zoomRadio;
var error_num = 0;
var change_num = 0;
var planeEntities = [];
var oriention = [];
var is_cut = false;
var has_clipping = false;
var has_oriention = false;
var target_radius = 10;
var plane_0_x = 2;
var plane_0_y = 0;
var plane_0_distanc = 10;
var plane_1_x = -2;
var plane_1_y = 0;
var plane_1_distanc = 10;
var plane_2_x = 0;
var plane_2_y = 2;
var plane_2_distanc = 10;
var plane_3_x = 0;
var plane_3_y = -2;
var plane_3_distanc = 10;


function createClippingPlanes() {
    // 创建裁剪平面
    let clippingPlanes = new Cesium.ClippingPlaneCollection({
        planes: [
            new Cesium.ClippingPlane(new Cesium.Cartesian3(plane_0_x, plane_0_y, 0), plane_0_distanc),
            new Cesium.ClippingPlane(new Cesium.Cartesian3(plane_1_x, plane_1_y, 0), plane_1_distanc),
            new Cesium.ClippingPlane(new Cesium.Cartesian3(plane_2_x, plane_2_y, 0), plane_2_distanc),
            new Cesium.ClippingPlane(new Cesium.Cartesian3(plane_3_x, plane_3_y, 0), plane_3_distanc),
        ],
        edgeColor: Cesium.Color.GREY,
        edgeWidth: 1,
        // modelMatrix: m,
        unionClippingRegions: true
    });

    tileset.clippingPlanes = clippingPlanes;

    // 添加裁剪面
    if (is_cut) {
        for (var i = 0; i < 4; ++i) {
            var plane = clippingPlanes.get(i);
            var planeEntity = viewer.entities.add({
                position: tileset.boundingSphere.center,
                plane: {
                    dimensions: new Cesium.Cartesian2(target_radius * 2, target_radius * 2),
                    material: Cesium.Color.WHITE.withAlpha(0.1),
                    plane: new Cesium.CallbackProperty(createPlaneUpdateFunction(plane), false),
                    outline: true,
                    outlineColor: Cesium.Color.WHITE
                }
            });

            planeEntities.push(planeEntity);
        }
    }
}

function set_camera_oriention() {
    viewer.camera.setView({
        destination: new Cesium.Cartesian3(oriention[0], oriention[1], oriention[2]),
        orientation: {
            heading: oriention[3],
            pitch: oriention[4],
            roll: oriention[5],
        }
    })
}

export function load_model(url, id) {
    // let url = '/media/project/' + uuid + '/Scene/Production_1.json';
    viewer = new Cesium.Viewer(id, {
        animation: false,//是否创建动画小器件，左下角仪表
        timeline: false,//是否显示时间轴
        sceneModePicker: false,//是否显示3D/2D选择器
        baseLayerPicker: false,//是否显示图层选择器
        geocoder: false,//是否显示geocoder小器件，右上角查询按钮
        scene3DOnly: true,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
        navigationHelpButton: false,//是否显示右上角的帮助按钮
        homeButton: false,//是否显示Home按钮
        infoBox: false,//是否显示信息框
        showRenderLoopErrors: false,//如果设为true，将在一个HTML面板中显示错误信息
        fullscreenButton: false,
        globe: false,
        skyAtmosphere: false,
        skyBox: false,
        vrButton: true,
        contextOptions: {
            //cesium状态下允许canvas转图片convertToImage
            webgl: {
                alpha: true,
                depth: false,
                stencil: true,
                antialias: true,
                premultipliedAlpha: true,
                preserveDrawingBuffer: true,
                failIfMajorPerformanceCaveat: true
            },
            allowTextureFilterAnisotropic: true
        }

    });


    //添加模型
    tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: url,
        maximumScreenSpaceError: 2,
        maximumNumberOfLoadedTiles: 10,
        // modelMatrix: m

    }));

    // 设置viewer参数
    tileset.readyPromise.then(function (tileset) {
        var cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
        var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
        var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);
        var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
        var m = Cesium.Matrix4.fromTranslation(translation);
        tileset.modelMatrix = m;

        if (has_oriention) {
            set_camera_oriention();
        } else {
            viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, Cesium.Math.toRadians(-45), tileset.boundingSphere.radius * 1.0));
        }

        zoomRadio = tileset.boundingSphere.radius / 20;

        origin_height = viewer.camera.position.y - tileset.boundingSphere.center.y;
        viewer.scene.screenSpaceCameraController.minimumZoomDistance = 4;
        viewer.scene.screenSpaceCameraController.maximumZoomDistance = tileset.boundingSphere.radius * 2;
        viewer.scene.screenSpaceCameraController.minimumCollisionTerrainHeight = 1;
        viewer.scene.screenSpaceCameraController.minimumPickingTerrainHeight = 1;

        viewer.scene.screenSpaceCameraController.maximumMovementRatio = 0.01;
        viewer.scene.screenSpaceCameraController.inertiaSpin = 0.0;

        viewer.camera.defaultZoomAmount = 4;


        // 限制相机俯仰角度不高于-20
        viewer.clock.onTick.addEventListener(function () {
            var cam_position = viewer.camera.positionWC;
            var tileset_center = get_pointFromScreenCenter(viewer);

            if (dot_product(cam_position, tileset_center)) {
                viewer.scene.screenSpaceCameraController.enableZoom = false;
            }
            if (viewer.camera.pitch > Cesium.Math.toRadians(-20)) {
                viewer.scene.screenSpaceCameraController.enableTilt = false;
            }
            // 优化移动速率
            dynamic_radio();

        });

        // 添加裁剪面
        if (is_cut || has_clipping) {
            createClippingPlanes();
        }
        // createClippingPlanes();

    }).otherwise(function (error) {
        console.log(error);
    });

    var mouse_middle_handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    mouse_middle_handler.setInputAction(function (movement) {
        let temp_handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        temp_handler.setInputAction(function (movement) {
            let startMousePosition = movement.startPosition;
            let endMousePosition = movement.endPosition;
            let y = endMousePosition.y - startMousePosition.y;
            if (y > 0) {
                viewer.scene.screenSpaceCameraController.enableTilt = true;
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);

    let pincth_handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    pincth_handler.setInputAction(function (start_position) {
        pincth_handler.setInputAction(function (movement) {
            if (movement.angleAndHeight.endPosition.y - movement.angleAndHeight.startPosition.y > 0) {
                viewer.scene.screenSpaceCameraController.enableTilt = true;
            }
            if (movement.distance.endPosition.y - movement.distance.startPosition.y < 0) {
                viewer.scene.screenSpaceCameraController.enableZoom = true;
            }
        }, Cesium.ScreenSpaceEventType.PINCH_MOVE);
    }, Cesium.ScreenSpaceEventType.PINCH_START);

    // 限制相机高度不低于模型中心
    let wheel_handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    wheel_handler.setInputAction(function (movement) {
        if (movement < 0) {
            viewer.scene.screenSpaceCameraController.enableZoom = true;
            simple_downsize(viewer)
        } else {
            simple_enlarge(viewer)
        }
    }, Cesium.ScreenSpaceEventType.WHEEL);

    mouse_middle_handler.setInputAction(function (movement) {
        simple_enlarge(viewer);
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    setInputAction();
}

export function setInputAction() {
  //鼠标点击事件  左键
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  // console.log("handler", handler)
  var silhouetteBlue = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
  silhouetteBlue.uniforms.color = Cesium.Color.BLUE;
  silhouetteBlue.uniforms.length = 0.01;
  handler.setInputAction(function(click) {
     // 处理鼠标按下事件
     // 获取鼠标当前位置
      console.log('click', click);
      var pick = viewer.scene.pick(click.position);
      // Pick a new feature
      // var pickedFeature = viewer.scene.pick(click.endPosition);
      //选中某模型   pick选中的对象
      if(pick){
        console.log("pick", pick)
        silhouetteBlue.selected = [pick];
      }

   }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
}
function dot_product(a, b) {
    var dot_product = a.x * b.x + a.y * b.y + a.z * b.z;
    var mo = Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.y, 2) + Math.pow(b.z, 2));
    // console.log(dot_product / mo - mo);
    return dot_product / mo - mo < 5
}

function get_pointFromScreenCenter() {
    var scene = viewer.scene;
    var center_point = new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas.clientHeight / 2);
    var pickedObject = scene.pick(center_point);
    if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
        var position = viewer.scene.pickPosition(center_point);
        if (Cesium.defined(position)) {
            return position //模型
        } else {
            return viewer.camera.positionWC;
        }
    } else {
        return viewer.camera.positionWC;
    }
}

function get_camera_position() {
    var camera = viewer.camera;
    var p = camera.positionWC;
    // console.log("Camera WC position:", p);
    return p //相机
}

function simple_enlarge() {
    var cam_position = viewer.camera.positionWC;
    var tileset_center = get_pointFromScreenCenter();

    if (!dot_product(cam_position, tileset_center)) {
        viewer.camera.zoomIn(zoomRadio);
    }
}

function simple_downsize() {
    viewer.camera.zoomOut(zoomRadio);
}

function simple_rotate_to_left() {
    var m = get_pointFromScreenCenter();
    var c = get_camera_position();
    viewer.camera.rotate(m, rotateRadio);
}

function simple_rotate_to_right() {
    var m = get_pointFromScreenCenter();
    var c = get_camera_position();
    viewer.camera.rotate(m, -rotateRadio);
}

function pitch_look() {
    var cam = viewer.camera;
    var pitch = Cesium.Math.toDegrees(cam.pitch);
    if (pitch - 10 > -10 || pitch - 10 < -90) {
        pitch = -10
    }
    var m = get_pointFromScreenCenter();
    var heading = cam.heading;
    var pitch = Cesium.Math.toRadians(pitch - 10);
    var range = tileset.boundingSphere.radius * 1.0;
    viewer.camera.lookAt(m, new Cesium.HeadingPitchRange(heading, pitch, range));
}

function dsviewer() {
    viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, Cesium.Math.toRadians(-90.0), tileset.boundingSphere.radius * 1.0));
}

function reset() {
    if (has_oriention) {
        set_camera_oriention();
    } else {
        viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, Cesium.Math.toRadians(-45), tileset.boundingSphere.radius * 1.0));
    }
    // viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, Cesium.Math.toRadians(-45.0), tileset.boundingSphere.radius * 1.0));
    viewer.scene.screenSpaceCameraController.enableTilt = true;
    viewer.scene.screenSpaceCameraController.enableZoom = true;
}

function dynamic_radio() {
    tileset.readyPromise.then(function () {
        // console.log(viewer.camera.positionCartographic.height);
        viewer.scene.screenSpaceCameraController.maximumMovementRatio = 0.005 * (viewer.camera.positionCartographic.height - Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center).height) / tileset.boundingSphere.radius;
        // console.log(viewer.scene.screenSpaceCameraController.maximumMovementRatio)
    })
}

function screenshot(id) {
    var canvas = viewer.scene.canvas;
    var genimg = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height, 'jpeg');
    return genimg
}

function screencanvas() {
    return viewer.scene.canvas;
}

function createPlaneUpdateFunction(plane) {
    // console.log(change_num);
    if (change_num == 0) {
        change_num += 1;
        return function () {
            plane.distance = plane_0_distanc;
            plane.normal.x = plane_0_x;
            plane.normal.y = plane_0_y;
            return plane;
        };
    } else if (change_num == 1) {
        change_num += 1;
        return function () {
            plane.distance = plane_1_distanc;
            plane.normal.x = plane_1_x;
            plane.normal.y = plane_1_y;
            return plane;
        };
    } else if (change_num == 2) {
        change_num += 1;
        return function () {
            plane.distance = plane_2_distanc;
            plane.normal.x = plane_2_x;
            plane.normal.y = plane_2_y;
            return plane;
        };
    } else if (change_num == 3) {
        change_num += 1;
        return function () {
            plane.distance = plane_3_distanc;
            plane.normal.x = plane_3_x;
            plane.normal.y = plane_3_y;
            return plane;
        };
    }
}

function change_position(direction, r, d) {
    if (direction == "east") {
        plane_1_distanc = d;
        plane_1_y = -1 * Math.tan(-r * Math.PI / 180);
        plane_1_y = plane_1_y.toPrecision(2)
    } else if (direction == "south") {
        plane_2_distanc = d;
        plane_2_x = -1 * Math.tan(-r * Math.PI / 180);
        plane_2_x = plane_2_x.toPrecision(2)
    } else if (direction == "west") {
        plane_0_distanc = d;
        plane_0_y = Math.tan(-r * Math.PI / 180);
        plane_0_y = plane_0_y.toPrecision(2)

    } else if (direction == "north") {
        plane_3_distanc = d;
        plane_3_x = Math.tan(-r * Math.PI / 180);
        plane_3_x = plane_3_x.toPrecision(2)
    }
}

function use_clipping() {
    is_cut = true;
}

function appling_clipping_planes(position) {
    if (position.length != 0) {
        has_clipping = true;
        plane_0_x = position[2][0];
        plane_0_y = position[2][1];
        plane_0_distanc = position[2][3];
        plane_1_x = position[0][0];
        plane_1_y = position[0][1];
        plane_1_distanc = position[0][3];
        plane_2_x = position[1][0];
        plane_2_y = position[1][1];
        plane_2_distanc = position[1][3];
        plane_3_x = position[3][0];
        plane_3_y = position[3][1];
        plane_3_distanc = position[3][3];
    }
}

function get_clipping_planes() {
    let eswn_arrays = [
        [plane_1_x, plane_1_y, 0, plane_1_distanc],
        [plane_2_x, plane_2_y, 0, plane_2_distanc],
        [plane_0_x, plane_0_y, 0, plane_0_distanc],
        [plane_3_x, plane_3_y, 0, plane_3_distanc],
    ];
    return eswn_arrays;
}

function get_camera_info() {
    let position = viewer.camera.positionWC;
    let heading = viewer.camera.heading;
    let pitch = viewer.camera.pitch;
    let roll = viewer.camera.roll;
    return [position.x, position.y, position.z, heading, pitch, roll].join("*")
}

function appling_camera_oriention(data) {
    let string_arrays = data.split("*");
    if (string_arrays.length == 6) {
        has_oriention = true;
        string_arrays.forEach(function (value, i) {
            oriention.push(parseFloat(value))
        });
    }

}