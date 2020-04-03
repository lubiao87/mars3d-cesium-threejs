import * as THREE from "three";
import { newCSS3DSprite3 } from "@/utils/public.js";
import { Message } from "element-ui";

export const sportsman = {
  data() {
    return {
      // 页面的列表数据
      visibleDrag: false,
      isCollapse2: "随机巡检",
      itemNumber: 5,
      selectItemData: [
        {
          orientation: "北",
          frameId: "987654",
          type: "列头柜",
          YuZhan: "N",
          capacity: 0,
          posX: "601",
          posY: "1340.3",
          occuRate: "0U/0U",
          size: [600, 300, 2600],
          name: "ZLG07",
          location: "11列01位",
          type_index: "LTG",
          IsParallelX: "N",
          position: {
            x: 5860,
            y: 1300.000000000003,
            z: -13703
          }
        },
        {
          orientation: "西",
          frameId: "441020000000001124023589",
          type: "ODF机架",
          YuZhan: "N",
          capacity: 0,
          posX: "995",
          posY: "260.4",
          occuRate: "0U/0U",
          size: [600, 300, 2600],
          name: "ODF19",
          location: "8列15位",
          type_index: "ODF",
          IsParallelX: "N",
          position: {
            x: 9800,
            y: 1300.0000000000007,
            z: -2903.9999999999995
          }
        },
        {
          orientation: "东",
          frameId: "DDF025",
          type: "DDF机架",
          YuZhan: "N",
          capacity: 0,
          posX: "1373.9",
          posY: "1128.1",
          occuRate: "0U/0U",
          size: [250, 250, 2600],
          name: "DDF025",
          location: "3列12位",
          type_index: "DDF",
          IsParallelX: "N",
          position: {
            x: 13614,
            y: 1300.0000000000025,
            z: -11406
          }
        },
        {
          orientation: "东",
          frameId: "441020000000001124172807",
          type: "ODF机架",
          YuZhan: "N",
          capacity: 0,
          posX: "1535.7",
          posY: "1064.6",
          occuRate: "0U/0U",
          size: [600, 300, 2600],
          name: "ODF407",
          location: "1列6位",
          type_index: "ODF",
          IsParallelX: "N",
          position: {
            x: 15207,
            y: 1300.0000000000025,
            z: -10946
          }
        },
        {
          orientation: "南",
          frameId: "26",
          type: "配电柜",
          YuZhan: "N",
          capacity: 0,
          posX: "1131.2",
          posY: "1604.6",
          occuRate: "0U/0U",
          size: [800, 600, 2050],
          name: "ZPP07",
          location: "99列1位",
          type_index: "ZLPDP",
          IsParallelX: "Y",
          position: {
            x: 10912,
            y: 1025.0000000000036,
            z: -16346
          }
        }
      ],
      selectItemData2: [
        {
          position: {
            x: 5560,
            y: 1300.000000000003,
            z: -1500
          }
        },
        {
          orientation: "北",
          frameId: "987654",
          type: "列头柜",
          YuZhan: "N",
          capacity: 0,
          posX: "601",
          posY: "1340.3",
          occuRate: "0U/0U",
          size: [600, 300, 2600],
          name: "ZLG07",
          location: "11列01位",
          type_index: "LTG",
          IsParallelX: "N",
          position: {
            x: 5560,
            y: 1300.000000000003,
            z: -13703
          }
        },
        {
          position: {
            x: 5560,
            y: 1300.000000000003,
            z: -14603
          }
        },
        {
          position: {
            x: 11000,
            y: 1300.000000000003,
            z: -14603
          }
        },
        {
          position: {
            x: 11000,
            y: 1300.000000000003,
            z: -1400
          }
        },
        {
          position: {
            x: 9600,
            y: 1300.000000000003,
            z: -1400
          }
        },
        {
          orientation: "西",
          frameId: "441020000000001124023589",
          type: "ODF机架",
          YuZhan: "N",
          capacity: 0,
          posX: "995",
          posY: "260.4",
          occuRate: "0U/0U",
          size: [600, 300, 2600],
          name: "ODF19",
          location: "8列15位",
          type_index: "ODF",
          IsParallelX: "N",
          position: {
            x: 9600,
            y: 1300.0000000000007,
            z: -2903.9999999999995
          }
        },
        {
          position: {
            x: 9600,
            y: 1300.000000000003,
            z: -1400
          }
        },
        {
          position: {
            x: 12814,
            y: 1300.000000000003,
            z: -1400
          }
        },
        {
          orientation: "东",
          frameId: "DDF025",
          type: "DDF机架",
          YuZhan: "N",
          capacity: 0,
          posX: "1373.9",
          posY: "1128.1",
          occuRate: "0U/0U",
          size: [250, 250, 2600],
          name: "DDF025",
          location: "3列12位",
          type_index: "DDF",
          IsParallelX: "N",
          position: {
            x: 12814,
            y: 1300.0000000000025,
            z: -11406
          }
        },
        {
          position: {
            x: 12814,
            y: 1300.000000000003,
            z: -1400
          }
        },
        {
          position: {
            x: 14407,
            y: 1300.000000000003,
            z: -1400
          }
        },
        {
          orientation: "东",
          frameId: "441020000000001124172807",
          type: "ODF机架",
          YuZhan: "N",
          capacity: 0,
          posX: "1535.7",
          posY: "1064.6",
          occuRate: "0U/0U",
          size: [600, 300, 2600],
          name: "ODF407",
          location: "1列6位",
          type_index: "ODF",
          IsParallelX: "N",
          position: {
            x: 14407,
            y: 1300.0000000000025,
            z: -10946
          }
        },
        {
          position: {
            x: 14407,
            y: 1300.000000000003,
            z: -14646
          }
        },
        {
          position: {
            x: 10912,
            y: 1300.000000000003,
            z: -14646
          }
        },
        {
          orientation: "南",
          frameId: "26",
          type: "配电柜",
          YuZhan: "N",
          capacity: 0,
          posX: "1131.2",
          posY: "1604.6",
          occuRate: "0U/0U",
          size: [800, 600, 2050],
          name: "ZPP07",
          location: "99列1位",
          type_index: "ZLPDP",
          IsParallelX: "Y",
          position: {
            x: 10912,
            y: 1025.0000000000036,
            z: -16346
          }
        }
      ],
      roomSize: [],
      animationXS: 0,
      animationData: {
        fangxiang: Math.PI / 2, // 面向
        zoubu: false, // 是否走动
        xunjianSJ: 3, // 巡检时间
        XjiaobuCD: 40, // x移动步长
        ZjiaobuCD: -40, // y移动步长
        positionZ: -600,
        positionX: 600,
        wcGS: 0 // 巡检完个数时间
      }
    };
  },
  methods: {
    /*
     * 处理页面序号的变化
     */
    indexMethod(index) {
      if (this.page === 1 || this.page === 0) return index + 1;
      return (this.page - 1) * this.count + index + 1;
    },
    loaderObiect() {
      const that = this;
      this.clock = new THREE.Clock();
      this.loading = true;
      // that.visibleDrag = true;
      this.animationXS = (this.roomSize[0] + this.roomSize[1]) / 60;
      console.log("animationXS", this.animationXS);
      this.removeEventListenerFn();
      if (!that.mixer) {
        this.FBXloader.load("./Assets/model/zouqi.FBX", function(obj) {
          that.loading = false;
          // console.log("人物", obj);
          that.objMan = obj;
          that.scene.add(that.objMan);
          that.objMan.rotation.y = that.animationData.fangxiang;
          that.objMan.position.set(600, 0, -1500);
          // obj作为参数创建一个混合器，解析播放obj及其子对象包含的动画数据
          that.mixer = new THREE.AnimationMixer(obj);
          // 查看动画数据
          // obj.animations[0]：获得剪辑对象clip
          that.AnimationAction = that.mixer.clipAction(obj.animations[0]);
          that.AnimationAction.timeScale = 2; //默认1，可以调节播放速度
          // AnimationAction.loop = THREE.LoopOnce; //不循环播放
          // AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
          // that.AnimationAction.play(); //播放动画
          // that.controls.enabled = false;
          that.playlog();
        });
      } else {
        that.loading = false;
        that.objMan.position.set(600, 0, -1500);
        that.animationData = {
          fangxiang: Math.PI / 2, // 面向
          zoubu: false, // 是否走动
          xunjianSJ: 3, // 巡检时间
          XjiaobuCD: that.animationXS, // x移动步长
          ZjiaobuCD: -that.animationXS, // y移动步长
          positionZ: -600,
          positionX: 600,
          wcGS: 0 // 巡检完个数时间
        };
        that.scene.add(that.objMan);
        that.playlog();
      }
      this.panelShow = false;
      this.setSlectData();
    },
    setSlectData() {
      const r = 200,
        that = this;
      if (this.spriteArr) {
        this.scene.remove(this.spriteArr);
        this.spriteArr = null;
        this.spriteArr = new THREE.Group();
      } else {
        this.spriteArr = new THREE.Group();
      }
      this.selectItemData.forEach((item, index, arr) => {
        let posZ = 0;
        if (item.posZ) {
          posZ = item.posZ;
        }
        const nameNode = this.scene.getObjectByName(item.name);
        let worldPosition = new THREE.Vector3();
        worldPosition = nameNode.getWorldPosition(worldPosition);
        that.selectItemData[index].worldPosition = worldPosition;
        that.newSpriteMaterial(
          newCSS3DSprite3(index + 1, r),
          worldPosition,
          r,
          posZ * 10 + item.size[2] + 200
        );
      });

      // this.spriteArr.rotateX(-Math.PI / 2);
      this.scene.add(this.spriteArr);
      // this.setSlectData2();
      console.log(this.selectItemData);
    },
    // 取消按钮
    dialog(e) {
      console.log("取消巡检", e);
      this.addEventListenerFn();
      this.visibleDrag = false;
      this.controls.enabled = true;
      this.panelShow = true;
      this.scene.remove(this.spriteArr);
    },
    // 确定按钮
    playlog(e) {
      const that = this;
      this.isCollapse = "模块间视图";
      console.log("确定巡检", e);
      this.controls.enabled = false;
      that.visibleDrag = false;
      this.AnimationAction.play();
      that.animationData.fangxiang = Math.PI / 2;
      // that.camera.position.set(that.cameraX, that.cameraY, that.cameraZ);
      this.controls.target = new THREE.Vector3(0, 0, 0);
      this.animationData.zoubu = true;
    },
    newSpriteMaterial(canvas, position, r, h) {
      let spriteMaterial = new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(canvas) //设置精灵纹理贴图
      });
      let sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(2 * r, 2 * r, 1); // 只需要设置x、y两个分量就可以
      // sprite.position.set(position[0], position[1], h);
      sprite.position.set(position.x, position.y + h / 2, position.z);
      this.spriteArr.add(sprite);
    },
    uniq(array) {
      var temp = []; //一个新的临时数组
      for (var i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) == -1) {
          temp.push(array[i]);
        }
      }
      return temp;
    },
    setSlectData2() {
      console.log("this.selectItemData2", this.selectItemData2);
    },
    renderStep() {
      const that = this;
      let xFlog = false,
        yFlog = false;
      if (this.animationData.zoubu) {
        that.AnimationAction.play();
        const ZLength = Math.round(
          that.selectItemData2[that.animationData.wcGS].position.z -
            that.animationData.positionZ
        );
        const xLength = Math.round(
          that.selectItemData2[that.animationData.wcGS].position.x -
            that.animationData.positionX
        );
        let xZhen = Math.abs(xLength),
          zZhen = Math.abs(ZLength);
        if (xLength >= that.animationXS) {
          that.animationData.XjiaobuCD =
            (xZhen / (zZhen + xZhen)) * that.animationXS;
        } else if (xLength <= -that.animationXS) {
          that.animationData.XjiaobuCD =
            (-xZhen / (zZhen + xZhen)) * that.animationXS;
        } else {
          that.animationData.XjiaobuCD = 0;
          xFlog = true;
        }
        // console.log(that.animationData.XjiaobuCD);
        if (ZLength > that.animationXS) {
          that.animationData.ZjiaobuCD =
            (zZhen / (zZhen + xZhen)) * that.animationXS;
        } else if (ZLength < -that.animationXS) {
          that.animationData.ZjiaobuCD =
            (-zZhen / (zZhen + xZhen)) * that.animationXS;
        } else {
          that.animationData.ZjiaobuCD = 0;
          yFlog = true;
        }
        if (xFlog && yFlog) {
          that.animationData.positionX =
            that.selectItemData2[that.animationData.wcGS].position.x;
          that.animationData.positionZ =
            that.selectItemData2[that.animationData.wcGS].position.z;
          if (that.selectItemData2[that.animationData.wcGS].name) {
            that.animationData.fangxiang = Math.PI / 2;
            const nameNode = that.scene.getObjectByName(
              that.selectItemData2[that.animationData.wcGS].name
            );
            that.border = new THREE.BoxHelper(nameNode, "#5b78e7"); //设置边框，这个边框不会旋转
            that.border.position.x = that.animationData.positionX;
            that.border.position.z = that.animationData.positionZ;
            let worldPosition = new THREE.Vector3();
            worldPosition = nameNode.getWorldPosition(worldPosition);
            var vector = worldPosition;
            var position2d = that.getStdVector(vector);
            this.showMenu3 = true;
            this.methName = that.selectItemData2[that.animationData.wcGS].name;
            this.location =
              that.selectItemData2[that.animationData.wcGS].location;
            this.occuRate =
              that.selectItemData2[that.animationData.wcGS].occuRate;
            this.$refs.menu3.style.left = position2d.x - 77 + "px";
            this.$refs.menu3.style.top = position2d.y - 130 + "px";
            that.border.name = "高亮显示柜";
            that.scene.add(that.border); //网格模型添加到场景中
            this.animationData.zoubu = false;
            setTimeout(() => {
              that.animationData.wcGS++;
              if (that.selectItemData2[that.animationData.wcGS]) {
                let jiao = that.getAngle(
                  that.selectItemData2[that.animationData.wcGS - 1].position.x,
                  that.selectItemData2[that.animationData.wcGS - 1].position.z,
                  that.selectItemData2[that.animationData.wcGS].position.x,
                  that.selectItemData2[that.animationData.wcGS].position.z
                );
                that.animationData.fangxiang = jiao;
                that.animationData.zoubu = true;
              } else {
                Message({
                  showClose: true,
                  message: `本次巡检完毕！`,
                  type: "success",
                  duration: 2000
                });
                that.controls.enabled = true;
                that.animationData.zoubu = false;
                that.scene.remove(that.spriteArr);
                that.listGroup.position.set(0, 0, 0);
                that.methNow2.position.set(0, 0, 0);
                that.spriteArr.position.set(0, 0, 0);
                // that.objMan.position.set(600, 0, -600);
                that.camera.position.set(
                  that.cameraX,
                  that.cameraY,
                  that.cameraZ
                );
                that.scene.remove(that.objMan);
                that.addEventListenerFn();
                that.camera.updateProjectionMatrix();
              }
              that.scene.remove(that.border);
              that.showMenu3 = false;
            }, 2000);
          } else {
            that.animationData.wcGS++;
            let jiao = that.getAngle(
              that.selectItemData2[that.animationData.wcGS - 1].position.x,
              that.selectItemData2[that.animationData.wcGS - 1].position.z,
              that.selectItemData2[that.animationData.wcGS].position.x,
              that.selectItemData2[that.animationData.wcGS].position.z
            );
            that.animationData.fangxiang = jiao;
            that.animationData.zoubu = true;
          }
        }
        that.animationData.positionZ += that.animationData.ZjiaobuCD;
        that.animationData.positionX += that.animationData.XjiaobuCD;
        that.listGroup.position.set(
          -that.animationData.positionX,
          0,
          -that.animationData.positionZ
        );
        that.methNow2.position.set(
          -that.animationData.positionX,
          0,
          -that.animationData.positionZ
        );
        that.spriteArr.position.set(
          -that.animationData.positionX,
          0,
          -that.animationData.positionZ
        );
        that.objMan.position.set(0, 0, 0);
        that.camera.position.set(
          -that.animationData.positionX + that.animationData.positionX,
          10000,
          -that.animationData.positionZ + that.animationData.positionZ + 1000
        );
        that.camera.lookAt(that.objMan.position);
        that.camera.updateProjectionMatrix();
      } else {
        if (that.AnimationAction) {
          that.AnimationAction.stop();
        }
      }
      if (that.objMan) {
        that.objMan.rotation.y = that.animationData.fangxiang;
      }
    },
    // (x0, y0, x1, y1)
    getAngle(x0, y0, x1, y1) {
      let x = x1 - x0;
      let y = -y1 - -y0;
      console.log("x", "y", x, y);
      let res = 0;
      if (x === 0) {
        if (y > 0) {
          res = Math.PI;
        } else {
          res = 0;
        }
      } else if (x > 0) {
        res = Math.PI / 2;
      } else {
        res = (Math.PI / 2) * 3;
      }
      return res;
    },
    getStdVector(worldVector) {
      //世界坐标转标准设备坐标
      const stdVector = worldVector.project(this.camera);
      const a = window.innerWidth / 2;
      const b = window.innerHeight / 2;
      //标准设备坐标转屏幕坐标x,y
      const x = Math.round(stdVector.x * a + a);
      const y = Math.round(-stdVector.y * b + b);
      return {
        x: x,
        y: y
      };
    }
  }
};
