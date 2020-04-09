export default BSEURL => {
  return {
    logout: BSEURL + "/user/logout", // 退出
    login: BSEURL + "/user/login" // 登录
  };
};
