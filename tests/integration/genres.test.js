'use strict';

const request = require('supertest');
let server;

describe('/api/genres', () => {
  /**
   * We are going to load server before doing test, and close it after the test.
   * Otherwise, server is up and running after the test,
   * which will crash the next test or next server launch.
   */
  beforeEach(() => { server = require('../../index'); });
  afterEach(() => { server.close(); });

  describe('GET /', () => {
    it('should return all the genres', async () => {
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
    });
  });
  // describe('GET /', () => {});
  // describe('GET /', () => {});
  // describe('GET /', () => {});
  // describe('GET /', () => {});
});