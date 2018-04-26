const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('deleting a video', () => {
  it('deletes the video', () => {
    const video = buildVideoObject({ title: 'Video to delete title' });

    browser.url('/videos/create');
    browser.setValue('#url-input', video.url);
    browser.setValue('#title-input', video.title);
    browser.setValue('#description-input', video.description);
    browser.click('#submit-video-btn');

    browser.click('#delete');

    browser.url('/');

    assert.notInclude(browser.getText('body'), video.title);
  });
});
