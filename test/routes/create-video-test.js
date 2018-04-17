const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');
const app = require('../../app');

describe('POST /videos', () => {
  it('can create a video', async () => {
    const response = await request(app)
    .post('/videos')
    .type('form')
    .send();

    assert.equal(response.status, 201);
  });
});
