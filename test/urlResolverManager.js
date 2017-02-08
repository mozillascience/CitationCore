/* global describe it */

const assert = require('assert');
const GitHubHandler = require('../sourceHandlers/github');
const UrlResolverManager = require('../urlResolverManager');

describe('UrlResolverManager', () => {
  describe('#getHandler', () => {
    it('returns an instance of GitHubHandler when given a GitHub URL', () => {
      const handler = UrlResolverManager.getHandler('http://github.com/apple/swift/');
      assert(handler.constructor === GitHubHandler);
    });

    it('returns null for unknown URL', () => {
      const handler = UrlResolverManager.getHandler('garbage url');
      assert(handler === null);
    });
  });
});
