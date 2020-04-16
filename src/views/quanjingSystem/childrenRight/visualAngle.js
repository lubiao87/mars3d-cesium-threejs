// import * as viewer from "@/map/app";
export function expImage(viewer, fn) {
  return viewer.mars.expImage({
    download: false,
    calback: function (base64, size) {//回调
      fn(base64);
    }
  });
}
