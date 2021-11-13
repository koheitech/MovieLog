'use strict';

const request = require('supertest');
const {Genre} = require('../../models/genre');
const mongoose = require('mongoose');

let server;

describe('/api/genres', () => {
  /**
   * We are going to load server before doing test, and close it after the test.
   * Otherwise, server is up and running after the test,
   * which will crash the next test or next server launch.
   */
  beforeEach(() => { server = require('../../index'); });
  afterEach(async () => { 
    server.close(); 
    await Genre.remove({});
  });

  describe('GET /', () => {
    it('should return all the genres', async () => {
      await Genre.collection.insertMany([
        { name: 'genre1'},
        { name: 'genre2'}
      ]);
      const res = await request(server).get('/api/genres');
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a genre if valid id is passed', async () => {
      const genre = new Genre({ name: 'genre1' });
      await genre.save();

      const res = await request(server).get('/api/genres/' + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);     
    });
    // it('should return 404 if valid id is not found', () => {});
  });
  // describe('GET /', () => {});
  // describe('GET /', () => {});
  // describe('GET /', () => {});
});