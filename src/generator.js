#!/usr/bin/env node

/**
 * 脚手架工具
 * 创建开发目录
 */
var readline = require('readline'),
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	}),
	fs = require('fs'),
	template = fs.readFileSync(__dirname + '/template.js');

function make(pkg) {
	// 创建开发目录
	mkdir(pkg['name']);
	// 创建package.json
	mkpkg(pkg);
	// 创建gulpfile.js
	mkgulp(pkg);
};

function mkdir(name) {
	if (!name) {
		console.log("Please write a name");
		return false;
	} else if (fs.existsSync(name)) {
		console.log("Product has exists!");
		return false;
	} else {
		// flus tree
		fs.mkdirSync(name);
		fs.mkdirSync(name+"/demo");
		fs.mkdirSync(name+"/styl");
		fs.mkdirSync(name+"/store");
		fs.mkdirSync(name+"/action");
		fs.mkdirSync(name+"/dispathcer");
		fs.mkdirSync(name+"/action");
		fs.mkdirSync(name+"/constants");
		fs.mkdirSync(name+"/components");
	};
};

function mkpkg(pkg) {
	var path = pkg.name + "/package.json",
		data = JSON.stringify(pkg);

	fs.writeFile(path,data,'utf8');
};

function mkgulp(pkg) {
	var path = pkg.name + "/gulpfile.js",
		data = "";

	fs.writeFile(path,template,'utf8');
};

function generator() {
	var pkg = {
		"name":null,
		"author": null,
		"version": "0.0.1",
		"email": "",
		"keywords":[],
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
	        "react": "~0.12.2"
		},
		"browserify": {
	        "transform": [
	            ["reactify", {"es6": true}]
	        ]
	    }
	},
	questions = Object.keys(pkg);

	ask(questions,function(result) {
		for (key in result) {
			if (result[key]) {
				pkg[key] = result[key];
			}
		};
		make(pkg);
	});
};

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

module.exports = generator;