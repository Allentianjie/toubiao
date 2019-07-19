import axios from "axios";

export function fetchList(query) {
  return axios({
    url: '/admin/database/log/page',
    method: 'get',
    params: query
  })
}
export function delObj(id) {
  return axios({
    url: '/admin/database/log/' + id,
    method: 'delete'
  })
}
export function lockObj(obj) {
  return axios({
    url: '/admin/database/log/lock',
    method: 'put',
    data: obj
  })
}
