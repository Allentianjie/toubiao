
import axios from "axios";

export function fetchList(query) {
  return axios({
    url: '/admin/database/page',
    method: 'get',
    params: query
  })
}

export function fetchValueList(query) {
  return axios({
    url: '/admin/database/valuePage',
    method: 'get',
    params: query
  })
}
export function fetchSub(id) {
  return axios({
    url: '/admin/database/sub/' + id,
    method: 'get'
  })
}
export function sumData(id) {
  return axios({
    url: '/admin/database/dimension/autoSumByIdentId?identId='+id,
    method: 'get'
  })
}
export function fetchValueLists(query) {
  return axios({
    url: '/admin/database/datas',
    method: 'get',
    params: query
  })
}
export function addObj(obj) {
  return axios({
    url: '/admin/database',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return axios({
    url: '/admin/database/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return axios({
    url: '/admin/database/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return axios({
    url: '/admin/database',
    method: 'put',
    data: obj
  })
}
export function getTree(layType) {
  return axios({
    url: '/admin/database/tree/'+layType,
    method: 'get'
  })
}
export function lazyloadDataBase(obj) {
  return axios({
    url: '/admin/database/lazyload?layType='+obj.layType + '&parentId='+ obj.parentId,
    method: 'get'
  })
}
export function checkDataName (dataName,dataId) {
  return axios({
    url: '/admin/database/checkDataName?dataName=' + dataName + '&dataId='+dataId,
    method: 'get'
  })
}


