/*应用程序的启动入口文件*/

//加载express模块
var express = require('express');
//加载模板模块
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');


//创建app应用 => NodeJS Http.createServer();
var app = express();

//设置静态文件托管
//当用户访问的Url1️⃣以/public开始  直接返回这个目录下相应的文件
app.use('/public',express.static(__dirname + '/public'));

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数表示模板引擎的名称，同时也是模板文件的后缀， 第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile)

//设置模板文件存放的目录， 第一个参数必须是views, 第二个参数是目录
app.set('views','./views');

//注册所使用的模板引擎 第一个参数必须是view engine,第二个参数和 app.engine 这个方法中定义的模板引擎的名称（第一个参数）是一样的；
app.set('view engine','html');

//在开发过程中需要取消模板缓存
swig.setDefaults({cache:false})

//根据不同的功能划分模块 分模块进行开发
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));



//首页
// app.get('/',function (req,res,next) {
// 	//res.send('<h1>欢迎光临我的博客</ht>')
//
// 	//读取views目录下的指定文件 ，解析并返回客户端
// 	//第一个参数：表示模板的文件 相对路径 views/index.html
// 	//第二个参数：传递给模板使用的数据
// 	res.render('index');
// })

// app.get('/main.css',function(req,res,next) {
// 	res.setHeader('content-type','text/css');
// 	res.send("body {background:red}")
// })


//监听http请求
app.listen(8081);

// 用户发送http请求 => URL => 解析路由 => 找到匹配的规则 => 执行指定的绑定函数（静态、动态），返回对应的内容至用户

//public -> 静态 =>直接读取指定目录下得文件，返回给用户
// => 动态 -> 处理业务逻辑，加载模板 解析模板 => 返回数据给用户
