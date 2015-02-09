#!/usr/bin/env node
/**
 * CDN Server主要功能
 * 提供start,stop,reload功能
 */

var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	pwd = process.cwd(),
	types = {
		"css": "text/css",
		"js": "application/x-javascript",
		"html": "text/html",
		"png": "image/png",
		"jpg": "image/jpg",
		"gif": "image/gif"
	};

function Server(config) {
	this.conf = {};
	this.conf.host = config.host ? config.host : 'cdnrgbserver.com';
	this.conf.port = config.port ? config.port : 8064;
	this._socket = null;
};

Server.prototype.start = function start() {
	var conf = this.conf,
		socked;
	this._socket = http.createServer(function(req,res) {
		var path = pwd + req.url,
			type = path.split('.').pop(),
			contentType = types[type] ? types[type] : "text/plain";

		if (fs.existsSync(path)) {
			var content = fs.readFile(path,function (err,data) {
				if (err) {
					res.writeHead(200, {'Content-Type': contentType});
  					res.end('Read file error');
  					console.log(err);
				};

				res.writeHead(200, {'Content-Type': contentType});
				res.end(data.toString());
			});
		} else {
			res.writeHead(200, {'Content-Type': contentType});
  			res.end('have no this file');
		};
	});

	this._socket.on('connection',function () {
		console.log('connection');
	});

	this._socket.on('error',function (err) {
		console.log(err);
	});

	this._socket.listen(conf.port,conf.host);

	console.log('Server start success');
	console.log('Your local CDN url is:' + conf.host + ':' + conf.port);
	
};
Server.prototype.stop = function stop() {
	if (this._socket) {
    	this._socket.close();
    	this._socket = null;
  	};
};
Server.prototype.reload = function reload() {
	this.stop();
	this.start();
};

module.exports = Server;