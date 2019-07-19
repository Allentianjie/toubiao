import axios from "axios";

export function fetchList(query) {
  return axios({
    url: '/admin/datamulti/page',
    method: 'get',
    params: query
  })
}

export function addMulti(obj) {
  return axios({
    url: '/admin/datamulti',
    method: 'post',
    data: obj,
    contentType:'application/json'
  })
}

export function getObj(id) {
  return axios({
    url: '/admin/datamulti/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return axios({
    url: '/admin/datamulti/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return axios({
    url: '/admin/datamulti',
    method: 'put',
    data: obj
  })
}
