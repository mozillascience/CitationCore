/* global it describe */

const assert = require('assert');
const apa = require('../../model/styles/apa');

const oneAuthorSourceData = require('../mockSourceData/allFieldsOneAuthor');
const threeAuthorsSourceData = require('../mockSourceData/allFieldsThreeAuthors');

describe('APAStyle', () => {
  describe('format', () => {
    it('All fields, one author', () => {
      const expected = 'Lee, G. (2112). "Red Barchetta". Version: 1.0.0. Retrieved From: http://myUnclesFarm.com';
      assert.equal(apa.format(oneAuthorSourceData), expected);
    });

    it('All fields, three authors', () => {
      const expected = 'Lee, G., Lifeson, A. & Peart, N. (2112). "Xanadu". Version: 1.0.0. Retrieved From: http://kublaKahn.com';
      assert.equal(apa.format(threeAuthorsSourceData), expected);
    });
  });
});
