describe('Views: the current build tab', function() {
  describe('with a non-matrix build', function() {
    beforeEach(function() {
      follow('svenfuchs/minimal', '#repositories');

      this.buildAttributes = {
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
    });

    it('has the current tab activated', function() {
      expect('#repository').toShowActiveTab('current');
    });

    it('shows the build summary', function() {
      var build = Travis.Repository.find(1).get('builds').firstObject();
      expect(build.get('number')).toBe('2');
      expect('#tab_current').toShowBuildSummary(build);
    });

    it('shows the build log', function() {
      var build = Travis.Repository.find(1).get('builds').firstObject();
      expect(build.get('number')).toBe('2');
      expect('#tab_current').toShowBuildLog(build.get('log'));
    });

    it('updates the build summary when the respective build gets updated', function() {
      var build = Travis.Repository.find(1).get('builds').firstObject();
      withinRunLoop(function() {
        build.update(this.buildAttributes);
      }.bind(this));
      expect('#tab_current').toShowBuildSummary(build);
    });

    it('updates the build summary to a new build added to the repository', function() {
      var repository = Travis.Repository.find(1);
      withinRunLoop(function() {
        Travis.store.loadRecord(Travis.Build, $.extend(this.buildAttributes, {
          repository_id: repository.get('id')
        }));
      }.bind(this));

      var build = repository.get('builds').firstObject();
      expect(build.get('number')).toEqual('5');
      expect('#tab_current').toShowBuildSummary(build);
    });
  });

  describe('with a matrix build', function() {
    beforeEach(function() {
      follow('josevalim/enginex', '#repositories');
    });

    it('has the current tab activated', function() {
      expect('#repository').toShowActiveTab('current');
    });

    it('shows the build summary', function() {
      // var build = Travis.controllers.repository.tabs.current.get('content');
      var build = Travis.Repository.find(2).get('builds').firstObject();
      expect(build.get('number')).toBe('2');
      expect('#tab_current').toShowBuildSummary(build);
    });

    it('shows the build matrix', function() {
      var build = Travis.Repository.find(2).get('builds').firstObject();
      expect(build.get('number')).toBe('2');
      expect('#tab_current #matrix').toMatchTable([
        // 'Gemfile', 'Rvm'
        // 'test/Gemfile.rails-2.3.x', '1.8.7'
        // 'test/Gemfile.rails-3.0.x', '1.8.7'
        ['Build', 'Rvm', 'Duration', 'Finished'           ],
        ['2.1',   '',    '20 sec',   'about 23 hours ago' ],
        ['2.2',   '',    '20 sec',   'about 23 hours ago' ],
      ]);
    });
  });
});

