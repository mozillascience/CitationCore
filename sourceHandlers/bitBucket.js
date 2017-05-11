const SourceData = require('../model/sourceData');
const async = require('async');
const request = require('request');
const SourceHandler = require('./sourceHandler');

const userAgent = 'SoftwareCitationCore';


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

  fetch(callback) {
    async.parallel([
      // Fetches version data on the Repo
      (cb) => {
        this._sendApiRequest(this.url, `${this.repoPath}/versions`, cb);
      },
      // Fetches the author data
      (cb) => {
        this._getAllCommits(this.url, `${this.repoPath}/commits`, {}, cb);
      },
      // Fetch General data
      (cb) => {
        this._sendApiRequest(this.url, `${this.repoPath}`, cb);
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
        // Iterate over the json object by their emails
        for (const key of Object.keys(results[1])) {
          // Check if the first value is not set, or if the current count is greater than the first count in author list
          if (authorList[0] === undefined || results[1][key].count >= authorList[0].count) {
            authorList.splice(0, 0, {
              firstName: results[1][key].firstName,
              middleName: results[1][key].middleName,
              lastName: results[1][key].lastName,
              email: key,
              count: results[1][key].count,
            });
            // if the list is longer than 3 elements, then pop the last/smallest count.
            if (authorList.length > 3) {
              authorList.pop();
            }
          }
          // if the second element is undefined, or the current result is greater or equal to the
          // 2 count in author list but less than first element then splice it in.
          else if (authorList[1] === undefined || (results[1][key].count >= authorList[1].count && results[1][key].count < authorList[0].count)) {
            authorList.splice(1, 0, {
              firstName: results[1][key].firstName,
              middleName: results[1][key].middleName,
              lastName: results[1][key].lastName,
              email: key,
              count: results[1][key].count,
            });
             // if the list is longer than 3 elements, then pop the last/smallest count.
            if (authorList.length > 3) {
              authorList.pop();
            }
          }
          // If the third element is does not exist, or the current object is greater than the
          // third element in the list but less than the second splice it in.
          else if (authorList[2] === undefined || (results[1][key].count >= authorList[2].count && results[1][key].count < authorList[1].count)) {
            authorList.splice(2, 0, {
              firstName: results[1][key].firstName,
              middleName: results[1][key].middleName,
              lastName: results[1][key].lastName,
              email: key,
              count: results[1][key].count,
            });
            // if the list is longer than 3 elements, then pop the last/smallest count.
            if (authorList.length > 3) {
              authorList.pop();
            }
          }
        }
        // set the 3 top authors to be cited.
        sourceData.authors = authorList;

        // Version Data
        const versions = results[0];
        if (versions.length > 0) {
          sourceData.version = versions[0].name || versions[1].tag_name || null;
        }
        callback(sourceData, []);
      }
      else {
        callback(null, [error]);
      }
    });
  }

  /*
   * Creates and sends a request for the BitBucket API.
   * @param {string} url - the base url for the bitbucket api
   * @param {string} path - The path of the url.  This does not include the base path.  For example if you
   * want to send a request to 'https://bitbucket.org/fenics-project/ferari-retired' use 'enics-project/ferari-retired'.
   * @param {Function} cb - The callback function. Follows the error/response parameter pattern.
   * The response param will be json parsed object.
   */
  _sendApiRequest(url, path, cb) {
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

  /**
   * Gets all commits for the repository, needed to gather all commits to allows the system to get all the contributors.
   * Then passes that back to fetch to get the top contributors.
   * @param  {string}   url  Will take in either a part of the string or the whole string
   * @param  {string}   path Either the path to the repo or an empty string.
   * @param  {JSON}   obj    The collected object of users that gets built and passed back in the callback.
   * @param  {Function} cb   The callback function, the response that will be used after this completes.
   */
  _getAllCommits(url, path, obj, cb) {
    this._sendApiRequest(url, path, (error, apiValReturn) => {
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
      if (apiValReturn.next === undefined) {
        cb(error, obj);
      }
      else {
        this._getAllCommits(apiValReturn.next, '', obj, cb);
      }
    });
  }
}


module.exports = BitBucketAPIHandler;

