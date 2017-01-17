/* global it describe */

const assert = require('assert');
const chicago = require('../../model/styles/chicago');

const oneAuthorSourceData = require('../mockSourceData/allFieldsOneAuthor');
const threeAuthorsSourceData = require('../mockSourceData/allFieldsThreeAuthors');

describe('ChicagoStyle', () => {
  describe('format', () => {
    it('All fields, one author', () => {
      const expected = 'Lee, Geddy. "Red Barchetta".(2112, 1.0.0). http://myUnclesFarm.com';
      assert.equal(chicago.format(oneAuthorSourceData), expected);
    });

    it('All fields, three authors', () => {
      const expected = 'Lee, Geddy, Alex Lifeson and Neil Peart. "Xanadu".(2112, 1.0.0). http://kublaKahn.com';
      assert.equal(chicago.format(threeAuthorsSourceData), expected);
    });
  });
});
