'use strict';

const assert = require('assert');
const chicago = new (require('../../model/styles/chicago'))();

describe('ChicagoStyle', function() {
	describe('format', function() {
		it('All fields, one author', function () {
			let data = require('../mockSourceData/allFieldsOneAuthor');
			assert.equal(chicago.format(data), 'Lee, Geddy. "Red Barchetta".(2112, 1.0.0). http://myUnclesFarm.com');
		});

		it('All fields, three authors', function() {
			let data = require('../mockSourceData/allFieldsThreeAuthors');
			assert.equal(chicago.format(data), 'Lee, Geddy, Alex Lifeson and Neil Peart. "Xanadu".(2112, 1.0.0). http://kublaKahn.com');
		});
	});
});