describe('Views: the current build tab', function() {
  var repository;
  var builds;
  var buildAttributes = {
    number: '5',
    commit: '1234567',
    branch: 'testing',
    message: 'commit message',
    author_name: 'Jose Valim',
    author_email: 'jose@gmail.com',
    committer_name: 'Chris Floess',
    committer_email: 'chris@gmail.com',
    started_at: '2011-05-14T02:20:00Z',
    finished_at: '2011-05-14T02:20:40Z'
  };

  describe('with a non-matrix build', function() {
    beforeEach(function() {
      goTo('svenfuchs/minimal');

      repository = Travis.Repository.find(1);
      whenLoaded(repository, function() {
        builds = repository.builds();
        waitsFor(function() { return builds.get('status') & SC.Record.READY });
      });
    });

    it('has the current tab activated', function() {
      expect('#repository').toShowActiveTab('current');
    });

    it('shows the build summary', function() {
      var build = builds.firstObject();
      expect(build.get('number')).toBe('2');
      expect('#tab_current').toShowBuildSummary(build);
    });

    it('shows the build log', function() {
      var build = builds.firstObject();
      expect(build.get('number')).toBe('2');
      expect('#tab_current').toShowBuildLog(build.get('log'));
    });

    it('updates the build summary when the respective build gets updated', function() {
      var build = builds.firstObject();
      withinRunLoop(function() {
        build.update(buildAttributes);
      }.bind(this));
      expect('#tab_current').toShowBuildSummary(build);
    });

    it('updates the build summary to a new build added to the repository', function() {
      withinRunLoop(function() {
        Travis.store.loadRecord(Travis.Build, $.extend(buildAttributes, { repository_id: repository.get('id') }));
      });

      var build = builds.firstObject();
      expect(build.get('number')).toEqual('5');
      expect('#tab_current').toShowBuildSummary(build);
    });
  });

  describe('with a matrix build', function() {
    beforeEach(function() {
      goTo('josevalim/enginex');

      repository = Travis.Repository.find(2);
      whenLoaded(repository, function() {
        builds = repository.builds();
        waitsFor(function() { return builds.get('status') & SC.Record.READY });
      });
    });

    it('has the current tab activated', function() {
      expect('#repository').toShowActiveTab('current');
    });

    it('shows the build summary', function() {
      var build = builds.firstObject();
      expect(build.get('number')).toBe('2');
      expect('#tab_current').toShowBuildSummary(build);
    });

    it('shows the build matrix', function() {
      var build = builds.firstObject();
      expect(build.get('number')).toBe('2');
      expect('#tab_current #matrix').toMatchTable([
        // 'Gemfile', 'Rvm'
        // 'test/Gemfile.rails-2.3.x', '1.8.7'
        // 'test/Gemfile.rails-3.0.x', '1.8.7'
        ['Build', 'Rvm', 'Duration', 'Finished'           ],
        ['2.1',   '',    '10 sec',   'about 3 hours ago' ],
        ['2.2',   '',    '10 sec',   'about 3 hours ago' ],
      ]);
    });
  });
});

