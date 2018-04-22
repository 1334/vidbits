const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('editing a video', () => {
  it('updates it\'s attributes', () => {
    const video = buildVideoObject({ title: 'some old title' });
    const newTitle = 'shinny new title';

    browser.url('/videos/create');
    browser.setValue('#url-input', video.url);
    browser.setValue('#title-input', video.title);
    browser.setValue('#description-input', video.description);
    browser.click('#submit-video-btn');

    browser.click('#edit');
    browser.setValue('#title-input', newTitle);
    browser.click('#submit-video-btn');

    assert.include(browser.getText('.video-title'), newTitle);
    assert.include(browser.getText('.video-description'), video.description);
  });
});
