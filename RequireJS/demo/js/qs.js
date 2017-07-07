define(function () {
  function parse (arg) {
    var obj = {}
    var tmpArr = arg.split('&')
    for (var i = 0; i < tmpArr.length; i++) {
      var item = tmpArr[i]
      if (item.indexOf('=') === -1) {
        continue
      }
      var tmp = item.split('=')
      obj[tmp[0]] = tmp[1]
    }
  }
  return {
    parse: parse
  }
})
