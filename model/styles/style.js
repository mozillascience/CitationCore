/**
 * An abstract class representing a citation visual format.
 * @class Style
 */
class Style {
	/**
	 * Produces a string for a source data object.
	 * @param {SourceData} sourceData - The data to format into a string.
	 * @return {string} The data formated in the style as a string.
	 */
	format(sourceData) {
		throw new Error('format not implemented');
	}
}

module.exports = Style;
