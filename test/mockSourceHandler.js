const SourceHandler = require('../sourceHandlers/sourceHandler');

class MockSourceHandler extends SourceHandler {
  constructor(sourceData, urlMatch) {
    super();
    this.sourceData = sourceData;
    this.urlMatch = urlMatch;
  }

  canHandle(url) {
    return url === this.urlMatch;
  }

  fetch(url) {
    return this.sourceData;
  }
}

module.exports = MockSourceHandler;
