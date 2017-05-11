const SourceData = require('../model/sourceData');
const async = require('async');
const request = require('request');
const SourceHandler = require('./sourceHandler');

const userAgent = 'SoftwareCitationCore';


/*
 * Creates and sends a request for the BitBucket API.
 * @private
 * @param {string} path - The path of the url.  This does not include the base path.  For example if you
 * want to send a request to 'http://api.github.com/repos/apple/swift' use 'repos/apple/swift'.
 * @param {Function} cb - The callback function. Follows the error/response parameter pattern.
 * The response param will be json parsed object.
 */
function sendApiRequest(url, path, cb) {
  const options = {
    url: url + path,
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
 * Quries the the BitBucket API to get the authors of a project
 * @param {string[]} gitHubLogins - An array of BitBucket username to query for information.
 * @param {Function} callback - The callback function. Follows the error response parameter pattern.
 * The response parameter is an array of Author objects
 */
function getAllCommits(url, path, obj, cb) {
  sendApiRequest(url, path, (error, apiValReturn) => {
    apiValReturn.values.forEach((object) => {
      const authorPieces = object.author.raw.split(' ');
      const emailPiece = authorPieces.pop();
      const email = emailPiece.substring(1, emailPiece.length - 1);
      if (obj[`${email}`]) {
        obj[`${email}`].count += 1;
      }
      else {
        obj[email] = {
          count: 1,
          lastName: (authorPieces.length === 3) ? authorPieces[2] : (authorPieces.length === 2) ? authorPieces[1] : authorPieces[0],
          middleName: (authorPieces.length === 3) ? authorPieces[1] : null,
          firstName: (authorPieces.length > 1) ? authorPieces[0] : null,
        };
      }
    });
    if (apiValReturn.next !== undefined) {
      getAllCommits(apiValReturn.next, '', obj, cb);
    }
    else {
      cb(error, obj);
    }
  });
}


/**
 * URL Handler for Bitbucket
 * @class BitBucketAPIHandler
 * @memberof sourceHandlers
 * @augments sourceHandlers.SourceHandler
 * @property {String} repoPath - The Identifier of the repo.
 */
class BitBucketAPIHandler extends SourceHandler {
  /**
   * Creates A BitbucketAPIHandler.
   * @param baseUrl {String} - The Base URL to the API.
   * @param repoPath {String} - The repo identifier. Generally in the form of "owner/repoName"
   */
  constructor(baseUrl, repoPath) {
    super(baseUrl);
    this.repoPath = repoPath;
  }

  fetch(token, callback) {
    async.parallel([
      // Fetches version data on the Repo
      (cb) => {
        sendApiRequest(this.url, `${this.repoPath}/versions`, cb);
      },
      // Fetches the author data
      (cb) => {
        getAllCommits(this.url, `${this.repoPath}/commits`, {}, cb);
      },
      // Fetch General data
      (cb) => {
        sendApiRequest(this.url, `${this.repoPath}`, cb);
      },
    ], (error, results) => {
      if (error === null) {
        const sourceData = new SourceData();
        // General info
        const generalData = results[2];
        sourceData.name = generalData.name;
        sourceData.url = `https://bitbucket.org/${generalData.full_name}` || generalData.html_url;
        sourceData.releaseDate = new Date(generalData.updated_on);
        sourceData.description = generalData.description;
        const authorList = [];
        // Author Info
        for (const key of Object.keys(results[1])) {
          if (authorList[0] === undefined || results[1][key].count >= authorList[0].count) {
            authorList.splice(0, 0, {
              firstName: results[1][key].firstName,
              middleName: results[1][key].middleName,
              lastName: results[1][key].lastName,
              email: key,
              count: results[1][key].count,
            });
            if (authorList.length > 3) {
              authorList.pop();
            }
          }
          else if (authorList[1] === undefined || (results[1][key].count >= authorList[1].count && results[1][key].count < authorList[0].count)) {
            authorList.splice(1, 0, {
              firstName: results[1][key].firstName,
              middleName: results[1][key].middleName,
              lastName: results[1][key].lastName,
              email: key,
              count: results[1][key].count,
            });
            if (authorList.length > 3) {
              authorList.pop();
            }
          }
          else if (authorList[2] === undefined || (results[1][key].count >= authorList[2].count && results[1][key].count < authorList[1].count)) {
            authorList.splice(2, 0, {
              firstName: results[1][key].firstName,
              middleName: results[1][key].middleName,
              lastName: results[1][key].lastName,
              email: key,
              count: results[1][key].count,
            });
            if (authorList.length > 3) {
              authorList.pop();
            }
          }
        }
        sourceData.authors = authorList;

        // Version Data
        const versions = results[0];
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
}


module.exports = BitBucketAPIHandler;

