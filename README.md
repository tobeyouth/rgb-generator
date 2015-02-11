#introduction

*rbg-generator*是基于[react](http://facebook.github.io/react/),[browserify](http://browserify.org)和[gulp](http://gulpjs.com)的前端脚手架。力争成为一个简单易用的generator。
具备了一键安装的依赖包和一个简单的`gulpfile`的功能。
可以快速的上手使用。

*rgb-generator* is a tool for quickly make a product that base on [react](http://facebook.github.io/react/),[browserify](http://browserify.org) and [gulp](http://gulpjs.com).

#install
    
    npm install -g rgb-genterator

#useage

1. 在项目根目录执行:`rgb init`，创建开发目录
2. 安装依赖包:`npm install -g`
3. 新建项目:`rgb generator`之后，根据提示补充项目信息即可
4. build: 在根目录执行`rgb build {项目名}`，编译项目中的文件到`.build`文件夹中。
5. release: 在根目录执行`rgb release {项目名}`，编译`.build`中的文件到`dist`目录，也就是发布目录。
6. `rgb server config`:配置本地静态资源服务。会在根目录下新建一个`serverConf.json`，这里面配置了host和port。
7. `rgb server start`:启动本地静态资源服务。

1. In your root dir (like `/static`),`rgb init`.It will make some dir for your.
2. Install some package:`npm install -g`
3. Use `rgb generator` to make a product.It will ask your some question to make your product's package.json.
4. Use `rgb build {productName}` in your root dir.It will compile your {product} to `.build` dir.
5. Use `rgb release {productName}` in your root dir.It will compile your `.build/{productName}` to `dist` dir.
6. Use `rgb server config`.It will ask your some question to make a `serverConf.json`.
7. Use `rgb server star/stop/reload`.It will control your static server.

#todo
1. 项目自定义gulp插件
