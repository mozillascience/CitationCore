

require('../../utils/array');

const Style = require('./style');

/*
 * Generates the string that represents the author's name for the bibtex misc entry
 * @param {Author} author - The Author to generate the name string from
 * @return An APA representation of the authors name.  Will be null if a name cannot be generated.
 */
function getAuthorName(author) {
  // If the author has a name
  if (author.lastName != null || author.firstName != null) {
    // If we have the authors first and last name
    if (author.lastName && author.firstName) {
      return `${author.lastName}, ${author.firstName}`;
    }
    // If we just have the authors first or last name
    return (author.lastName != null) ? author.lastName : author.firstName;
  }

  return null;
}

/**
 * Style for the bibTeX misc format
 * @class
 * @augments model.styles.Style
 * @memberof model.styles
 */
class BibTexSoftware extends Style {
  static format(sourceData) {
    let returnString = '@software{';

    // Title Block
    if (sourceData.name != null) {
      returnString += sourceData.name.replace(/\s+/g, '');

      returnString += ',\n  title = {';

      returnString += sourceData.name;

      returnString += '}';
    }
    else {
      // TODO We need to handle this more gracefully in the future
      throw new Error('Project does not have a title');
    }


    // Authors
    returnString += ',\n  author = {';
    sourceData.authors.forEach((author, index, array) => {
      const authorName = getAuthorName(author);
      returnString += (authorName != null) ? authorName : '';

      if (array.isNFromLastIndex(index, 1)) {
        returnString += ' and ';
      }
      else if (!array.isLastIndex(index)) {
        returnString += ', ';
      }
    });
    returnString += '}';


        // Year
    if (sourceData.releaseDate != null) {
      returnString += `,\n  year = {${sourceData.releaseDate.getFullYear()}}`;
    }

        // Month
    if (sourceData.releaseDate != null) {
      returnString += `,\n  month = {${sourceData.releaseDate.getMonth()}}`;
    }


        // URL
    if (sourceData.url != null) {
      returnString += ',\n  url = {';
      returnString += `${sourceData.url}}`;
    }

    // Version
    if (sourceData.version != null) {
      returnString += `,\n  version = {${sourceData.version}`;
      returnString += '}\n';
    }

    returnString += '}\n';
    return returnString;
  }
}

module.exports = BibTexSoftware;

