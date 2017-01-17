'use strict';

const SourceHandler = require('../sourceHandlers/sourceHandler');

class MockSourceHandler extends SourceHandler {
	constructor(sourceData, urlMatch) {
		this.sourceData = sourceData;
		this.urlMatch = urlMatch
	}

	canHandle(url) {
		return url === this.urlMatch;
	}

	fetch(url) {
		return this.sourceData;
	}
}