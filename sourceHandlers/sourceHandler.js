/**
 * An abstract class responsible for coercing a code sources data into a {SourceData} object. This is not a stand
 * @class
 * @memberof sourceHandlers
 */
class SourceHandler {
	/**
	 * Determines if the handler can process the given URL.
	 * @param {string} url - The url to process
	 * @return {boolean} - True if teh handler can process the given URL.
	 */ 
	canHandle(url) {
		throw new Error("canHandle not implemented");
	}

	/**
	 * Fetches the given data associated with the code source
	 * @param {string} url - The url of the code source
	 * @param {SourceHandler~fetchCallback} - The callback for the fetch operation.
	 */
	fetch(url, callback) {
		throw new Error("fetch not implemented")
	}
}

/**
 * Called on the completion of the fetch operation.
 * @callback SourceHandler~fetchCallback
 * @param {SourceData} sourceData - The data retrieved from the code source.
 * @param {Error[]} errors - An array of errors that occurred.
 */

module.exports = SourceHandler;