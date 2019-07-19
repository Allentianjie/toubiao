import axios from "axios";

export function getStructure(query) {
  return axios({
    url: '/admin/datapanel/structure',
    method: 'get',
    responseType: 'blob',
    params: query
  })
}