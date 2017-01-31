const assert = require('assert');
const bibtexmisc = require('../../model/styles/bibtexMisc');
const biblatexSoftware = require('../../model/styles/biblatexSoftware');

const oneAuthorSourceData = require('../mockSourceData/allFieldsOneAuthor');
const threeAuthorsSourceData = require('../mockSourceData/allFieldsThreeAuthors');

describe('BibTexMiscStyle', () => {
  describe('format', () => {
    it('Month field, one author', () => {
      let formattedString = bibtexmisc.format(oneAuthorSourceData);
      assert.equal(formattedString.includes("month = {11},"),true);
    });
    
    it('Title field one author', () => {
      let formattedString = bibtexmisc.format(oneAuthorSourceData);
      assert.equal(formattedString.includes("title = {Red Barchetta},"),true);
    });
    
    it('Author field, one author', () => {
      let formattedString = bibtexmisc.format(oneAuthorSourceData);
      assert.equal(formattedString.includes("author = {Lee, Geddy},"),true);
    });
    
    it('Note field, one author', () => {
      let formattedString = bibtexmisc.format(oneAuthorSourceData);
      assert.equal(formattedString.includes("note = {Version: 1.0.0, URL: http://myUnclesFarm.com}"),true);
    }); 
    //Three Authors
    it('Author field, three authors', () => {
      let formattedString = bibtexmisc.format(threeAuthorsSourceData);
      assert.equal(formattedString.includes("author = {Lee, Geddy and Lifeson, Alex and Peart, Neil},"),true);
    });

  });
});

describe('BibLatexSoftwareStyle', () => {
    describe('format', () => {

      it('Month field, one author', () => {
        let formattedString = biblatexSoftware.format(oneAuthorSourceData);
        assert.equal(formattedString.includes("month = {11},"),true);
      });
    
      it('Title field one author', () => {
        let formattedString = biblatexSoftware.format(oneAuthorSourceData);
        assert.equal(formattedString.includes("title = {Red Barchetta},"),true);
      });
    
      it('Author field, one author', () => {
        let formattedString = biblatexSoftware.format(oneAuthorSourceData);
        assert.equal(formattedString.includes("author = {Lee, Geddy},"),true);
      });
      
      it('URL field, one author', () => {
        let formattedString = biblatexSoftware.format(oneAuthorSourceData);
        assert.equal(formattedString.includes("url = {http://myUnclesFarm.com},"),true);
      });

      it('Version field, one author', () => {
        let formattedString = biblatexSoftware.format(oneAuthorSourceData);
        assert.equal(formattedString.includes("version = {1.0.0}"),true);
      });
      //Three Authors
      it('Author field, three authors', () => {
        let formattedString = biblatexSoftware.format(threeAuthorsSourceData);
        assert.equal(formattedString.includes("author = {Lee, Geddy and Lifeson, Alex and Peart, Neil},"),true);
      });

    });
});
