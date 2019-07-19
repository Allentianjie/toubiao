import lodingImage from '@/assets/images/timg1.gif'

export default {
  bind: (el, binding) => {
    const tempDiv = document.createElement('div')
    tempDiv.className = 'gif-loading'
    // const round = document.createElement('img')
    // round.className = 'loading-img'
    // round.src = lodingImage
    // tempDiv.appendChild(round)
    el.loadingElement = tempDiv
    const curStyle = window.getComputedStyle(el)
    const position = curStyle.position
    if (position === 'absolute' || position === 'relative') {
      el.style.position = position
    } else {
      el.style.position = 'relative'
    }
    Object.assign(el.loadingElement.style, {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#ffffff",
      backgroundImage: `url(${lodingImage})`,
      backgroundRepeat:"no-repeat",
      backgroundPosition:"center center",
    })
    if (binding.value) {
      el.appendChild(tempDiv)
    }
  },
  update: (el, binding) => {
    if (binding.value) {
      if (el.loadingElement.parentNode === null) {
        el.appendChild(el.loadingElement)
      }
    } else {
      if (el === el.loadingElement.parentNode) {
        el.removeChild(el.loadingElement)
      }
    }
  },
  unbind: (el) => {
    if (el.loadingElement.parentNode === el) {
      el.removeChild(el.loadingElement)
    }
    el.loadingElement = null
  }
}
