var FIXTURES = [
  'models/repositories.json',
  'models/repositories/1/builds.json',
  'models/repositories/2/builds.json',
  'models/builds/1.json',
  'models/builds/2.json',
  'models/builds/3.json',
  'models/builds/4.json',
  'models/builds/5.json',
  'models/builds/6.json',
  'models/builds/7.json',
  'models/builds/8.json',
  'models/jobs.json',
  'models/workers.json'
];

beforeEach(function() {
  // jasmine.serveFixtures();
  jasmine.clock = sinon.useFakeTimers(Date.parse('2010-11-12T17:00:30Z'), 'Date');

  SC.RunLoop.begin();
  Travis.store = SC.Store.create().from(SC.Record.fixtures);
  Travis.main();
  SC.RunLoop.end();
});

afterEach(function() {
  jasmine.clock.restore();

  SC.RunLoop.begin();
  Travis.store.reset();
  Travis.getPath('mainPane').remove();
  SC.RunLoop.end();
});

var withinRunLoop = function(block) {
  SC.RunLoop.begin();
  var result = block.call();
  SC.RunLoop.end();
  return result;
};
