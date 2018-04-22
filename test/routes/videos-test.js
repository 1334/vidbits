const {assert} = require('chai');
const request = require('supertest');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');
const {parseTextFromHTML} = require('../test-utils.js');
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
        .send({ title: 'some title' });

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

    describe('whith a missing title', () => {
      it('doesn\'t save the video', async () => {
        const title = '';
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send({title});
        const videos = await Video.find({});

        assert.equal(videos.length, 0);
      });

      it('responds with a 400 status code', async () => {
        const title = '';
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send({title});

        assert.equal(response.status, 400);
      });

      it('renders the video/create form', async () => {
        const title = '';
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send({title});

        assert.exists(parseTextFromHTML(response.text, '#title-input'));
      });

      it('renders validation errors', async () => {
        const title = '';
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send({title});

        assert.include(parseTextFromHTML(response.text, 'form'), 'required');
      });

      it('preserves other values', async () => {
        const title = '';
        const description = 'video with errors description';
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send({title, description});

        assert.include(parseTextFromHTML(response.text, 'form'), description);
      });
    });
  });
});
