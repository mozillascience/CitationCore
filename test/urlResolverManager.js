/* global describe it */

const assert = require('assert');
const FigshareHandler = require('../sourceHandlers/figshare');
const GitHubHandler = require('../sourceHandlers/gitHub');
const UrlResolverManager = require('../urlResolverManager');

describe('UrlResolverManager', () => {
  describe('#getHandler', () => {
    it('returns an instance of GitHubHandler when given a GitHub URL', () => {
      const handler = UrlResolverManager.getHandler('http://github.com/apple/swift/');
      assert(handler.constructor === GitHubHandler);
    });

    it('returns an instance of FigshareHandler when given a figshare URL', () => {
      const handler = UrlResolverManager.getHandler('https://figshare.com/articles/4426703');
      assert(handler.constructor === FigshareHandler);
    });

    it('returns null for unknown URL', () => {
      const handler = UrlResolverManager.getHandler('garbage url');
      assert(handler === null);
    });
  });
});
