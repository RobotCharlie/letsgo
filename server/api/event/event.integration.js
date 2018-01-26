'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newThing;

describe('Event API:', function() {
  describe('GET /api/events', function() {
    var events;

    beforeEach(function(done) {
      request(app)
        .get('/api/events')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          events = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(events).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/events', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/events')
        .send({
          name: 'New Event',
          info: 'This is the brand new event!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newThing = res.body;
          done();
        });
    });

    it('should respond with the newly created event', function() {
      expect(newThing.name).to.equal('New Event');
      expect(newThing.info).to.equal('This is the brand new event!!!');
    });
  });

  describe('GET /api/events/:id', function() {
    var thing;

    beforeEach(function(done) {
      request(app)
        .get(`/api/events/${newThing._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          thing = res.body;
          done();
        });
    });

    afterEach(function() {
      thing = {};
    });

    it('should respond with the requested event', function() {
      expect(thing.name).to.equal('New Event');
      expect(thing.info).to.equal('This is the brand new event!!!');
    });
  });

  describe('PUT /api/events/:id', function() {
    var updatedThing;

    beforeEach(function(done) {
      request(app)
        .put(`/api/events/${newThing._id}`)
        .send({
          name: 'Updated Event',
          info: 'This is the updated event!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedThing = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedThing = {};
    });

    it('should respond with the updated event', function() {
      expect(updatedThing.name).to.equal('Updated Event');
      expect(updatedThing.info).to.equal('This is the updated event!!!');
    });

    it('should respond with the updated event on a subsequent GET', function(done) {
      request(app)
        .get(`/api/events/${newThing._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thing = res.body;

          expect(thing.name).to.equal('Updated Event');
          expect(thing.info).to.equal('This is the updated event!!!');

          done();
        });
    });
  });

  describe('PATCH /api/events/:id', function() {
    var patchedThing;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/events/${newThing._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Event' },
          { op: 'replace', path: '/info', value: 'This is the patched event!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedThing = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedThing = {};
    });

    it('should respond with the patched event', function() {
      expect(patchedThing.name).to.equal('Patched Event');
      expect(patchedThing.info).to.equal('This is the patched event!!!');
    });
  });

  describe('DELETE /api/events/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/events/${newThing._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when event does not exist', function(done) {
      request(app)
        .delete(`/api/events/${newThing._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
