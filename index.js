var restify = require('restify');
var server = restify.createServer({
    name: 'selfies',
});

function send(req, res, next) {
 res.send(
  {
    _id: "542c4f7f595b786925a2a08b",
    about: "nice nice hoor",
    name: "Nice",
    __v: 0,
    picture: "http://selfies.dev/static/uploads/b8874dec5f11e0a9861b348b8f9a6178.png",
    isActive: true,
    uploaded: "2014-10-01T19:01:19.921Z",
    creationDate: "2014-10-01T19:01:19.921Z"
  }
  );
 return next();
}

server.post('/hello', function create(req, res, next) {
 res.send(201, Math.random().toString(36).substr(3, 8));
 return next();
});

server.put('/hello', send);
server.get('/hello/:name', send);
server.head('/hello/:name', send);
server.del('hello/:name', function rm(req, res, next) {
 res.send(204);
 return next();
});

server.listen(7676, function() {
  console.log('%s listening at %s', server.name, server.url);
});