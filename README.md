## 注意事项

> 本地需要安装好mongodb服务,开启服务才能进行运行项目
>  进入server.js 运行 yarn start 运行项目
>  clinet为开发阶段代码 生产阶段代码放在了 server的public里

## 使用到的技术栈

> 前端数据处理/交互/组件化
> 
> -   vue全家桶(React+Redux+Hook) + umi
>     
> -   ES6+Axios+Webpack以及模块化组件化
>     
> -   使用到了antd 框架
>     

> 前后端交互
>     
> -   postman测试后端接口,由mongoose来模拟后端; -
>     - 后端主要做了multer文件上传
>     - 适配history路由,不让其和后端路径冲突
>     
> -   axios封装接口,拦截验证jwt的token
>     

> css预处理器
> 
> stylus
> 
> 性能优化
> 
> -   路由,组件,插件懒加载
>     
> -   purComponent,useMemo,useCallback等组件优化
>     
>     

## 主要功能

 > 1.权限路由+登录角色权限(允许看哪些内容)
 > 2.添加一级分类列表以及二级分类列表,添加商品后可指定
 > 3.添加商品应用到了富文本,图片上传.
