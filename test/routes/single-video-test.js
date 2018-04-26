const {assert} = require('chai');
const request = require('supertest');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');
const {jsdom} = require('jsdom');
const {buildVideoObject} = require('../test-utils.js');
const app = require('../../app');
const Video = require('../../models/video');

describe('/videos/:id', () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(disconnectDatabase);

  it('shows the video with the given id', async () => {
    const video = await Video.create(buildVideoObject());
    const response = await request(app).get(`/videos/${video._id}`)

    assert.include(response.text, video.title);
    assert.include(response.text, video.description);
    assert.equal(jsdom(response.text).querySelector('iframe.video-player').attributes['src'].textContent, video.url);
  });
});

describe('/videos/:id/edit', () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(disconnectDatabase);

  it('renders a form for the video edit', async () => {
    const video = await Video.create(buildVideoObject());
    const response = await request(app).get(`/videos/${video._id}/edit`)

    assert.include(response.text, video.title);
    assert.include(response.text, video.description);
    assert.include(response.text, video.url);
  });
});

describe('/videos/:id/update', () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(disconnectDatabase);

  describe('when the parameters are correct', () => {
    it('updates an existing video', async () => {
      const oldTitle = 'Same old title';
      const newTitle = 'Some shiny new title';
      const video = await Video.create(buildVideoObject({ title: oldTitle }));

      const response = await request(app)
        .post(`/videos/${video._id}/update`)
        .type('form')
        .send({ title: newTitle });

      assert.equal((await Video.findById(video._id)).title, newTitle);
    });

    it('redirects back to the show page', async () => {
      const video = await Video.create(buildVideoObject());

      const response = await request(app)
        .post(`/videos/${video._id}/update`)
        .type('form')
        .send({ title: 'Some other title' });

      assert.equal(response.status, 302);
    });
  });

  describe('when the parameters are incorrect', () => {
    it('responds with a 400 status code', async () => {
      const video = await Video.create(buildVideoObject());

      const response = await request(app)
        .post(`/videos/${video._id}/update`)
        .type('form')
        .send({ title: '' });

      assert.equal(response.status, 400);
    });

    it('renders back the form', async () => {
      const video = await Video.create(buildVideoObject());

      const response = await request(app)
        .post(`/videos/${video._id}/update`)
        .type('form')
        .send({ url: '' });

      assert.include(response.text, 'update-form');
    });
  });
});

describe('/video/:id/delete', () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(disconnectDatabase);

  it('deletes a video', async () => {
    const video = await Video.create(buildVideoObject());

    const response = await request(app)
      .post(`/videos/${video._id}/delete`)
      .type('form')
      .send();

    console.log(await Video.findById(video._id));
    assert.isNotOk(await Video.findById(video._id));
  });
});
