#!/usr/bin/env node

var srcPath = "../src/";
    fs = require('fs'),
    cli = require(srcPath+'cli.js').cli,
    args = process.argv.slice(2),
    action = args.shift(),
    params = args;

if (cli.indexOf(action) >= 0) {
    var command = require(srcPath+action+'.js');
    command.apply(null,params);
} else {
    console.log("Bad command!");
};




