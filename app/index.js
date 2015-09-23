'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var multer  = require('multer');

// Set upload destination and filenaming convention
var storage = multer.diskStorage({
	destination: __dirname + '/uploads/',
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});

var upload = multer({
	storage: storage
});

// Show file upload form
app.get('/', upload.single('image'), function (req, res) {
	res.send('<form action="./upload" method="post" enctype="multipart/form-data">Upload: <input type="file" name="image" /><input type="submit" value="Submit" /></form>');
});

// Post file upload to this path
app.post('/upload', upload.single('image'), function (req, res) {
	res.status(201).end();
});

module.exports = app;
