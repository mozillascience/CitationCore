const SourceData = require('../model/sourceData');
const async = require('async');
const request = require('request');
const SourceHandler = require('./sourceHandler');

const userAgent = 'SoftwareCitationCore';

/**
 * URL Handler for GitHubAPI
 * @class GitHubAPIHandler
 * @memberof sourceHandlers
 * @augments sourceHandlers.SourceHandler
 * @property {String} repoPath - The Identifier of the repo.
 */
class GitHubAPIHandler extends SourceHandler {
  /**
   * Creates A GitHubAPIHandler.
   * @param baseUrl {String} - The Base URL to the API.
   * @param repoPath {String} - The repo identifier. Generally in the form of "owner/repoName"
   */
  constructor(baseUrl, repoPath) {
    super(baseUrl);
    this.repoPath = repoPath;
  }

  fetch(callback) {
    // Setup async operation functions
    const fetchGeneralInfo = (cb) => {
      this._sendApiRequest(`repos/${this.repoPath}`, cb);
    };

    const fetchAuthorList = (cb) => {
      this._sendApiRequest(`repos/${this.repoPath}/contributors`, (error, users) => {
        if (error == null) {
          const userLogins = users.map(obj => obj.login).filter((obj, index) => index < 3);

          this._fetchAuthors(userLogins, cb);
        }
        else {
          cb(error, users);
        }
      });
    };

    const fetchVersionInfo = (cb) => {
      this._sendApiRequest(`repos/${this.repoPath}/releases`, cb);
    };

    // Perform Async operations
    const asyncOperations = [fetchGeneralInfo, fetchAuthorList, fetchVersionInfo];
    async.parallel(asyncOperations, (error, results) => {
      if (error == null) {
        const sourceData = new SourceData();
        // General info
        const generalData = results[0];
        sourceData.name = generalData.name;
        sourceData.url = generalData.homepage || generalData.html_url;
        sourceData.releaseDate = new Date(generalData.updated_at);
        sourceData.description = generalData.description;

        // Author Info
        sourceData.authors = results[1];

        // Version Data
        const versions = results[2];
        if (versions.length > 0) {
          sourceData.version = versions[0].name || versions[1].tag_name;
        }

        callback(sourceData, []);
      }
      else {
        callback(null, [error]);
      }
    });
  }

  /*
   * Creates and sends a request for the GitHub API.
   * @private
   * @param {string} path - The path of the url.  This does not include the base path.  For example if you
   * want to send a request to 'http://api.github.com/repos/apple/swift' use 'repos/apple/swift'.
   * @param {Function} cb - The callback function. Follows the error/response parameter pattern.
   * The response param will be json parsed object.
   */
  _sendApiRequest(path, cb) {
    const options = {
      url: this.url + path,
      headers: {
        'User-Agent': userAgent,
      },
    };

    request(options, (error, response, body) => {
      const parsedBody = (body != null) ? JSON.parse(body) : null;
      if (error == null && response.statusCode !== 200) {
        const errorMessage = `Received a ${response.statusCode} when making a request to ${options.url}`;
        cb(new Error(errorMessage), parsedBody);
      }
      else {
        cb(error, parsedBody);
      }
    });
  }

  /*
   * Quries the the GitHub API to get the authors of a project
   * @private
   * @param {string[]} gitHubLogins - An array of GitHub username to query for information.
   * @param {Function} callback - The callback function. Follows the error response parameter pattern.
   * The response parameter is an array of Author objects
   */
  _fetchAuthors(gitHubLogins, callback) {
    // Generate the requests that will feth the github user information
    const userFetchOperations = gitHubLogins.map((obj, index) => (cb) => {
      this._sendApiRequest(`users/${obj}`, (error, res) => {
        cb(error, res);
      });
    });

    // Execute those requests in parallel and generate the generic user objects
    async.parallel(userFetchOperations, (error, results) => {
      callback(error, results.map((obj) => {
        const namePieces = (obj.name != null && typeof (obj.name) === 'string') ? obj.name.split(' ') : [];

        return {
          lastName: (namePieces.length > 0) ? namePieces.pop() : null,
          middleName: (namePieces.length > 1) ? namePieces.splice(1 - namePieces.length).join(' ') : null,
          firstName: (namePieces.length > 0) ? namePieces.pop() : null,
          email: obj.email,
        };
      }));
    });
  }
}

module.exports = GitHubAPIHandler;
