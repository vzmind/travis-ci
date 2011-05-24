var Fixtures = function() {
  Fixtures.load();
  this.createServer();
}
$.extend(Fixtures, {
  json: {},
  instance: function() {
    this._instance = this._instance || new Fixtures();
    return this._instance;
  },
  serve: function() {
    this.instance().serve();
  },
  load: function() {
    $.each(FIXTURES, function(ix, path) {
      var url = '/javascripts/tests/fixtures/models/%@.json'.fmt(path);
      $.ajax({ url: url, dataType: 'text', async: false, success: function(response) { Fixtures.json[path] = response; } })
    });
  },
});
$.extend(Fixtures.prototype, {
  serve: function() {
    this.serveFixtures();
  },
  createServer: function() {
    this.server = sinon.fakeServer.create();
    this.server.autoRespond = true;
  },
  serveFixtures: function() {
    $.each(Fixtures.json, function(path, json) {
      this.server.respondWith('GET', new RegExp('^/' + path + '.json\\\??'), [200, { 'Content-Type': 'application/json' }, json]);
    }.bind(this));
  }
});

Fixtures.serve()
