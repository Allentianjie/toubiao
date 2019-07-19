import axios from "axios"

export function fetchList(query) {
  return axios({
    url: '/admin/function/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return axios({
    url: '/admin/function/save',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return axios({
    url: '/admin/function/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return axios({
    url: '/admin/function/delete/' + id,
    method: 'delete'
  })
}
/**
 * 校验功能模块名称
 * @param {功能模块名称} name 
 */
export function checkFuncName(name) {
  return axios({
    url: '/admin/function/check/' + name,
    method: 'get'
  })
}
/**
 * 编辑
 */
export function putObj(obj) {
  return axios({
    url: '/admin/function/update',
    method: 'put',
    data: obj
  })
}

export function listFunc() {
  return axios({
    url: '/admin/function/list',
    method: 'get',
  })
}
