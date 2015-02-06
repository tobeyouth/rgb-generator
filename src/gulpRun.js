#!/usr/bin/env node

/**
 * 执行gulp命令的脚本
 * 可以传入 build , release 等命令，驱动gulpfile中定义的task
 */

var spawn = require('child_process').spawn,
	colorful = require('colorful').colorful();

function gulpRun (path,task) {
	var task = task ? task : 'default',
		running = spawn('gulp',['--gulpfile',path,task]);

	running.stdout.on('data',function (data) {
		console.log(data.toString().to.italic.blue.color);
	});
	running.stderr.on('error',function (err){
		console.log('Get error'.to.italic.red.color);
		console.log(err.toString().to.italic.red.color);
	});
};

module.exports = gulpRun;