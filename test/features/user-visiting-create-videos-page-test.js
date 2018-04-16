const {assert} = require('chai');

describe('visiting create videos page', () => {
  it('is reachable from the home page', () => {
    browser.url('/');
    browser.click('#save-video-btn');

    assert.include(browser.getText('body'), 'Save a video');
  });

  describe('filling the form', () => {
    it('creates a new video entry', () => {
      const title = 'Some title';
      const description = 'Some description';
      browser.url('/videos/create.html');

      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.click('#submit-video-btn');

      assert.include(browser.getText('#videos-container'), title);
      assert.include(browser.getText('#videos-container'), description);
    });
  });
});
