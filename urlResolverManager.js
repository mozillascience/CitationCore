const GithubAPI = require('./urlResolvers/github');

const resolvers = [GithubAPI];

/**
 * A module for resolving a URL to a source handler.
 * @module URLResolverManager
 */
module.exports = {
  /**
   * Gets the generator for the given url
   * @param {string} url - The url to pattern match to the generator
   * @return {SourceHandler} the source handler for the URL or null if the URL is not supported
   */
  getHandler: (url) => {
    let handlers = [];
    resolvers.forEach((obj) => {
      handlers = handlers.concat(obj.getSourceHandlers(url));
    });

    // TODO: There should be some logic based on environment settings to distill array down to one handler
    // For now we will select the first one
    return (handlers.length > 0) ? handlers.pop() : null;
  },
};
