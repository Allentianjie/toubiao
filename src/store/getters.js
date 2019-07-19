const getters = {
    sidebar: state => state.origanization.sidebar,
    config: state => state.origanization.config,
    updatedOn: state => state.origanization.updatedOn,
    chart: state => state.origanization.chart,
    people: state => state.origanization.people,
    assignments: state => state.origanization.assignments,
    orgArray: state => state.origanization.orgArray,
    lines: state => state.origanization.lines,
    showSideScreen: state => state.origanization.showSideScreen,
    columnView: state => state.origanization.columnView,
    columnView_noStaff: state => state.origanization.columnView_noStaff,
    managerNameView: state => state.origanization.managerNameView,
    managerPhotoView: state => state.origanization.managerPhotoView,
    activeDepartment: state => state.origanization.activeDepartment,
    moveDepartment: state => state.origanization.moveDepartment,
    editMode: state => state.origanization.editMode,
    showEditMenu: state => state.origanization.showEditMenu,
    showViewMenu: state => state.origanization.showViewMenu,
    selectedPerson: state => state.origanization.selectedPerson,
    onlyShowParents: state => state.origanization.onlyShowParents,
    zoomInstance: state => state.origanization.zoomInstance
};
// console.log(222,getters)
export default getters;
