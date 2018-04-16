const {assert} = require('chai');

describe('visiting /', () => {
  describe('when there are no videos', () => {
    it('the videos container should be empty', () => {
      browser.url('/');

      assert.equal(browser.getText('#videos-container'), '');
    });
  });
});
