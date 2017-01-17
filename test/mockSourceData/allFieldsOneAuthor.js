

const SourceData = require('../../model/sourceData');

const sourceData = new SourceData();
sourceData.name = 'Red Barchetta';

sourceData.authors = [
  {
    firstName: 'Geddy',
    lastName: 'Lee',
    email: 'geddy@rush.com',
  },
];

sourceData.version = '1.0.0';
sourceData.releaseDate = new Date(2112, 11, 21);
sourceData.url = 'http://myUnclesFarm.com';
sourceData.licence = 'MIT';
sourceData.description = 'Well worn leather, hot metal and oil, the scented country air.';

module.exports = sourceData;
