// 这里的.是相对于当前文件所在路径
define(['./qs.js'], function () {
  function add (x, y) {
    return x + y
  }
  function sub (x, y) {
    return x - y
  }
  return {
    add: add,
    sub: sub
  }
})
