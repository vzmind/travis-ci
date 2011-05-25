var EVENT_PAYLOADS = {
  'build:started:1': { build: { id: 9, repository_id: 1, number: '9a', started_at: '2011-01-02T00:00:00Z', log: 'new build log' } },
  'build:started:2': { build: { id: 9, repository_id: 3, number: '9b', started_at: '2011-01-02T00:00:00Z', log: 'new build log' } },
  'build:started:3': { build: { id: 9, repository_id: 2, number: '9c', started_at: '2011-01-02T00:00:00Z', config: { rvm: ['1.8.7', '1.9.2'] }, matrix: [ { id: 10, parent_id: 9, repository_id: 2, number: '9c.1', config: { rvm: '1.8.7' } }, { id: 11, parent_id: 9, repository_id: 2, number: '9c.2', config: { rvm: '1.9.2' } }, ] } },
  'build:started:4': { build: { id: 9, repository_id: 3, number: '9d', started_at: '2011-01-02T00:00:00Z', config: { rvm: ['1.8.7', '1.9.2'] }, matrix: [ { id: 10, parent_id: 9, repository_id: 3, number: '9d.1', config: { rvm: '1.8.7' } }, { id: 11, parent_id: 9, repository_id: 3, number: '9d.2', config: { rvm: '1.9.2' } }, ] } },
}

describe('Events:', function() {
  var minimal, enginex;

  describe('on the current repository tab', function() {
    beforeEach(function() {
      goTo('');
    });

    describe('build:started', function() {
      describe('for a non-matrix build', function() {
        describe('for an existing repository', function() {
          beforeEach(function() {
            withinRunLoop(function() {
              Travis.receive('build:started', EVENT_PAYLOADS['build:started:1']);
              waits(100);
            });
          });

          it('sorts the repository to the top of the repositories list', function() {
            expect($('#repositories .repository:first-child .slug').text()).toBe('svenfuchs/minimal');
          });

          it('displays the build summary for that build', function() {
            expect($('#repository #tab_current .summary .number').text()).toBe('9a');
          });

          it('displays the log for that build', function() {
            expect($('#repository #tab_current .log').text()).toBe('new build log');
          });
        });

        describe('for a new repository', function() {
          beforeEach(function() {
            withinRunLoop(function() {
              Travis.receive('build:started', EVENT_PAYLOADS['build:started:2']);
              waitsFor(function() { return Travis.Repository.find(3).isLoaded() })
            });
          });

          it('sorts the repository to the top of the repositories list', function() {
            expect($('#repositories .repository:first-child .slug').text()).toBe('svenfuchs/gem-release');
          });

          it('displays the build summary for that build', function() {
            expect($('#repository #tab_current .summary .number').text()).toBe('9b');
          });

          it('displays the log for that build', function() {
            expect($('#repository #tab_current .log').text()).toBe('new build log');
          });
        });
      });

      describe('for a matrix build', function() {
        describe('for an existing repository', function() {
          beforeEach(function() {
            withinRunLoop(function() {
              Travis.receive('build:started', EVENT_PAYLOADS['build:started:3']);
              waits(100);
            });
          });

          it('sorts the repository to the top of the repositories list', function() {
            expect($('#repositories .repository:first-child .slug').text()).toBe('josevalim/enginex');
          });

          it('displays the build summary for that build', function() {
            expect($('#repository #tab_current .summary .number').text()).toBe('9c');
          });

          it('displays the build matrix table for that build', function() {
            expect($('#repository #tab_current #matrix tbody tr:nth-child(1) .number').text()).toBe('9c.1');
            expect($('#repository #tab_current #matrix tbody tr:nth-child(2) .number').text()).toBe('9c.2');
          });
        });

        describe('for a new repository', function() {
          beforeEach(function() {
            withinRunLoop(function() {
              Travis.receive('build:started', EVENT_PAYLOADS['build:started:4']);
              waitsFor(function() { return Travis.Repository.find(3).isLoaded() })
            });
          });

          it('sorts the repository to the top of the repositories list', function() {
            expect($('#repositories .repository:first-child .slug').text()).toBe('svenfuchs/gem-release');
          });

          it('displays the build summary for that build', function() {
            expect($('#repository #tab_current .summary .number').text()).toBe('9d');
          });

          it('displays the log for that build', function() {
            expect($('#repository #tab_current #matrix tbody tr:nth-child(1) .number').text()).toBe('9d.1');
            expect($('#repository #tab_current #matrix tbody tr:nth-child(2) .number').text()).toBe('9d.2');
          });
        });
      });
    });
  });
});
