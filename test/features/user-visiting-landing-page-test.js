const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('visiting /', () => {
  describe('when there are no videos', () => {
    it('the videos container should be empty', () => {
      browser.url('/');

      assert.equal(browser.getText('#videos-container'), '');
    });
  });

  describe('when there are some videos created', () => {
    it('it display the information of the created videos', () => {
      const video = buildVideoObject();

      browser.url('/videos/create');
      browser.setValue('#url-input', video.url);
      browser.setValue('#title-input', video.title);
      browser.setValue('#description-input', video.description);
      browser.click('#submit-video-btn');

      browser.click('.title-logo a');

      assert.include(browser.getText('#videos-container'), video.title);
      assert.include(browser.getAttribute('iframe.video-player', 'src'), video.url);
      assert.include(browser.getAttribute('.video-title a', 'href'), '/videos/');
    });
  });
});


