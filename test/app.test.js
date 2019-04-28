const request = require('supertest');
const knex = require('../db/knex');
const app = require('../app')
const expect = require('chai').expect;
const fixtures = require('./fixtures');

describe('CRUD test', () => {
  before((done) => {
    knex.migrate.latest()
    .then(() => {
      return knex.seed.run();
    }).then(() => done());
  });

  it('Lists all records', (done) =>{
    request(app)
      .get('/api/v1/stickers')
      .set('Accept', 'application/json')
      .expect('Content-type',/json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('array');
        expect(response.body).to.deep.equal(fixtures.stickers);
        done();
      })
  });

  it('Lists one records', (done) =>{
    request(app)
      .get('/api/v1/stickers/1')
      .set('Accept', 'application/json')
      .expect('Content-type',/json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.stickers[0]);
        done();
      })
  });

  it('Lists one records', (done) =>{
    request(app)
      .get('/api/v1/stickers/5')
      .set('Accept', 'application/json')
      .expect('Content-type',/json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.stickers[4]);
        done();
      })
  });

  it('creates sticker', (done) =>{
    request(app)
      .post('/api/v1/stickers/')
      .send(fixtures.sticker)
      .set('Accept', 'application/json')
      .expect('Content-type',/json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object')
        expect(response.body).to.deep.equal(fixtures.sticker);
        done();
      });
  });

  it('edits sticker', (done) =>{
    fixtures.sticker.rating = 10;
    request(app)
      .put('/api/v1/stickers/10')
      .send(fixtures.sticker)
      .set('Accept', 'application/json')
      .expect('Content-type',/json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object')
        expect(response.body).to.deep.equal(fixtures.sticker);
        done();
      });
  });

  it('deletes sticker', (done) =>{
    request(app)
      .delete('/api/v1/stickers/10')
      .send(fixtures.sticker)
      .set('Accept', 'application/json')
      .expect('Content-type',/json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object')
        expect(response.body).to.deep.equal({
          deleted: true
        });
        done();
      });
  });
});