const {assert} = require('chai');
const request = require('supertest');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');
const {parseTextFromHTML} = require('../test-utils.js');
const app = require('../../app');
const Video = require('../../models/video');

describe('/videos/:id', () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(disconnectDatabase);

  it('shows the video with the given id', async () => {
    const video = await Video.create({ title: 'new video title', description: 'amazing video description' });
    const response = await request(app).get(`/videos/${video._id}`)

    assert.include(response.text, video.title);
  });
});
