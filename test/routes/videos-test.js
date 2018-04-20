const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');
const app = require('../../app');
const Video = require('../../models/video');

describe('/videos GET', () => {

  beforeEach(connectDatabaseAndDropData);
  afterEach(disconnectDatabase);

  it('can render existing videos', async () => {
    const video = await Video.create({ title: 'existing title', description: 'existing video description' });
    const response = await request(app).get('/videos');

    assert.include(response.text, video.title);
  });
});
