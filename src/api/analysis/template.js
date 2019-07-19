import axios from "axios"

export function fetchList(query) {
  return axios({
    url: '/admin/analysisrTemplate/page',
    method: 'get',
    params: query
  })
}
//新增基本信息
export function addBase(obj) {
  return axios({
    url: '/admin/analysisrTemplate/saveBase',
    method: 'post',
    data: obj
  })
}
//删除
export function delObj(id) {
  return axios({
    url: '/admin/analysisrTemplate/' + id,
    method: 'delete'
  })
}
