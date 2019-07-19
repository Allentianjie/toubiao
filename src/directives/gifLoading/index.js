import gifLoading from './gifLoading'

const install = function(Vue) {
  Vue.directive('gifLoading', gifLoading)
}

if (window.Vue) {
  window['gifLoading'] = gifLoading
  Vue.use(install); // eslint-disable-line
}

gifLoading.install = install
export default gifLoading
