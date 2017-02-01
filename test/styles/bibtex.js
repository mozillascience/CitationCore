/* global it describe */

const assert = require('assert');
const bibtexmisc = require('../../model/styles/bibtexMisc');
const biblatexSoftware = require('../../model/styles/biblatexSoftware');

const oneAuthorSourceData = require('../mockSourceData/allFieldsOneAuthor');
const threeAuthorsSourceData = require('../mockSourceData/allFieldsThreeAuthors');

describe('BibTexMiscStyle', () => {
  describe('format', () => {
    const formattedString = bibtexmisc.format(oneAuthorSourceData);
    it('Month field, one author', () => {
      assert.equal(formattedString.includes('month = {11},'), true);
    });

    it('Title field, one author', () => {
      assert.equal(formattedString.includes('title = {Red Barchetta},'), true);
    });

    it('Author field, one author', () => {
      assert.equal(formattedString.includes('author = {Lee, Geddy},'), true);
    });

    it('Note field, one author', () => {
      assert.equal(formattedString.includes('note = {Version: 1.0.0, URL: http://myUnclesFarm.com}'), true);
    });
    // Three Authors
    const formattedStringThreeAuthor = bibtexmisc.format(threeAuthorsSourceData);
    it('Author field, three authors', () => {
      assert.equal(formattedStringThreeAuthor.includes('author = {Lee, Geddy and Lifeson, Alex and Peart, Neil},'), true);
    });
  });
});

describe('BibLatexSoftwareStyle', () => {
  describe('format', () => {
    const formattedString = biblatexSoftware.format(oneAuthorSourceData);
    it('Month field, one author', () => {
      assert.equal(formattedString.includes('month = {11},'), true);
    });

    it('Title field one author', () => {
      assert.equal(formattedString.includes('title = {Red Barchetta},'), true);
    });

    it('Author field, one author', () => {
      assert.equal(formattedString.includes('author = {Lee, Geddy},'), true);
    });

    it('URL field, one author', () => {
      assert.equal(formattedString.includes('url = {http://myUnclesFarm.com},'), true);
    });

    it('Version field, one author', () => {
      assert.equal(formattedString.includes('version = {1.0.0}'), true);
    });
      // Three Authors
    const formattedStringThreeAuthor = biblatexSoftware.format(threeAuthorsSourceData);
    it('Author field, three authors', () => {
      assert.equal(formattedStringThreeAuthor.includes('author = {Lee, Geddy and Lifeson, Alex and Peart, Neil},'), true);
    });
  });
});
