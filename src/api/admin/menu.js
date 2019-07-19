

import axios from 'axios'
import Vue from "vue";

export function GetMenu () {
  return axios({
    url: '/admin/menu',
    method: 'get'
  })
}

export function fetchMenuTree (query) {
  return axios({
    url: '/admin/menu/munuTree',
    method: 'get',
    params: query
  })
}
export function fetchTree (query) {
  return axios({
    url: '/admin/menu/tree',
    method: 'get',
    params: query
  })
}
export function fetchRoot () {
  return axios({
    url: '/admin/menu/root',
    method: 'get'
  })
}
export function fetchSub (id) {
  return axios({
    url: '/admin/menu/sub/' + id,
    method: 'get'
  })
}
export function addObj (obj) {
  return axios({
    url: '/admin/menu',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return axios({
    url: '/admin/menu/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return axios({
    url: '/admin/menu/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return axios({
    url: '/admin/menu',
    method: 'put',
    data: obj
  })
}
