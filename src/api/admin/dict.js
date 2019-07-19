

import axios from 'axios'

export function fetchList (query) {
  return axios({
    url: '/admin/dict/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return axios({
    url: '/admin/dict/',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return axios({
    url: '/admin/dict/' + id,
    method: 'get'
  })
}

export function delObj (row) {
  return axios({
    url: '/admin/dict/' + row.id + '/' + row.type,
    method: 'delete'
  })
}

export function putObj (obj) {
  return axios({
    url: '/admin/dict/',
    method: 'put',
    data: obj
  })
}

export function remote (type) {
  return axios({
    url: '/admin/dict/type/' + type,
    method: 'get'
  })
}
