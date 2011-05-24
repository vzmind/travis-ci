var EVENT_PAYLOADS = {
  'build:started:1': { build: { id: 8, repository_id: 1, number: '99', started_at: '2011-01-02T00:00:00Z' } },
  'build:started:2': { build: { id: 9, repository_id: 3, number: '99', started_at: '2011-01-02T00:00:00Z' } }
}

describe('Events: the repositories list', function() {
  var minimal, enginex;

  describe('for an existing repository', function() {
    describe('build:started', function() {
      beforeEach(function() {
        withinRunLoop(function() {
          Travis.receive('build:started', EVENT_PAYLOADS['build:started:1']);
          waits(10);
        });
      });

      it('sorts the repository to the top of the list', function() {
        expect($('#repositories .repository:first-child .slug').text()).toBe('svenfuchs/minimal');
      });
    });
  });

  describe('for a new repository', function() {
    describe('build:started', function() {
      beforeEach(function() {
        withinRunLoop(function() {
          Travis.receive('build:started', EVENT_PAYLOADS['build:started:2']);
          waitsFor(function() { return Travis.Repository.find(3).isLoaded() })
        });
      });

      it('sorts the repository to the top of the list', function() {
        expect($('#repositories .repository:first-child .slug').text()).toBe('svenfuchs/gem-release');
      });
    });
  });
});
