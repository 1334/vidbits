const {assert} = require('chai');
const request = require('supertest');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');
const {parseTextFromHTML, buildVideoObject} = require('../test-utils.js');
const app = require('../../app');
const Video = require('../../models/video');

describe('/videos', () => {

  beforeEach(connectDatabaseAndDropData);
  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('can render existing videos', async () => {
      const video = await Video.create(buildVideoObject());
      const response = await request(app).get('/videos');

      assert.include(response.text, video.title);
    });
  });

  describe('POST', () => {
    it('saves video to the database', async () => {
      const videoAttrs = buildVideoObject();

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(videoAttrs);
      const createdItem = await Video.findOne({});

      assert.include(createdItem, videoAttrs);
    });

    it('redirects to the show page', async () => {
      const videoAttrs = buildVideoObject();

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(videoAttrs);
      const createdItem = await Video.findOne(videoAttrs);

      assert.equal(response.status, 302);
      assert.equal(response.headers.location, `/videos/${createdItem._id}`);
    });

    describe('with a missing title', () => {
      it('doesn\'t save the video', async () => {
        const videoAttrs = buildVideoObject();
        videoAttrs.title = '';

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(videoAttrs);
        const videos = await Video.find({});

        assert.equal(videos.length, 0);
      });

      it('responds with a 400 status code', async () => {
        const videoAttrs = buildVideoObject();
        videoAttrs.title = '';
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(videoAttrs);

        assert.equal(response.status, 400);
      });

      it('renders the video/create form', async () => {
        const videoAttrs = buildVideoObject();
        videoAttrs.title = '';
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(videoAttrs);

        assert.exists(parseTextFromHTML(response.text, '#title-input'));
      });

      it('renders validation errors', async () => {
        const videoAttrs = buildVideoObject();
        videoAttrs.title = '';
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(videoAttrs);

        assert.include(parseTextFromHTML(response.text, 'label[for=title] > span'), 'required');
      });

      it('preserves other values', async () => {
        const videoAttrs = buildVideoObject();
        videoAttrs.title = '';

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(videoAttrs);

        assert.include(parseTextFromHTML(response.text, 'form'), videoAttrs.description);
      });
    });

    describe('with a missing url', () => {
      it('doesn\'t save the video', async () => {
        const videoAttrs = buildVideoObject();
        videoAttrs.url = '';

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(videoAttrs);
        const videos = await Video.find({});

        assert.equal(videos.length, 0);
      });

      it('responds with a 400 status code', async () => {
        const videoAttrs = buildVideoObject();
        videoAttrs.url = '';
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(videoAttrs);

        assert.equal(response.status, 400);
      });

      it('renders the video/create form', async () => {
        const videoAttrs = buildVideoObject();
        videoAttrs.url = '';
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(videoAttrs);

        assert.exists(parseTextFromHTML(response.text, '#url-input'));
      });

      it('renders validation errors', async () => {
        const videoAttrs = buildVideoObject();
        videoAttrs.url = '';
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(videoAttrs);

        assert.include(parseTextFromHTML(response.text, 'label[for=url] > span'), 'required');
      });

      it('preserves other values', async () => {
        const videoAttrs = buildVideoObject();
        videoAttrs.url = '';

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(videoAttrs);

        assert.include(response.text, videoAttrs.title);
      });
    });
  });
});
