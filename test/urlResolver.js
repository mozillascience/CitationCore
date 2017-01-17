/* global describe it */

const assert = require('assert');
const GitHubHandler = require('../sourceHandlers/gitHub');
const UrlResolver = require('../urlResolver');

describe('UrlResolver', () => {
  describe('#getHandler', () => {
    it('returns an instance of GitHubHandler when given a GitHub URL', () => {
      const handler = UrlResolver.getHandler('github.com/apple/swift/');
      assert(handler === GitHubHandler);
    });

    it('returns null for unknown URL', () => {
      const handler = UrlResolver.getHandler('garbage url');
      assert(handler == null);
    });
  });
});
