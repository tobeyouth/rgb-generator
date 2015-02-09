#!/usr/bin/env node

/**
 * 本地起静态服务
 * 默认端口8064
 */

var fs = require('fs'),
	util = require('util'),
	readline = require('readline'),
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	}),
	pwd = process.cwd(),
	cli = ['start','stop','config'];

// helper
var result = {};
function ask(questions,callback) {
	var qs = [].concat(questions),
		item = qs.shift(),
		question = "Please enter " + item + ": ";

	rl.question(question,function(answer) {
		result[item] = answer;
		if (qs.length > 0) {
			ask(qs,callback);
		} else {
			callback(result);
			rl.close();
		};
	});
};

/**
 * 配置serverConf
 * @return {[type]} [description]
 */
function serverConfig() {
	var server = this,
		conf = {
			"port": 8064,
			"host": "cdnrgbserver.me"
		},
		keys = Object.keys(conf);

	ask(keys,function (result) {
		for (key in result) {
			if (result[key]) {
				conf[key] = result[key];
			};
		};

		fs.writeFile('serverConf.json',JSON.stringify(conf),function(err) {
			if (err) {
				console.log('Config wrong');
				throw new Error(err);
			} else {
				console.log('Config success');
				console.log('Your local CDN path is:' + conf.host + ':' + conf.port);
			};
		});
	});
};

/**
 * 创建Server
 * @param  {object} conf server的配置
 * @return {server}      server对象
 */
function createServer(conf) {
	var Server = require('./server-core.js'),
		server = new Server(conf);

	global.rgbServer = server;
};


module.exports = function(action) {

	if (action === "config") {
		serverConfig();
	} else if (global.rgbServer) {
		if (cli.indexOf(action) > -1 && global.rgbServer[action]) {
			global.rgbServer[action].call(global.rgbServer);
		};
	} else if (fs.existsSync(pwd+'/'+'serverConf.json')){
		var conf = fs.readFileSync(pwd+'/'+'serverConf.json');
		createServer(JSON.parse(conf));
		global.rgbServer[action].call(global.rgbServer);
	} else {
		console.log('No servering');
		console.log('Please use rgb server config to config your server');
		process.exit();
	};
};