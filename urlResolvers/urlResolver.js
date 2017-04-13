/**
 * An abstract class for creating source handlers from a URL.
 * @class
 * @memberof urlResolvers
 */
class URLResolver {
  /**
   * Given a URL, this function will return an array of source handlers that can handle the URL.
   * @param {String} url - A url of a possible code meta-data source
   * @return {sourceHandler.SourceHandler[]} An array of source handlers that can generate a source data object from the given URL.
   *  The array will be empty if no source handlers are compatible.
   */
  static getSourceHandlers(url) {
    throw new Error('URLResolver getSourceHandlers not implemented');
  }
}

module.exports = URLResolver;
