import axios from "axios"

export function testApi(query) {
  return '-----';
}

export function fetchList(query) {
  return axios({
    url: '/admin/cockpit/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return axios({
    url: '/admin/cockpit/save',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return axios({
    url: '/admin/cockpit/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return axios({
    url: '/admin/cockpit/delete/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return axios({
    url: '/admin/cockpit/update',
    method: 'put',
    data: obj
  })
}
/**
 * 校验驾驶舱名称
 * @param name 
 */
export function checkCockpitName(name) {
  return axios({
    url: '/admin/cockpit/check/' + name,
    method: 'get'
  })
}
/**
 * 获取驾驶舱授权信息
 * @param  id 
 */
export function getAuthorizeList(id) {
  return axios({
    url: '/admin/cockpit/getAuthorize/' + id ,
    method: 'get'
  })
}
/**
 * 保存授权信息
 * @param {*} obj
 */
export function saveAuthorizeList(obj) {
  return axios({
    url: '/admin/cockpit/authorize/save' ,
    method: 'post',
    data: obj
  })
}

/**
 * 获取驾驶舱功能模块信息
 * @param  id 
 */
export function getFuncList(id) {
  return axios({
    url: '/admin/cockpit/getFunc/' + id ,
    method: 'get'
  })
}
/**
 * 保存相关功能模块信息
 * @param {*} obj
 */
export function saveFuncList(obj) {
  return axios({
    url: '/admin/cockpit/func/save' ,
    method: 'post',
    data: obj
  })
}
/**
 * 角色列表
 */
export function roleList () {
  return axios({
    url: '/admin/role/list',
    method: 'get'
  })
}