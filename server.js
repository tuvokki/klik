var restify = require('restify'),
    userSave = require('save')('user'),
    cardSave = require('save')('card')

var server = restify.createServer({ name: 'my-api' })

server.use(restify.CORS());
server.use(restify.fullResponse());

server.listen(7676, function () {
  console.log('%s listening at %s', server.name, server.url)
})

server
  .use(restify.fullResponse())
  .use(restify.bodyParser())

server.get('/user', function (req, res, next) {
  userSave.find({}, function (error, users) {
    res.send(users)
  })
})

server.post('/card/:user', function (req, res, next) {
  console.log("req.params.name", req.params.name);
  if (req.params.name === undefined || req.params.name == "") {
    return next(new restify.InvalidArgumentError('Name must be supplied'))
  }
 
  cardSave.create({ name: req.params.name, user: req.params.id }, function (error, card) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
 
    res.send(201, card)
  })
})

server.post('/user', function (req, res, next) {
  console.log("req.params.name", req.params.name);
  if (req.params.name === undefined || req.params.name == "") {
    return next(new restify.InvalidArgumentError('Name must be supplied'))
  }
 
  userSave.create({ name: req.params.name }, function (error, user) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
 
    res.send(201, user)
  })
})

server.get('/user/:id', function (req, res, next) {
  userSave.findOne({ _id: req.params.id }, function (error, user) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
 
    if (user) {
      res.send(user)
    } else {
      res.send(404)
    }
  })
})

server.put('/user/:id', function (req, res, next) {
  if (req.params.name === undefined || req.params.name == "") {
    return next(new restify.InvalidArgumentError('Name must be supplied'))
  }
 
  userSave.update({ _id: req.params.id, name: req.params.name }, function (error, user) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    res.send()
  })
})

server.del('/user/:id', function (req, res, next) {
  userSave.delete(req.params.id, function (error, user) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
 
    res.send()
  })
})