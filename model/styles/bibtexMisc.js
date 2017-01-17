'use strict';
require('../../utils/array');

let Style = require('./style');

/*
 * Generates the string that represents the author's name for the bibtex misc entry
 * @param {Author} author - The Author to generate the name string from
 * @return An APA representation of the authors name.  Will be null if a name cannot be generated.
 */
function getAuthorName(author) {
	// If the author has a name
	if(author.lastName != null || author.firstName != null) {
		// If we have the authors first and last name
		if(author.lastName && author.firstName) {
			 return author.lastName + ', ' + author.firstName;
		}
		// If we just have the authors first or last name
		else {
			return (author.lastName != null) ? author.lastName : author.firstName;
		}
	}

	return null;
}

/**
 * Style for the BibTexMisc format
 * @class
 * @augments model.styles.Style
 * @memberof model.styles
 */

class BibTexMisc extends Style{
	format(sourceData) {
		let returnString = '@misc{';
	            
        // Title Block
        if(sourceData.name != null) {
            returnString += sourceData.name.replace(/\s+/g, '');

            returnString += ",\n  title = {";
			
            returnString += sourceData.name;
            
            returnString += "}";
		} 
        else{
            //TODO We need to handle this more gracefully in the future
            throw "No title given!"
        }


		// Authors
		returnString += ",\n  author = {";
        let numAuthors = sourceData.authors.length;
		sourceData.authors.forEach((author, index, array) => {
			let authorName = getAuthorName(author);
			returnString += (authorName != null) ? authorName : '';

			if(array.isNFromLastIndex(index, 1)) {
				returnString += ' and ';
			}
			else if(!array.isLastIndex(index)) {
				returnString += ', ';
			}
		});
        returnString += "}";

       
        
        // Year
		if(sourceData.releaseDate != null) {
			returnString += ',\n  year = {' + sourceData.releaseDate.getFullYear() + '}';
		}

        // Month
		if(sourceData.releaseDate != null) {
			returnString += ',\n  month = {' + sourceData.releaseDate.getMonth() + '}';
		}
        
        
        // URL and Version
		if(sourceData.url != null || sourceData.version != null) {
            returnString += ",\n  note = {";
            returnString += 'Version: ' + sourceData.version;
			returnString += ', URL: ' + sourceData.url; 
            returnString += "}\n";
		}


        returnString += "}\n";
		return returnString;
	}
}

module.exports = BibTexMisc;
    
