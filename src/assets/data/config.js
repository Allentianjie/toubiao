export const CONFIG = {
  title: {
    color: '#05668d',
    text: '组织架构图'
  },
  //provide text to display when clicked on the (i) button (you can use HTML). Leave empty if not needed
  information: '如果你发现错误请联系管理员',
  photoUrl: {
    prefix: 'photos/',
    suffix: '.png'
  },
  linkUrl: {
    prefix: 'photos/',
    suffix: '.png'
  },
  startView: {
    photos: true,
    names: true,
    columnview: true,
    staffColumnview: false
  },
  enableScreenCapture: true,
  levelColors: ['#0c058d', '#05668d', '#8d6e05', '#8d2305', '#cfb303'],
  editCommand: "_edit", //the command to type in the searchbar to switch to edit mode
  dataFields: [
    { name: "Location", type: "text" }
  ]
}
