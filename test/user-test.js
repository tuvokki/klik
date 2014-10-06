var should = require('should'),
    supertest = require('supertest'),
    chance = require('chance').Chance(),
    api = supertest('http://localhost:7676'),
    rndname = chance.word(),
    firstresult = 1

describe('/user', function() {
 
  it ('posts a user and returns a user object', function(done) {
    api.post('/user')
    .send({ name:  rndname })
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err)
      res.body.should.have.property('name').and.be.instanceof(String).and.equal(rndname)
      done()
    })
  })

  it('returns user list as JSON', function(done) {
    api.get('/user')
    .set('x-api-key', '123myapikey')
    .auth('correct', 'credentials')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err)
      res.body.should.be.instanceof(Array)
      firstresult = res.body[0]._id
      done()
    })
  })

  //change the rnd name for update and fetch
  rndname = chance.word()
  it('updates the first user in the database', function(done) {
    api.put('/user/' + firstresult)
    .send({ name:  rndname })
    .expect(200)
    // .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err)
      done()
    })
  })

  it('returns the first user in the database as JSON', function(done) {
    api.get('/user/' + firstresult)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err)
      res.body.should.have.property('name').and.be.instanceof(String).and.equal(rndname)
      done()
    })
  })

  it('deletes the first user in the database', function(done) {
    api.del('/user/' + firstresult)
    .expect(200)
    // .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err)
      done()
    })
  })
 
});