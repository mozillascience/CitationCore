const BibTextSoftwareStyle = require('./styles/biblatexSoftware');

/**
 * @class
 * A Class for representing the format of a citation
 * @property {string} url - The URL to fetch meta data from. Default is an empty string
 * @property {Formatter} style - The formatter to use when generating the citation string. Default is APA.
 * @memberof model
 */
class FormatOptions {
  constructor() {
    this.url = '';
    this.style = new BibTextSoftwareStyle();
  }
}

module.exports = FormatOptions;
