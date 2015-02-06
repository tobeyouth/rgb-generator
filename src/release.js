#!/usr/bin/env node

/**
 * 执行 release 命令
 * 将制定文件夹中的文件 build 到 .build 文件夹中
 * 该命令需要在跟目录下执行 rgb build ${productname}
 */
var gulpRun = require('./gulpRun.js');

function release(params) {
	if (params.length > 0) {
		for (var i = 0,len = params.length;i < len;i++) {
			var action = params[i],
				path = action +'/gulpfile.js',
				task = 'release';
			gulpRun(path,task);
		};
	};
};

module.exports = release;