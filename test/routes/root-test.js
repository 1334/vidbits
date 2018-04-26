const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');

describe('/ GET', () => {
  it('redirects to /videos', async () => {
    const response = await request(app).get('/');

    assert.equal(response.status, 301);
  });
});
