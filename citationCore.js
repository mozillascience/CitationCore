const UrlResolverManager = require('./urlResolverManager');
const FormatOptions = require('./model/formatOptions');

const APAStyle = require('./model/styles/apa');
const BibTextSoftwareStyle = require('./model/styles/biblatexSoftware');
const BibTextMiscStyle = require('./model/styles/bibtexMisc');
const ChicagoStyle = require('./model/styles/chicago');

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
    /*
     * @param {model.FormatOptions} formatOptions - The basic configuration object that is used to determine the format of the citation output string
     * @param {generateCallback} callback - Callback on completion of citation generation. Args are string and array of errors or warning
     */
  generate: (formatOptions, callback) => {
    // Strip http:// and www. if they exists
    const urlHandler = UrlResolverManager.getHandler(formatOptions.url);
    if (urlHandler != null) {
      urlHandler.fetch((sourceData, messages) => {
        let citation;
        if (sourceData != null) {
          citation = formatOptions.style.format(sourceData);
        }

        callback(citation, messages);
      });
    }
    else {
      callback(null, [new Error(`"${formatOptions.url}" is an unsupported source`)]);
    }
  },

  /**
   * @property {Object} styles - A collection of formatters for coercing source data into a particular format standard.
   */
  styles: {
    apa: APAStyle,
    biblatexSoftware: BibTextSoftwareStyle,
    bibtexMisc: BibTextMiscStyle,
    chicago: ChicagoStyle,
  },

  /**
   * @property {model.FormatOptions} FormatOptions - A class that describtes the customizable options for formatting a citation.
   */
  FormatOptions,
};
