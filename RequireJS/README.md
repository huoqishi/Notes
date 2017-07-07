# RequireJS
  ![](images/2017-07-07-06-45-13.png)
  ```
    require	英[rɪˈkwaɪə(r)]  
    美[rɪˈkwaɪr]  
    vt.	需要; 要求; 想要; 命令;  
    vi.	要求，规定;  
    [例句]If you require further information, you should consult the registrar  
    如果需要进一步了解信息，请咨询教务主任。  
    [其他]	第三人称单数：requires 现在分词：requiring 过去式：required 过去分词：required 
  ```
## RequireJS 是什么?

  RequireJS 是一个JavaScript模块加载器。使用RequireJS加载模块化脚本将提高代码的加载速度和质量。  
  > 什么是模块?   
  > 模块就是实现特定功能的一组方法。  

## RequireJS 有什么作用?
  - 1. 实现js文件的异步加载，避免网页失去响应.
  - 2. 管理模块之间的依赖性，便于代码的编写和维护.
  > 最初开发网站时，写JavaScript代码只需要写在一个文件中就可以了，页面中也只需要加载这一个文件。  
  > 渐渐地的，项目功能越来越多，写的JavaScript也越来越多，都写在一个文件中就不方便了，需要写成多个来文件, 页面就需要引入多个文件，并且要按照特定的顺序引入!如下:  
  ```html
　　 <script src="a.js"></script>
　　 <script src="b.js"></script>
　　 <script src="c.js"></script>
　　 <script src="d.js"></script>
　　 <script src="e.js"></script>
　　 <script src="f.js"></script>
  ```
  这样的代码，看起来好好像没有什么问题, 其实是有很大缺点的: 
  1. 这些js在加载的时候，浏览器会停止网页的渲染，加载文件越多，网页失去响应的时间就会越长.
  2. 由于js文件之间存在依赖关系，因此必须严格保证加载顺序 (比如上例的a.js要在b.js的前面) ,当依赖关系很复杂的时候，代码的编写和维护都会变得困难。
  
## 兼容性

| 浏览器         | 是否兼容 |
|-------------|------|
| IE 6+       | 兼容 ✔ |
| Firefox 2+  | 兼容 ✔ |
| Safari 3.2+ | 兼容 ✔ |
| Chrome 3+   | 兼容 ✔ |
| Opera 10+   | 兼容 ✔ |

## 如何使用 RequireJS？
### 加载RequireJS?
第一步肯定是要去官网网站[下载](http://requirejs.org/docs/download.html)它了  
或者通过npm来下载也可以: `npm install requirejs`  
然后在页面引入它就可以了  

```html
  <script src="./node_modules/requirejs/require.js"></script>
```
那么这是引入的RequireJS,如何加载其他的js文件呢? 如下:  
```html
  <script src="./node_modules/requirejs/require.js" data-main="./js/main"></script>
```
> data-main属性的作用是，指定网页程序的主模块。
在上例中，就是js目录下面的main.js,只不过这里我省略了文件的后缀名(RequireJS会自动帮我们补上),这个文件会被require.js加载

### RequireJS的主模块代码的写法
上面的的main.js文件，称之为`主模块`,意思就是说代码从这里开始执行。  
如果主模块里的代码依赖于其他模块，需要使用RequireJS提供的`require`函数  

main.js代码: 
```js
  require([模块a,模块b,模块c], function (模块a,模块b,模块c) {
    // 主模块代码
  })
```
这里的`require`函数接收两个参数:  
第一个参数是个数组，数组中的元素表示所依赖的模块，上面的[模块a,模块b,模块c], 表示主模块依赖于这三个模块。RequireJS会帮助我们加载这三个模块。  
第二个参数是一个回调函数, 所依赖的模块加载完成之后，RequireJS会调用这个回调函数, 并且加载的模块会以参数的形式传入该函数, 这样我们就可以在函数内部使用这些模块了  
RequireJS会异步的加载 模块a、模块b、模块c，浏览器不会失去响应，并且上面的回调函数只有在这些模块加载完成之后才会执行。

假如我们的主模块依赖于jquery的话: main.js写法如下: 

```js
  require(['./node_modules/jquery/dist/jquery.js', './node_modules/lodash/lodash.js'], function ($, _) {
    // 这里就可以使用$和_，他们分别是jquery和lodash提供的对象
    // 这里的代码只有在jquery,和lodash都加载完成之后才会执行
  })
```
*不过需要注意的是上面路径开头的 . 是相对于引入RequireJS的html文件所在路径的*

### RequireJS中模块的写法
  > RequireJS中除了主模块之外，其他模块需要使用define()函数来定义。  
  > 如果一个模块不依赖于其他模块就直接给define函数传入一个回调函数  
  ```js
    define(function () {
      // 当这个模块被加载之后，这个回调函数就会执行
    })
  ```
  假设有个calc.js这个模块，这个模块提供加减法功能代码按如下写法:  
  ```js
    define(function () {
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
  ```
  main.js 写法如下:  
  ```js
    // 注意: 这里路径，以.开头时，是相对于引入RequireJS的html文件所在路径的
    require(['./js/calc.js'], function (calc) {
      window.alert(calc.add(1, 1))
    })
  ```
  如是这个cacl.js模块还依赖于其他模块的话，define方法的第一个参数必须是一个数组，用于表示该模块所依赖的模块。  
  假设这个依赖于一个qs.js模块,qs.js的代码如下:  
  ```js
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
  ```
  calc.js模块中的代码需要这么写  
  ```js
    define(['./js/qs.js'], function (qs) {
      console.log(qs.parse('foo=helo&bar=word'))
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
  ```
  只有当qs.js加载完成之后，define的回调函数才会执行，且函数的参数就是qs.js中return的对象

### 配置别名(配置模块id)
  > 在引入模块对应的js文件时，有时路径会比较长，RequireJS允许我们通过`require.config`方法来给引用的路径配置一个别名，如下:  
  ```js
    require.config({
      path: {
        // 注意，这里的.是相对于该文件的所在路径的
        // 注意, 配置别名时，省略后缀名
        jquery: '../node_modules/jquery/dist/jquery', 
        lodash: '../node_modules/lodash/lodash'
      }
    })
  ```
  配置好之后，引用jquery或者lodash里，只需要在require或者define函数中写jquery和lodash的别名就可以了

### 配置基础路径(baseUrl)
  > 即使是配置了别名, 在别名对应的路径中，这些路径是相对于`require.config`方法所在文件的路径(称之为基础路径), 这个基础路径是可以通过bashUrl属性来修改的, 修改下main.js:  
  ```js
    require.config({}
      // 这里的. 是相对于引入RequireJS的html所在路径
      baseUrl: './node_modules',
      paths: {
        // 注意，有了basheUrl之后，此时这里的.是相对于baseUrl指定的路径
        jquery: './jquery/dist/jquery',
        lodash: './lodash/lodash'
      }
    })
  ```
### 加载非规范的模块
  > 使用require.js加载的模块，必须是用define()函数定义的模块, 但是实际有一些模块不是使用define函数定义的，那么是否可以使用RequireJS加载呢? 可以，但是要在`require.config` 函数中做一些配置, 比如说我们想引入bootstrap.js这个模块和underscore.js这个模块, main.js中代码如下: 
  ```js
    require.config({
      baseUrl: './node_modules',
      paths: {
        jquery: './jquery/dist/jquery',
        bootstrap: './bootstrap/dist/js/bootstrap',
        underscore: './underscore/underscore'
      },
      shim: {
        // 这个名字和别名保持一致
        bootstrap: {
          // 表明bootstrap依赖于jquery
          // 这里的'jquery',也是配置在paths中的别名
          deps: ['jquery']
        },
        underscore: {
          // 这里的 '_' 指的是underscore.js中的全局变量的变量名.
          // 配置之后，其他模块中引入这个 underscore时， 回调函数中传入的函数就是这个underscore中的全局变量 _
          exports: '_'
        }
      }
    })
  ```

## 模块化规范
先想一想，为什么模块很重要？
因为有了模块，我们就可以更方便地使用别人的代码，想要什么功能，就加载什么模块。
但是，这样做有一个前提，那就是大家必须以同样的方式编写模块，否则你有你的写法，我有我的写法，岂不是乱了套！

### AMD规范是什么?
AMD是"Asynchronous Module Definition"的缩写  
意思就是"异步模块定义"
