var __TEST__ = true;

beforeEach(function() {
  jasmine.clock = sinon.useFakeTimers(Date.parse('2010-11-12T17:00:30Z'), 'Date');

  window.location.hash = '';
  var mainPane = Travis.get('mainPane');
  if(mainPane) mainPane.remove();
  if(Travis.store) Travis.store = null;

  withinRunLoop(function() {
    Travis.store = SC.Store.create().from(SC.Record.fixtures); // .from('Travis.DataSource')
    Travis.main();
  })
});

afterEach(function() {
  jasmine.clock.restore();
});

var withinRunLoop = function(block) {
  SC.RunLoop.begin();
  var result = block.call();
  SC.RunLoop.end();
  return result;
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
      var link = $('a:contains("' + text + '")', context);
      if(link.length == 0) {
        throw('could not find a link "' + text + '"')
      }
      goTo(link.attr('href'));
    });
  })
  waits(1); // no idea why this helps, is sc that fast? :)
};

var goTo = function(hash, expectations) {
  runs(function() {
    window.location.hash = normalizeHash(hash);
    SC.routes.set('location', '#' + window.location.hash)
  });
  if(expectations) runs(expectations);
};

var normalizeHash = function(hash) {
  hash = '#!/' + hash.replace(/^\//, '').replace('#!/', '');
  return hash.replace(/#|!|\//) == '' ? '' : hash;
};


