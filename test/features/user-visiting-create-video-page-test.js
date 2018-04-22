const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('visiting create videos page', () => {
  it('is reachable from the home page', () => {
    browser.url('/');
    browser.click('#save-video-btn');

    assert.include(browser.getText('body'), 'Save a video');
  });

  describe('filling the form', () => {
    it('creates a new video entry', () => {
      const video = buildVideoObject();

      browser.url('/videos/create');
      browser.setValue('#url-input', video.url);
      browser.setValue('#title-input', video.title);
      browser.setValue('#description-input', video.description);
      browser.click('#submit-video-btn');

      assert.include(browser.getText('body'), video.title);
      assert.include(browser.getText('body'), video.description);
      assert.include(browser.getAttribute('iframe.video-player', 'src'), video.url);
    });
  });
});
