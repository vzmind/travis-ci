// Fixtures = function() {
//   this.cache = {};
// }
// $.extend(Fixtures, {
//   instance: function() {
//     this._instance = this._instance || new Fixtures();
//     return this._instance;
//   },
//   recordAndServe: function() {
//     this.instance().recordAndServe();
//   }
// });
// $.extend(Fixtures.prototype, {
//   recordAndServe: function() {
//     this.createServer();
//     this.server.suspend();
//   }
//   createServer: function() {
//     var server  = sinon.fakeServer.create();
//     this.server = $.extend(server, {
//       autoRespond: true,
//       _processRequest: server.processRequest,
//       processRequest: function(request) {
//         this._processRequest(request);
//       },
//       suspend: function(callback) {
//         this.server.xhr.restore();
//         if(callback) callback();
//         this.server.xhr = sinon.useFakeXMLHttpRequest();
//       }
//     });
//   }
// });
//
// Fixtures.recordAndServe();

jasmine.serveFixtures = function() {
  if(jasmine.fixtures) return;

  jasmine.loadFixtures(FIXTURES);

  jasmine.server = sinon.fakeServer.create();
  jasmine.server.autoRespond = true;
  $.each(jasmine.json, function(path, json) {
    path = path.replace('models', '').replace('.json', '');
    var response = [200, { 'Content-Type': 'application/json' }, json];
    jasmine.server.respondWith('GET', new RegExp('^' + path + '\\\?_=\\\d+$'), response);
  }.bind(this));
};

jasmine.loadFixtures = function(paths) {
  jasmine.json = {}
  $.each(paths, function(ix, path) { jasmine.json[path] = jasmine.retrieveFixture(path); });

  jasmine.fixtures = {};
  $.each(jasmine.json, function(path, json) { jasmine.fixtures[path] = JSON.parse(json); });
}

jasmine.loadJson = function(paths) {
  return jasmine.json;
};

jasmine.retrieveFixture = function(fixtureName) {
  var path = '/javascripts/tests/fixtures/' + fixtureName + "?" + new Date().getTime();
  var xhr;

  try {
    xhr = new jasmine.XmlHttpRequest();
    xhr.open("GET", path, false);
    xhr.send(null);
  } catch(e) {
    throw new Error("couldn't fetch " + path + ": " + e);
  }
  var regExp = new RegExp(/Couldn\\\'t load \/fixture/);
  if (regExp.test(xhr.responseText)) {
    throw new Error("Couldn't load fixture with key: '" + fixtureName + "'. No such file: '" + path + "'.");
  }

  return xhr.responseText;
};


