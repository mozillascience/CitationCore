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

  /**
   * Creates a SourceData author object from a string containing a full name and a string containing an email address.
   * @param nameStr {string} - A string containg a full name
   * @param email {string} - A string containing an email address
   */
    _createAuthorObj(nameStr, email) {
      const namePieces = (nameStr != null && nameStr != '' && typeof (nameStr) === 'string') ? nameStr.split(' ') : [];
      const result = {};

      result.lastName = (namePieces.length > 0) ? namePieces.pop() : null;
      result.middleName = (namePieces.length > 1) ? namePieces.splice(1 - namePieces.length).join(' ') : null;
      result.firstName = (namePieces.length > 0) ? namePieces.pop() : null;
      result.email = email;

      return result;
   }
}

/**
 * Called on the completion of the fetch operation.
 * @callback SourceHandler~fetchCallback
 * @param {SourceData} sourceData - The data retrieved from the code source.
 * @param {Error[]} errors - An array of errors that occurred.
 */

module.exports = SourceHandler;
