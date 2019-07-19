
import axios from "axios";

export function getTask(id) {
  return axios({
    url: '/admin/task/' + id,
    method: 'get'
  })
}


export function writeTask(obj,taskId) {
  return axios({
    url: '/admin/task/write/'+taskId,
    method: 'post',
    data: obj
  })
}
