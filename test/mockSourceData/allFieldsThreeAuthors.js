'use strict';

const SourceData = require('../../model/sourceData');

let sourceData = new SourceData();
sourceData.name = 'Xanadu';

sourceData.authors = [
	{
		firstName: 'Geddy',
		lastName: 'Lee',
		email: 'geddy@rush.com',
	},
	{
		firstName: 'Alex',
		lastName: 'Lifeson',
		email: 'alex@rush.com',
	},
	{
		firstName: 'Neil',
		lastName: 'Peart',
		email: 'neil@rush.com',
	},
];

sourceData.version = '1.0.0';
sourceData.releaseDate = new Date(2112, 11, 21);
sourceData.url = 'http://kublaKahn.com';
sourceData.licence = 'MIT';
sourceData.description = 'I scaled the frozen mountain tops of eastern lands unknown. Time and man alone, searching for the lost Xanadu.';

module.exports = sourceData;