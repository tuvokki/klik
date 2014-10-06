var should = require('should'),
    supertest = require('supertest'),
    chance = require('chance').Chance(),
    api = supertest('http://localhost:7676')

describe('/user', function() {
  for (var i = 0; i < 10; i++) {
    it ('adds a random user', function(done) {
      rndname = chance.word()
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
  }
})