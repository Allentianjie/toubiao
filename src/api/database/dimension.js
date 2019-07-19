
import axios from "axios";

export function fetchList(query) {
  return axios({
    url: '/admin/database/dimension/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return axios({
    url: '/admin/database/dimension',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return axios({
    url: '/dadmin/database/dimension/' + id,
    method: 'get'
  })
}

export function getDims(dataId) {
  return axios({
    url: '/admin/database/dimension/getDims/' + dataId,
    method: 'get'
  })
}

export function delObj(id) {
  return axios({
    url: '/admin/database/dimension/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return axios({
    url: '/admin/database/dimension',
    method: 'put',
    data: obj
  })
}

export function getDimType(id) {
  return axios({
    url: '/admin/database/dimension/getDimType/' + id,
    method: 'get'
  })
}
