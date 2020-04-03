import * as THREE from "three";
import "./threebsp";
import axios from 'axios';
// 防抖
export function _debounce(fn, delay) {
  var delay = delay || 100;
  var timer;
  return function() {
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}
function Rect(x, y, w, h) {
  return { x: x, y: y, width: w, height: h };
}
function Point(x, y) {
  return { x: x, y: y };
}
// 图标文字
export function _getTextCanvas(text, w, h, R) {
  let width = 4000 || w,
    height = 1200 || h,
    r = 200 || R;
  var rect = Rect(0, 0, width, height);
  var ptA = Point(rect.x + r, rect.y);
  var ptB = Point(rect.x + rect.width, rect.y);
  var ptC = Point(rect.x + rect.width, rect.y + rect.height);
  var ptD = Point(rect.x, rect.y + rect.height);
  var ptE = Point(rect.x, rect.y);

  let canvas = document.createElement("canvas");
  canvas.width = width + 400;
  canvas.height = height + 400;
  let ctx = canvas.getContext("2d");
  let arrText = text;
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#4c66c799";
  ctx.lineJoin = "round";
  ctx.lineWidth = 40;
  // ctx.strokeRect(0, 0, width, height);
  ctx.beginPath();
  ctx.moveTo(ptA.x, ptA.y);
  ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r);
  ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r);
  ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r);
  ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // ctx.fillRect(r, r, width - 2 * r, height - 2 * r);
  ctx.font = 400 + 'px " bold';
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(arrText, width / 2, height / 2);
  // ctx.fillText(arrText[1], width/2,height/2 + 300)
  return canvas;
}
// ctx：Canvas绘图环境
// fromX, fromY：起点坐标（也可以换成 p1 ，只不过它是一个数组）
// toX, toY：终点坐标 (也可以换成 p2 ，只不过它是一个数组)
// theta：三角斜边一直线夹角
// headlen：三角斜边长度
// width：箭头线宽度
// color：箭头颜色
export function _drawArrow(w, h) {
  let canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  let x1 = w - 400 + 0,
    y1 = h - 400 + 0,
    x2 = w - 400 + 400,
    y2 = h - 400 + 0,
    x3 = w - 400 + 200,
    y3 = h - 400 + 400,
    color = "#4c66c799",
    type = "fill";
  let ctx = canvas.getContext("2d");
  ctx.lineWidth = w / 4; //设置线宽

  ctx.beginPath(); //开始绘制路径
  ctx.moveTo(w / 2, 0); //移动至起始点
  ctx.lineTo(w / 2, h - 400); //移动至终点
  ctx.strokeStyle = color;
  ctx.stroke(); //绘制
  // ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx[type + "Style"] = color;
  ctx.closePath();
  ctx[type]();
  return canvas;
}
//生成模型
function createMesh(geom) {
  //设置当前的模型矩阵沿xy轴偏移，让图片处于显示中心
  //geom.applyMatrix(new THREE.Matrix4().makeTranslation(-250, -100, 0));

  //  创建一个线框纹理
  var wireFrameMat = new THREE.MeshBasicMaterial({
    opacity: 0.5,
    wireframeLinewidth: 0.5
  });
  wireFrameMat.wireframe = true;

  // 创建模型
  var mesh = new THREE.Mesh(geom, wireFrameMat);

  return mesh;
}
// 创建机房
export function _NowRoom(arr, h) {
  let listGroup = new THREE.Group();
  if (Array.isArray(arr)) {
    if (arr.length < 2) {
      console.error("至少确定两个点拼构模型");
    } else {
      var shape = new THREE.Shape();
      var shape2 = new THREE.Shape();

      // shape.absarc(50,50,40,0,2*Math.PI);//圆弧
      shape.moveTo(arr[0][0], arr[0][1]); //起点
      shape2.moveTo(arr[0][0], arr[0][1]); //起点
      let arrX = [],
        arrY = [];
      arr.forEach((item, index) => {
        arrX.push(item[0]);
        arrY.push(item[1]);
        shape.lineTo(item[0], item[1]);
        shape2.lineTo(item[0], item[1]);
      });
      shape.lineTo(arr[0][0], arr[0][1]);
      shape2.lineTo(arr[0][0], arr[0][1]);
      var geometry = new THREE.ExtrudeGeometry( //拉伸造型
        shape, //二维轮廓
        //拉伸参数
        {
          amount: h, //拉伸长度
          curveSegments: 40, //圆周方向细分数
          bevelEnabled: false //无倒角
        }
      );
      var geometry2 = new THREE.ExtrudeGeometry( //拉伸造型
        shape2, //二维轮廓
        //拉伸参数
        {
          amount: -200, //拉伸长度
          curveSegments: 40, //圆周方向细分数
          bevelEnabled: false //无倒角
        }
      );
      var material2 = new THREE.MeshBasicMaterial({
        color: "#ddd",
        side: THREE.DoubleSide //两面可见
      }); //材质对象

      var objectClone = geometry.clone();
      var getMaxX = Math.max.apply(null, arrX);
      var getMaxY = Math.max.apply(null, arrY);
      geometry2.scale(1 + 450 / getMaxX, 1 + 450 / getMaxY, 1);

      objectClone.scale(1 + 450 / getMaxX, 1 + 450 / getMaxY, 1);
      var cubeBig = createMesh(objectClone);
      cubeBig.position.x = -150;
      cubeBig.position.y = -150;
      var sphereSmoll = createMesh(geometry);
      //生成ThreeBSP对象
      var sphereBSP = new ThreeBSP(cubeBig);
      var cubeBSP = new ThreeBSP(sphereSmoll);
      //进行并集计算
      var resultBSP = sphereBSP.subtract(cubeBSP);

      //从BSP对象内获取到处理完后的mesh模型数据
      var result = resultBSP.toMesh();
      //更新模型的面和顶点的数据
      result.geometry.computeFaceNormals();
      result.geometry.computeVertexNormals();
      //重新赋值一个纹理
      var material = new THREE.MeshPhongMaterial({
        color: "#284286",
        transparent: true, //开启透明度
        opacity: 0.3 //设置透明度具体值
      });
      result.material = material;
      // var mesh = new THREE.Mesh(geometry, material2); //网格模型对象
      var mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象
      mesh2.position.x = -150;
      mesh2.position.y = -200;
      // listGroup.add(mesh).add(mesh2);
      listGroup.add(result).add(mesh2);
    }
  } else {
    console.error("未传入数组");
  }
  return listGroup;
}
// 创建朔源精灵图标3
export function newCSS3DSprite3(name, r) {
  let canvas = document.createElement("canvas");
  canvas.width = 2 * r;
  canvas.height = 2 * r;
  let ctx = canvas.getContext("2d");
  let arrText = name;
  ctx.beginPath();
  ctx.fillStyle = "rgba(91, 120, 231, 0.95)";
  // ctx.fillRect(0, 0, width, height);
  ctx.arc(r, r, r, 0, 2 * Math.PI);
  // this.drawRoundRect(ctx, 0, 0, width, height, 200);
  ctx.closePath(); //关闭路径
  ctx.fill(); //开始填充
  ctx.font = r - 40 + 'px " bold';
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(arrText, r, r);
  // ctx.strokeStyle = "#0078AA";
  ctx.stroke();
  return canvas;
}
// 创建矩形边框
export function newRect(size, fillColor) {
  let canvas = document.createElement("canvas");
  canvas.width = size[1];
  canvas.height = size[0];
  let ctx = canvas.getContext("2d");
  // 绿色矩形
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#96cefb";
  ctx.rect(0, 0, size[1], size[0]);
  ctx.fillStyle = fillColor || "#000"; //若是给定了值就用给定的值否则给予默认值
  ctx.fill();

  ctx.stroke();
  return canvas;
}
export function getDataList(){
	const url = 'config/dataList.json';
	const data = '';
	return axios.get(url, {
		params: data
	}).then(res => {
		return Promise.resolve(res.data);
	});
}