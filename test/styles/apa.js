'use strict';

const assert = require('assert');
const apa = new (require('../../model/styles/apa'))();

describe('APAStyle', function() {
	describe('format', function() {
		it('All fields, one author', function () {
			const data = require('../mockSourceData/allFieldsOneAuthor');
			assert.equal(apa.format(data), 'Lee, G. (2112). "Red Barchetta". Version: 1.0.0. Retrieved From: http://myUnclesFarm.com');
		});

		it('All fields, three authors', function() {
			const data = require('../mockSourceData/allFieldsThreeAuthors');
			assert.equal(apa.format(data), 'Lee, G., Lifeson, A. & Peart, N. (2112). "Xanadu". Version: 1.0.0. Retrieved From: http://kublaKahn.com');
		});
	})
});