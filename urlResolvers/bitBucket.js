const URLResolver = require('./urlResolver');
const BitBucketAPIHandler = require('../sourceHandlers/bitBucket');

const stripHttp = /^(https?:\/\/)?(www\.)?/;
const urlRegex = /^bitbucket\.org\/([\w-]+)\/([\w-]+)/;

const apiBaseUrl = 'https://api.bitbucket.org/2.0/repositories/';

/**
 * Creates the supported source handlers for a given URL.
 * @class
 * @memberof urlResolvers
 * @augments urlResolvers.URLResolver
 */
class BitBucketResolver extends URLResolver {
  static getSourceHandlers(url) {
    const sourceHandlers = [];
    const repoInfo = this._parseURL(url);
    if (repoInfo != null) {
      const repoPath = `${repoInfo.owner}/${repoInfo.repoName}`;

      sourceHandlers.push(new BitBucketAPIHandler(apiBaseUrl, repoPath));
    }

    return sourceHandlers;
  }

  static _parseURL(url) {
    const strippedURL = url.replace(stripHttp, '');
    const matches = urlRegex.exec(strippedURL);
    if (matches != null && matches.length === 3) {
      return {
        owner: matches[1],
        repoName: matches[2],
      };
    }

    return null;
  }
}

module.exports = BitBucketResolver;
