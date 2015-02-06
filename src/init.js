#!/usr/bin/env node

/**
 * 初始化运行环境，会有以下几个步骤：
 * 1. 新建package.json
 * 2. 新建一个空的gulpfile.js
 * 3. 新建 .build 和 dist 目录作为测试和发布目录
 * 4. 下载依赖包
 * 5. 生成脚本文件
 */

var fs = require("fs"),
	spawn = require("child_process").spawn,
	pwd = process.cwd(),
	template = fs.readFileSync(__dirname + '/template.js'),
	pkg = {
		"name": "static",
		"author": "fe",
		"version": "0.0.1",
		"dependencies": {
	        "gulp": "~3.8.8",
	        "gulp-uglify": "~1.0.1",
	        "del": "~0.1.3",
	        "gulp-gzip": "~0.0.8",  
	        "gulp-stylus": "~1.3.3",
	        "gulp-react": "~1.0.0",
	        "gulp-browserify": "~0.5.0",
	        "gulp-base64": "~0.1.2",
	        "gulp-rename": "~1.2.0",
	        "http-browserify": "~1.7.0",
	        "reactify": "~0.17.1",
	        "react": "~0.12.2",
	        "flux": "~2.0.1",
	        "object-assign": "~2.0.0"
	    },
	}

function init (dir) {
	var dir = dir.length > 0 ? dir[0] : pwd + "/static",
		buildDir = pwd + "/.build",
		distDir = pwd + "/dist";

	fs.mkdirSync(dir);
	fs.mkdirSync(buildDir);
	fs.mkdirSync(distDir);
	mkgulpfile();
	mkpkg();
};

function mkpkg() {
	var path = pwd + "/package.json",
		data = JSON.stringify(pkg);
	fs.writeFile(path,data,'utf8',function () {
		console.log('Init end!');
		console.log('Please use "npm install" to insall something your need');
		console.log('After install,enter "rgb generator ${productName}" to make your product');
		console.log('And enjoy it!');
	});
};

function mkgulpfile() {
	var path = "gulpfile.js",
		data = "";
	fs.writeFile(path,template,'utf8');
};

module.exports = init;