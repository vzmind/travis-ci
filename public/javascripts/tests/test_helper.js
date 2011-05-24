var __TEST__ = true;

var FIXTURES = [
  'repositories',
  'repositories/1',
  'repositories/1/builds',
  'repositories/2',
  'repositories/2/builds',
  'repositories/3',
  'builds/1',
  'builds/2',
  'builds/3',
  'builds/4',
  'builds/5',
  'builds/6',
  'builds/7',
  'builds/8',
  'builds/9',
  'jobs',
  'workers'
];

beforeEach(function() {
  jasmine.clock = sinon.useFakeTimers(Date.parse('2011-01-01T06:00:00Z'), 'Date');

  window.location.hash = '';
  var mainPane = Travis.get('mainPane');
  if(mainPane) mainPane.remove();

  withinRunLoop(function() {
    // if(Travis.store) Travis.store.dataSource._fixtures = null;
    // Travis.store = SC.Store.create().from(SC.Record.fixtures);
    Travis.store = SC.Store.create().from('Travis.DataSource');
    Travis.main();
  })
});

afterEach(function() {
  if(jasmine.clock) jasmine.clock.restore();
});

var withinRunLoop = function(block) {
  SC.RunLoop.begin();
  var result = block();
  SC.RunLoop.end();
  return result;
};

var whenLoaded = function(object, callback) {
  waitsFor(function() {
    var path = object.kindOf(SC.ChildArray) ? 'firstObject.status' : 'status';
    return object.getPath(path) & SC.Record.READY;
  });
  runs(function() {
    callback();
  });
};

var runsAfter = function(time, func) {
  waits(time);
  jasmine.getEnv().currentSpec.runs(func);
};

var runsWhen = function(condition, func) {
  waitsFor(condition);
  jasmine.getEnv().currentSpec.runs(func);
};

var follow = function(text, context) {
  runs(function() {
    withinRunLoop(function() {
      var link;
      waitsFor('a link containing "%@"'.fmt(text), function() {
        link = $('a:contains("' + text + '")', context);
        return link.length != 0;
      });
      runs(function() {
        goTo(link.attr('href'));
      });
    });
  })
  waits(1); // no idea why this helps, is sc that fast? :)
};

var goTo = function(hash, expectations) {
  runs(function() {
    withinRunLoop(function() {
      window.location.hash = normalizeHash(hash);
      SC.routes.set('location', '#' + window.location.hash)
    });
  });
  if(expectations) runs(expectations);
};

var normalizeHash = function(hash) {
  hash = '#!/' + hash.replace(/^\//, '').replace('#!/', '');
  return hash.replace(/#|!|\//) == '' ? '' : hash;
};


