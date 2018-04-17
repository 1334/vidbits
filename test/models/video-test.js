const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');
const Video = require('../../models/video');

async function connectDatabase() {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}

describe('Video model', () => {
  describe('#title', () => {
    it('is a string', () => {
      const titleAsNonString = 1;
      const video = new Video({title: titleAsNonString});

      assert.strictEqual(video.title, titleAsNonString.toString());
    });
  });

  describe('#description', () => {
    it('is a string', () => {
      const descriptionAsNonString = 3;
      const video = new Video({description: descriptionAsNonString});

      assert.strictEqual(video.description, descriptionAsNonString.toString());
    });
  });
});

module.exports = {
  connectDatabase,
  disconnectDatabase,
}
