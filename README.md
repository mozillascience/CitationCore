# citation-core

CitationCore is a framework designed to generate a citation string given a URL to a code source like a GitHub or Bitbucket repository.  It is part of a larger effort, lead by Mozilla Science Lab, to develop a suite of tools that aim to implement a standard for citing software and making it easier to cite software correctly.  To learn more about this project you can visit the [Software Citation Tools repository](https://github.com/mozillascience/software-citation-tools).

## Install
CitationCore is distributed through npm. To install:
```
npm install citation-core
```
## Contributor Install
If you are interested in contributing to citation-core please follow these install instructions. They will add a pre-commit hook that will run our linter and reject commits that do not meet the project's coding standards.  We are adhering to the [AirBnb style guide](https://github.com/airbnb/javascript). 
```
git clone https://github.com/mozillascience/CitationCore.git
cd CitationCore
cp dev/pre-commit .git/hooks/
```
## Usage
To generate a citation you must provide at least a url.
```javascript
const CitationCore = require('citation-core');

let formatOptions = new CitationCore.FormatOptions();
formatOptions.url = 'http://github.com/apple/swift';

CitationCore.generate(formatOptions, (citationStr, errors) => {
	// Handle completion of citation generation
});
```
**Citation Output:**
```
Lattner, C., Gregor, D. & Gribenko, D. (2017). "swift". Version: Swift 3.0.1 Preview 3. Retrieved From: https://swift.org/ 
```
### FormatOptions
The `generate` function requires an instance of the `FormatOptions` class. This class allows for customization of the output citation.  The FormatOptions object has the following customizable properties:
#### URL
The url of the code source.  Currently the framework supports GitHub.
```javascript
formatOptions.url = 'http://github.com/scipy/scipy';
```
#### Style
The style template of the output citation. The framework currently supports the following formats:
* apa
* chicago
* bibtexMisc
* biblatexSoftware

```javascript
formatOptions.style = CitationCore.styles.apa;
```
#### API Token
A token field for GitHub OAuth. Required for GitHub URL's.
### Errors
The callback for the `generate` function second parameters is an array of errors. Not all errors are created equal. Some errors are critical and will halt generation, however some will be a warning.  In this case the citation generation will complete. If the citationStr parameter is `null` a critical error has occurred.

## API Documentation
[API Documentation](https://mozillascience.github.io/CitationCore/) is viewable on github pages or locally in the docs directory.
