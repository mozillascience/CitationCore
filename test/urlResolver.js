'use strict';

const assert = require('assert');
const GitHubHandler = require('../sourceHandlers/gitHub');
const UrlResolver = require('../urlResolver');

describe('UrlResolver', function() {
	describe('#getHandler', function() {
		it('returns an instance of GitHubHandler when given a GitHub URL', function() {
			const handler = UrlResolver.getHandler('github.com/apple/swift/');
			assert(handler instanceof GitHubHandler);
		});

		it('returns null for unknown URL', function() {
			const handler = UrlResolver.getHandler('garbage url');
			assert(handler == null);
		});
	});
});
