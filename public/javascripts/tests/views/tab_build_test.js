describe('Views: the build view tab', function() {
  var build;
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
      goTo('svenfuchs/minimal/builds/2');
      build = Travis.Build.find(2);
      waitsFor(function() { return build.isLoaded(); })
    });

    it('has the build tab activated', function() {
      expect('#repository').toShowActiveTab('build');
    });

    it('shows the build summary', function() {
      expect(build.get('number')).toBe('2');
      expect('#tab_current').toShowBuildSummary(build);
    });

    it('shows the build log', function() {
      var build = Travis.Build.find(2);
      expect('#tab_current').toShowBuildLog(build.get('log'));
    });

    it('updates the build summary when the respective build gets updated', function() {
      var build = Travis.Build.find(2);
      withinRunLoop(function() {
        build.update(buildAttributes);
      });
      expect('#tab_build').toShowBuildSummary(build);
    });
  });

  describe('with a matrix build', function() {
    beforeEach(function() {
      goTo('josevalim/enginex/builds/6');
      build = Travis.Build.find(6);
      waitsFor(function() { return build.isLoaded(); })
    });

    it('has the build tab activated', function() {
      expect('#repository').toShowActiveTab('build');
    });

    it('shows the build summary', function() {
      expect(build.get('number')).toBe('2');
      expect('#tab_current').toShowBuildSummary(build);
    });

    it('shows the build matrix', function() {
      expect(build.get('number')).toBe('2');
      expect('#tab_current #matrix').toMatchTable([
        // 'Gemfile', 'Rvm'
        // 'test/Gemfile.rails-2.3.x', '1.8.7'
        // 'test/Gemfile.rails-3.0.x', '1.8.7'
        ['Build', 'Rvm', 'Duration', 'Finished'           ], // TODO
        ['2.1',   '',    '10 sec',   'about 3 hours ago' ],
        ['2.2',   '',    '10 sec',   'about 3 hours ago' ],
      ]);
    });
  });
});



