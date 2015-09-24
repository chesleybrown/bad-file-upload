'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var multer  = require('multer');
var exec = require('child_process').exec;
var uploadDir = __dirname + '/uploads/';

// Set upload destination and filenaming convention
var storage = multer.diskStorage({
	destination: uploadDir,
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});

var upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		// Only accept image files
		var acceptable = ['.png', '.jpg', '.gif'];
		for (var key in acceptable) {
			if (file.originalname.match(acceptable[key] + '$')) {
				// Valid extension
				return cb(null, true);
			}
		}
		// not valid extension
		cb(null, false);
	}
});

// Show file upload form
app.get('/', upload.single('image'), function (req, res) {
	res.send('<form action="./upload" method="post" enctype="multipart/form-data">Upload: <input type="file" name="image" /><input type="submit" value="Submit" /></form>');
});

// Post file upload to this path
app.post('/upload', upload.single('image'), function (req, res) {
	if (!req.file) {
		return res.status(400).end();
	}

	// Make a backup of the uploaded file
	exec('cp ' + uploadDir + req.file.originalname + ' ' + __dirname + '/backups/', function () {
		res.status(201).end();
	});
});

module.exports = app;
