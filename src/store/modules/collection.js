const state = {
  collects: [], //初始化一个colects数组, 示例
  MyordersData: {
    id: 1,
    name: ""
  },
  viewer: null,
  rightComponentName: "",
  projectData: {}
};
const getters = {
  renderCollects(state) {
    //承载变化的collects
    return state.collects;
  },
  renderOrdersData(state) {
    //承载变化的ordersData
    return state.MyordersData;
  },
  renderViewersData(state) {
    //承载变化的ordersData
    return state.viewer;
  },
  renderComponentName(state) {
    //承载变化的ordersData
    return state.rightComponentName;
  },
  renderProjectData(state) {
    //承载变化的ordersData
    return state.projectData;
  },
};
const mutations = {
  pushCollects(state, items) {
    //如何变化collects,插入items
    state.collects.push(items);
  },
  ORDERSDATA(state, obj) {
    state.MyordersData = obj;
  },
  setViewer(state, obj) {
    state.viewer = obj;
  },
  setComponentName(state, obj) {
    state.rightComponentName = obj;
  },
  setProjectData(state, obj) {
    state.projectData = obj;
  },
};
const actions = {
  invokePushItems(context, item) {
    //触发mutations里面的pushCollects ,传入数据形参item 对应到items
    context.commit("pushCollects", item);
  },
  ORDERS_DATA(context, obj) {
    //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit("ORDERSDATA", obj);
  },
  set_viewer(context, obj) {
    //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit("setViewer", obj);
  },
  set_ComponentName(context, obj) {
    //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit("setComponentName", obj);
  },
  set_ProjectData(context, obj) {
    //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit("setProjectData", obj);
  },
};
export default {
  namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
};
