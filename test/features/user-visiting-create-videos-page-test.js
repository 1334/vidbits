const {assert} = require('chai');

describe('visiting create videos page', () => {
  it('is reachable from the home page', () => {
    browser.url('/');
    browser.click('#save-video-btn');

    assert.include(browser.getText('body'), 'Save a video');
  });
});
