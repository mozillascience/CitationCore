'use strict';

/** @namespace model **/

/**
 * @typeDef {Object} Author
 * @prop {string} firstName - The First name of the Author. May be null.
 * @prop {string} middleName - The Middle of the Author. May be null. 
 * @prop {string} lastName - The Last name of the Author. May be null.
 * @prop {string} email - The email address of the author
 * @memberof model
 */

/**
* @typeDef {Object} UID
* @memberof model
* @prop {string} type - Only DOI for now
* @prop {string} value - The actual DOI value
*/

/**
 * An object representing a Code Source Data.
 * @class
 * @memberof model
 * @prop {string} name - Name of the project
 * @prop {Array<model.Author>} authors - List of author objects
 * @prop {string} version - The version number of the software at the time of generation
 * @prop {Date} releaseDate - The latest date the software was released in a date object
 * @prop {string} url - the URL to the source. Not necessarily the URL used to generate this data
 * @prop {string} licence - The name of the licence 
 * @prop {string} description - A short string describing the project
 * @prop {model.UID} uid - A unique identifier for the source.  Could be DOI etc.
 */
class SourceData {
	constructor() {
		this.name = '';
		this.version = null;
		this.releaseDate = null;
		this.url = '';
		this.licence = '';
		this.description = '';
		this.authors = [];
		this.uid = null;
	}
}

module.exports = SourceData;
