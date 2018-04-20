const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');
const app = require('../../app');
const Video = require('../../models/video');

describe('/ GET', () => {
  it('redirects to /videos', async () => {
    const response = await request(app).get('/');

    assert.equal(response.status, 301);
  });
});
