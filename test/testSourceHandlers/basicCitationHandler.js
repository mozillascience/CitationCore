const SourceHandler = require('../../sourceHandlers/sourceHandler');
const SourceData = require('../../model/sourceData');

class BasicCitationHandler extends SourceHandler {
  static canHandle(url) {
    return url === 'test://basic';
  }

  static fetch(url, cb) {
    const sourceData = new SourceData();
    sourceData.name = 'basic';
    sourceData.authors = [{ name: 'Geddy Lee', email: 'geddy@rush.com' }];
    sourceData.version = '1.0.0';
    sourceData.releaseDate = new Date(2112, 12, 21);
    sourceData.url = 'http://rush.com';
    sourceData.licence = 'MIT';
    sourceData.description = 'Basic Test';


    cb(sourceData, []);
  }
}

module.exports = BasicCitationHandler;
