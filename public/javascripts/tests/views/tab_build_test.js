describe('Views: the build view tab', function() {
  describe('with a non-matrix build', function() {
    beforeEach(function() {
      follow('svenfuchs/minimal', '#repositories');
      follow('2', '#repository');
    });

    it('has the build tab activated', function() {
      expect('#repository').toShowActiveTab('build');
    });

    it('shows the build summary', function() {
      // var build = Travis.controllers.repository.tabs.current.get('content');
      var build = Travis.Repository.find(1).get('builds').firstObject();
      expect(build.get('number')).toBe('2');
      expect('#tab_current').toShowBuildSummary(build);
    });

    it('shows the build log', function() {
      // var build = Travis.buildController.get('content');
      var build = Travis.Repository.find(1).get('builds').firstObject();
      expect(build.get('number')).toBe('2');
      expect('#tab_current').toShowBuildLog(build.get('log'));
    });
  });

  describe('with a matrix parent build', function() {
    beforeEach(function() {
      follow('josevalim/enginex', '#repositories');
      follow('2', '#repository');
    });

    it('has the build tab activated', function() {
      expect('#repository').toShowActiveTab('build');
    });

    it('shows the build summary', function() {
      // var build = Travis.controllers.repository.tabs.current.get('content');
      // var build = Travis.Repository.find(2).get('builds').firstObject();
      var build = Travis.Build.find(6);
      expect(build.get('number')).toBe('2');
      expect('#tab_current').toShowBuildSummary(build);
    });

    it('shows the build matrix', function() {
      // var build = Travis.buildController.get('content');
      // var build = Travis.Repository.find(2).get('builds').firstObject();
      var build = Travis.Build.find(6);
      expect(build.get('number')).toBe('2');
      expect('#tab_current #matrix').toMatchTable([
        // ['Build', 'Gemfile', 'Rvm'  ],
        // ['3.1',   'test/Gemfile.rails-2.3.x', '1.8.7'],
        // ['3.2',   'test/Gemfile.rails-3.0.x', '1.8.7'],
        ['Build'  ],
        ['2.1' ],
        ['2.2' ],
      ]);
    });
  });
});



