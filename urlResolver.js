'use strict';

let gitHubSourceHandler = new (require('./sourceHandlers/gitHub'))();

let handlers = [gitHubSourceHandler];

/**
 * A module for resolving a URL to a source handler.
 * @module URLResolver
 */
module.exports = {
	/**
	 * Gets the generator for the given url
	 * @param {string} url - The url to pattern match to the generator
	 * @return {SourceHandler} the source handler for the URL or null if the URL is not supported
	 */
	getHandler : (url) => {
		// See if we can match a generator
		for(let handler of handlers) {
			if(handler.canHandle(url)) {
				return handler;
			}
		}

		return null;
	}
}
