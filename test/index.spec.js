'use strict';

var expect = require('chai').expect;
var requester = require('supertest');
var app = require('../app/index');
var fs = require('fs');

describe('File Upload', function () {
	var request;
	var response;

	describe('when uploading a file', function () {
		describe('and it is a TXT file', function () {
			var uploadedFile = __dirname + '/../app/uploads/text.txt';
			var backedUpFile = __dirname + '/../app/backups/text.txt';

			// clear any uploaded files leftover
			beforeEach(function () {
				try {
					fs.unlinkSync(uploadedFile);
					fs.unlinkSync(backedUpFile);
				}
				catch (err) {
				}
			});

			beforeEach(function (done) {
				request = requester(app)
					.post('/upload')
					.attach('image', __dirname + '/fixtures/text.txt')
					.end(function (err, res) {
						if (err) return done(err);
						response = res;
						done();
					})
				;
			});

			it('should respond with success', function () {
				expect(response.status).to.equal(400);
			});
			it('should NOT write file to disk', function () {
				var check = function () {
					fs.accessSync(uploadedFile);
				};
				expect(check).to.throw();
			});
			it('should NOT backup file to disk', function () {
				var check = function () {
					fs.accessSync(uploadedFile);
				};
				expect(check).to.throw();
			});
		});

		describe('and it is a PNG', function () {
			var uploadedFile = __dirname + '/../app/uploads/screenshot.png';
			var backedUpFile = __dirname + '/../app/backups/screenshot.png';

			// clear any uploaded files leftover
			beforeEach(function () {
				try {
					fs.unlinkSync(uploadedFile);
					fs.unlinkSync(backedUpFile);
				}
				catch (err) {
				}
			});

			beforeEach(function (done) {
				request = requester(app)
					.post('/upload')
					.attach('image', __dirname + '/fixtures/screenshot.png')
					.end(function (err, res) {
						if (err) return done(err);
						response = res;
						done();
					})
				;
			});

			it('should respond with success', function () {
				expect(response.status).to.equal(201);
			});
			it('should write file to disk', function () {
				var check = function () {
					fs.accessSync(uploadedFile);
				};
				expect(check).to.not.throw();
			});
			it('should write backup file to disk', function () {
				var check = function () {
					fs.accessSync(backedUpFile);
				};
				expect(check).to.not.throw();
			});
		});
	});

	afterEach(function () {
		request = undefined;
		response = undefined;
	});
});
