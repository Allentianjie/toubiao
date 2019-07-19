const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setLogMsg (state, logData) {
    state.userInfo = logData
  },
  setChooseDept(state,deptData){//部门tree数据
    state.chooseDept = deptData
  },
  setChooseDataScopeDept(state,deptData){//管辖部门部门tree数据
    state.chooseDataScopeDept = deptData
  },
  setUserPermissions(state,permissions){
    const list = {}
    for (let i = 0; i < permissions.length; i++) {
      list[permissions[i]] = true
    }
    state.permissions = list
  },
  setmenuUrl(state, menuUrl) {
    state.menuUrl = menuUrl;
  },
  setUserMenu(state, usermenus) {
    state.userMenus = usermenus;
  },
  setActiveIndex(state, activeIndex) {
    state.activeIndex = activeIndex;
  },
  // 菜单高亮值
  setActives(state, actives) {
    state.actives = actives;
  },
  // MenuType 去判断要跳转到的 菜单
  setMenuType(state, MenuType) {
    state.MenuType = MenuType;
  },

  setActiveTag(state, data) {
    state.activeTags = data;
  },
};
export default mutations
