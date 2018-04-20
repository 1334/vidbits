const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');
const app = require('../../app');
const Video = require('../../models/video');

describe('/videos', () => {

  beforeEach(connectDatabaseAndDropData);
  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('can render existing videos', async () => {
      const video = await Video.create({ title: 'existing title', description: 'existing video description' });
      const response = await request(app).get('/videos');

      assert.include(response.text, video.title);
    });
  });

  describe('POST', () => {
    it('can create a video', async () => {
      const response = await request(app)
        .post('/videos')
        .type('form')
        .send();

      assert.equal(response.status, 201);
    });


    it('saves video to the database', async () => {
      const title = 'Title to save';
      const description = 'Description to save';

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send({title, description});
      const createdItem = await Video.findOne({});

      assert.equal(createdItem.title, title);
      assert.equal(createdItem.description, description);
    });
  });
});
