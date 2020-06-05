/*
应用的启动模块
1. 通过express启动服务器
2. 通过mongoose连接数据库
  说明: 只有当连接上数据库后才去启动服务器
3. 使用中间件
 */
const mongoose = require('mongoose')
const express = require('express')
const app = express() // 产生应用对象
const path = require('path')
const cors =require('cors')
// urlencoded
app.use(cors())//允许跨域
// 解析post的请求↓↓↓↓↓↓
app.use(express.urlencoded({extended: true})) // 解析req.body 请求体参数是: name=tom&pwd=123
app.use(express.json()) // 请求体参数是json结构: {name: tom, pwd: 123}
// 声明使用解析cookie数据的中间件
const cookieParser = require('cookie-parser') 
app.use(cookieParser())
// 声明使用路由器中间件
const indexRouter = require('./routers')//也就是 routers的index
app.use('/', indexRouter)  //读取路由接口模块
const fs = require('fs')

// 声明使用静态中间件 读取客户端的包
// app.use(express.static('public'))
app.use(express.static(path.resolve(__dirname, "./public"))) //
// 必须在路由器中间之后声明使用 ↓↓↓↓   !!!!!!!!!!!!!!!!!!!!!!!!
//用了哈希路由就不用这个 否则使用history路由 一刷新就会出现读取js,css或者其他错误
app.use((req, res) => {
  fs.readFile(__dirname + '/public/index.html', (err, data)=>{
    if(err){
      console.log(err)
      res.send('后台错误')
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      });
      res.end(data)
    }
  })
})

// 通过mongoose连接数据库 reactAntdDemo 
mongoose.connect('mongodb://localhost:27017/reactAntd', {useNewUrlParser: true,useUnifiedTopology:true})
  .then(() => {
    console.log('连接数据库成功!!!')
    // 只有当连接上数据库后才去启动服务器
    app.listen('5000', () => {
      console.log('服务器启动成功, 请访问: http://localhost:5000')
    })
  })
  .catch(error => {
    console.error('连接数据库失败', error)
  })

