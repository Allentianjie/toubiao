

import axios from 'axios'

export function fetchDeptTree (query) {
  return axios({
    url: '/admin/dept/user-tree',
    method: 'get',
    params: query
  })
}

export function fetchTree (query) {
  return axios({
    url: '/admin/dept/tree',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return axios({
    url: '/admin/dept/',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return axios({
    url: '/admin/dept/' + id,
    method: 'get'
  })
}

export function getSon (id) {
  return axios({
    url: '/admin/dept/getByPid?parentId=' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return axios({
    url: '/admin/dept/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return axios({
    url: '/admin/dept/',
    method: 'put',
    data: obj
  })
}
