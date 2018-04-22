const {assert} = require('chai');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');
const Video = require('../../models/video');

describe('Video model', () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(disconnectDatabase);

  describe('#title', () => {
    it('is a string', () => {
      const titleAsNonString = 1;
      const video = new Video({title: titleAsNonString});

      assert.strictEqual(video.title, titleAsNonString.toString());
    });

    it('is required', () => {
      const video = new Video({});
      video.validateSync();

      assert.equal(video.errors.title.message, 'Path `title` is required.');
    });
  });

  describe('#description', () => {
    it('is a string', () => {
      const descriptionAsNonString = 3;
      const video = new Video({description: descriptionAsNonString});

      assert.strictEqual(video.description, descriptionAsNonString.toString());
    });
  });

  describe('#url', () => {
      const urlAsNonString = 7;
      const video = new Video({url: urlAsNonString});

      assert.strictEqual(video.url, urlAsNonString.toString());
  });
});
