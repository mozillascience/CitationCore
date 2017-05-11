const request = require('request');
const SourceData = require('../model/sourceData');
const SourceHandler = require('./sourceHandler');

const userAgent = 'SoftwareCitationCore';

/**
 * URL Handler for figshareAPI
 * @class FigshareAPIHandler
 * @memberof sourceHandlers
 * @augments sourceHandlers.SourceHandler
 * @property {String} articleID - The ID of the figshare article.
 */
class FigshareAPIHandler extends SourceHandler {
  /**
   * Creates a FigshareAPIHandler.
   * @param baseUrl {String} - The Base URL to the API.
   * @param articleID {String} - The article ID.
   */
  constructor(baseUrl, articleID) {
    super(baseUrl);
    this.articleID = articleID;
  }

  /**
   * Fetches data to be used in the citation from the API, stores it in a SourceData object, and returns that object to
   * a callback function
   * @param callback {Function} - the callback function. Consumes a SourceData object and an Error Object
   */
  fetch(callback) {

    const options = {
      url: this.url + 'articles/' + this.articleID,
      headers: {
        'User-Agent': userAgent,
      },
    };

    request(options, (error, response, body) => {
      const parsedBody = (body != null) ? JSON.parse(body) : null;

      if (error == null && response.statusCode !== 200) {
        callback(null, [new Error('Received a ' + response.statusCode + ' when making a request to ' + options.url)]);
      }
      else if (error != null) {
        callback(null, [error]);
      }
      else {
        const sourceData = new SourceData();

        sourceData.name = parsedBody.figshare_url.replace(/\/\d+$/,'').replace(/^https?:\/\/(www\.)?figshare\.com\/articles\//, '').replace(/_/g, ' ');;
        sourceData.version = parsedBody.version.toString();
        sourceData.releaseDate = new Date(parsedBody.modified_date);
        sourceData.url = parsedBody.url_public_html;
        sourceData.licence = parsedBody.license.name;
        sourceData.description = parsedBody.description;
        // TODO: (Issue #69) Replace with a uid object.
        sourceData.uid = parsedBody.doi;

        sourceData.authors = parsedBody.authors.map((author) => {
          return this._createAuthorObj(author, null);
        });

        callback(sourceData, []);
      }

    });
  }
}

module.exports = FigshareAPIHandler;
