/**
 * An abstract class representing a citation visual format.
 * @class
 * @memberof model.styles
 */
class Style {
  /**
   * Produces a string for a source data object.
   * @param {model.SourceData} sourceData - The data to format into a string.
   * @return {string} The data formated in the style as a string.
   */
  static format(sourceData) {
    throw new Error('format not implemented');
  }
}

module.exports = Style;
