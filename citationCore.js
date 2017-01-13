'use strict';

let UrlResolver = require('./urlResolver');

/**
* The callback for the CitationCore generate function
* @callback generateCallback
* @param {string} citaionStr - The Formatted citation
* @param {Error[]} errors - An array of errors.  The generation of a citation may complete and the error array may not be empty.
* These are warnings.  Critical errors will halt the generation of the citation and the first parameter will be null. 
*/

/**
 * Module for generating citations from Code Source URL's like GitHub, or FigShare.
 * @module CitationCore
 */
module.exports = {
 	/**
	 * @param {FormatOptions} formatOptions - The basic configuration object that is used to determine the format of the citation output string
	 * @param {generateCallback} callback - Callback on completion of citation generation. Args are string and array of errors or warning  
	 */
	generate : (formatOptions, callback) => {
		// Strip http:// and www. if they exists
		let sanitizedUrl = formatOptions.url.replace(/^http(s)?\:\/\//, '').replace(/^www\./, '');
		let urlHandler = UrlResolver.getHandler(sanitizedUrl);
		if(urlHandler != null) {
			urlHandler.fetch(sanitizedUrl, (sourceData, messages) => {
				if(sourceData != null) {
					var citation = formatOptions.style.format(sourceData);
				}

				callback(citation, messages);
			});
		}
		else {
			callback(null, [new Error('"' + formatOptions.url + '" is an unsupported source')]);
		}
	},

	/**
	 * @property {Object} styles - A collection of formatters for coercing source data into a particular format standard.
	 */
	styles : {
		apa : new require('./model/styles/apa')(),
		biblatexSoftware : new require('./model/styles/biblatexSoftware')(),
		bibtexMisc : new require('./model/styles/bibtexMisc')(),
		chicago : new require('./model/styles/chicago')()
	},

	/**
	 * @property {FormatOptions} FormatOptions - A class that describtes the customizable options for formatting a citation. 
	 */
	FormatOptions : require('./model/formatOptions')
}
 