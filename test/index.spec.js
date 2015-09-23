'use strict';

var expect = require('chai').expect;
var requester = require('supertest');
var app = require('../app/index');
var fs = require('fs');

describe('File Upload', function () {
	var request;
	var response;
	var uploadedFile = __dirname + '/../app/uploads/screenshot.png';

	beforeEach(function () {
		try {
			fs.unlinkSync(uploadedFile);
		}
		catch (err) {

		}
	});

	describe('when uploading a file', function () {
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

		it('should write file to disk', function () {
			var check = function () {
				fs.accessSync(uploadedFile);
			};
			expect(check).to.not.throw();
		});
	});

	afterEach(function () {
		request = undefined;
		response = undefined;
	});
});
