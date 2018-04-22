const {jsdom} = require('jsdom');

const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

const buildVideoObject = (options = {}) => {
  const title = options.title || 'Some video title';
  const description = options.description || 'Same video awesome description';
  const url = options.url || generateRandomUrl('example.com');
  return {title, description, url};
};

const generateRandomUrl = (domain) => {
  return `http://${domain}/${Math.random()}`;
};

module.exports = {
  parseTextFromHTML,
  buildVideoObject,
  generateRandomUrl
}
