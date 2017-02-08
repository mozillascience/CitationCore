const URLResolver = require('./urlResolver');
const GitHubAPIHandler = require('../sourceHandlers/github');

const stripHttp = /^(http(s)?:\/\/)?(www.)?/;
const urlRegex = /^github\.com\/([\w,-]+)\/([\w,-]+)/;

const apiBaseUrl = 'https://api.github.com/';

/**
 * Creates the supported source handlers for a given URL.
 * @class
 * @memberof urlResolvers
 * @augments urlResolvers.URLResolver
 */
class GitHubResolver extends URLResolver {
  static getSourceHandlers(url) {
    const sourceHandlers = [];
    const repoInfo = this._parseURL(url);
    if (repoInfo != null) {
      const repoPath = `${repoInfo.owner}/${repoInfo.repoName}`;

      sourceHandlers.push(new GitHubAPIHandler(apiBaseUrl, repoPath));
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

module.exports = GitHubResolver;
