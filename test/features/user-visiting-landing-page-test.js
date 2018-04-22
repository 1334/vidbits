const {assert} = require('chai');

describe('visiting /', () => {
  describe('when there are no videos', () => {
    it('the videos container should be empty', () => {
      browser.url('/');

      assert.equal(browser.getText('#videos-container'), '');
    });
  });

  describe('when there are some videos created', () => {
    it('it display the information of the created videos', () => {
      const { title, description, url } = createVideo();

      assert.include(browser.getText('#videos-container'), title);
      assert.include(browser.getAttribute('iframe.video-player', 'src'), url);
      assert.include(browser.getAttribute('.video-title a', 'href'), '/videos/');
    });
  });
});

const createVideo = (options = {}) => {
  const title = options.title || 'Some existing title';
  const description = options.description || 'Some existing description';
  const url = options.url || generateRandomUrl('example.com');

  browser.url('/videos/create');
  browser.setValue('#url-input', url);
  browser.setValue('#title-input', title);
  browser.setValue('#description-input', description);
  browser.click('#submit-video-btn');
  browser.click('.title-logo a');

  return { title, description, url };
};

const generateRandomUrl = (domain) => {
  return `http://${domain}/${Math.random()}`;
};
