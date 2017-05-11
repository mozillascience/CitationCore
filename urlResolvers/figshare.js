const URLResolver = require('./urlResolver');
const FigshareAPIHandler = require('../sourceHandlers/figshare');

const stripHttp = /^(https?:\/\/)?(www\.)?/;
const urlRegex = /^figshare\.com\/articles(\/\w+)?\/\d+$/;

const apiBaseUrl = 'https://api.figshare.com/v2/';

/**
 * Creates the supported source handlers for a given URL.
 * @class
 * @memberof urlResolvers
 * @augments urlResolvers.URLResolver
 */
class FigshareResolver extends URLResolver {
  static getSourceHandlers(url) {
    const sourceHandlers = [];
    const strippedURL = url.replace(stripHttp, '');

    if (urlRegex.exec(strippedURL)) {
      sourceHandlers.push(new FigshareAPIHandler(apiBaseUrl, /\d+$/.exec(strippedURL)));
    }

    return sourceHandlers;
  }
}

module.exports = FigshareResolver;
