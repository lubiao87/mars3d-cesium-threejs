const state = {
  collects: [], //初始化一个colects数组, 示例
  MyordersData: {
    id: 1,
    name: ""
  }
};
const getters = {
  renderCollects(state) {
    //承载变化的collects
    return state.collects;
  },
  renderOrdersData(state) {
    //承载变化的ordersData
    return state.MyordersData;
  }
};
const mutations = {
  pushCollects(state, items) {
    //如何变化collects,插入items
    state.collects.push(items);
  },
  ORDERSDATA(state, obj) {
    state.MyordersData = obj;
  }
};
const actions = {
  invokePushItems(context, item) {
    //触发mutations里面的pushCollects ,传入数据形参item 对应到items
    context.commit("pushCollects", item);
  },
  ORDERS_DATA(context, obj) {
    //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit("ORDERSDATA", obj);
  }
};
export default {
  namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
};
