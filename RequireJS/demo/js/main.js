// require.config({
//   paths: {
//     jquery: '../node_modules/jquery/dist/jquery',
//     lodash: '../node_modules/lodash/lodash'
//   }
// })
// require.config({
//   baseUrl: './node_modules',
//   paths: {
//     // 注意，这里的.是相对于该文件的所在路径的
//     jquery: './jquery/dist/jquery',
//     lodash: './lodash/lodash'
//   }
// })
// require(['./node_modules/jquery/dist/jquery.js', './node_modules/lodash/lodash.js'], function ($, _) {
//   // 这里就可以使用$和_，他们分别是jquery和lodash提供的对象
//   // 这里的代码只有在jquery,和lodash都加载完成之后才会执行
// })
require(['./js/calc.js'], function (calc) {
  window.alert(calc.add(1, 1))
})
// require(['jquery', 'lodash'], function ($, _) {
//   // 这里就可以使用$和_，他们分别是jquery和lodash提供的对象
//   // 这里的代码只有在jquery,和lodash都加载完成之后才会执行
//   console.log(_)
// })
