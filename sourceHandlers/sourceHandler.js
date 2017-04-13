/**
 * An abstract class responsible for coercing a code sources data into a {SourceData} object.
 * @class
 * @memberof sourceHandlers
 * @property {String} url - A URL to the Code Source to fetch data from
 */
class SourceHandler {
  /**
   * Creates a source handler that will create a source data object from the given URL.
   * @param {String} a URL to the Code Source to fetch data from
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * Fetches the given data associated with the code source
   * @param {string} url - The url of the code source
   * @param {SourceHandler~fetchCallback} - The callback for the fetch operation.
   */
  fetch(callback) {
    throw new Error(`${String(this)} does not implement fetch method`);
  }
}

/**
 * Called on the completion of the fetch operation.
 * @callback SourceHandler~fetchCallback
 * @param {SourceData} sourceData - The data retrieved from the code source.
 * @param {Error[]} errors - An array of errors that occurred.
 */

module.exports = SourceHandler;
