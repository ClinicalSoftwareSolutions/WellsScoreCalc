#!/usr/bin/env node

/*!
 * Update config.json with some build time vars
 */

var fs = require('fs');
var path = require("path");
var exec = require('child_process').exec

var cfgPath = path.join(__dirname, "../app/config.json");


gitrevision = { 
	_command : function (cmd, cb) {
  		exec(cmd, { cwd: __dirname }, function (err, stdout, stderr) {
    	cb(stdout.split('\n').join(''))
  		})
	}

    ,short : function (cb) { 
      this._command('git rev-parse --short HEAD', cb)
    }

	 ,long : function (cb) { 
      this._command('git rev-parse HEAD', cb)
    }

  	,branch : function (cb) { 
      this._command('git rev-parse --abbrev-ref HEAD', cb)
    }

  	,tag : function (cb) { 
      this._command('git describe --always --tag --abbrev=0', cb)
    }

  	,log : function (cb) { 
      this._command('git log --no-color --pretty=format:\'[ "%H", "%s", "%cr", "%an" ],\' --abbrev-commit', function (str) {
        str = str.substr(0, str.length-1)
        cb(JSON.parse('[' + str + ']'))
      })
    }
}

if ( fs.existsSync(cfgPath) ) {
	fs.readFile(cfgPath, function(err, data) {
		var config = JSON.parse( data );

		var now = new Date();
		config.global.buildDate = now.toUTCString();

		gitrevision.short(function (gitrev) {
  			console.log('Current git rev tag: ', gitrev);

  			config.global.buildRev = gitrev;
		
			var newConfig = JSON.stringify( config, null, 4);

			fs.writeFile(cfgPath, newConfig, function (err) {
			  if (err) throw err;
			  console.log('New config.json saved.');
			}); 
		});

	});
}
else {
	console.log("The config.json file does not exist.\nLooked in " + cfgPath);
}