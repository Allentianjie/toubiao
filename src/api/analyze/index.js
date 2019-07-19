import axios from "axios";

export function getLevels(query) {
  return axios({
    url: '/admin/hierarchy/getLevels',
    method: 'get',
    params: query
  })
}