import axios from "axios"

//列表查询
export function fetchList(query) {
  return axios({
    url: '/admin/analysisReport/page',
    method: 'get',
    params: query
  })
}
//编辑基本信息
export function saveBase(obj) {
  return axios({
    url: '/admin/analysisReport/saveBase',
    method: 'post',
    data: obj
  })
}
//删除
export function delObj(id) {
  return axios({
    url: '/admin/analysisReport/' + id,
    method: 'delete'
  })
}
//报告预览
export function previewObj(id) {
  return axios({
    url: '/admin/analysisReport/preview/' + id,
    method: 'get',
  })
}
