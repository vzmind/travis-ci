describe('Views: the builds history tab', function() {
  beforeEach(function() {
    follow('svenfuchs/minimal');
    follow('Build History');

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

  it('has the builds tab activated', function() {
    expect('#repository').toShowActiveTab('builds');
  });

  // TODO assert the build color
  it('shows the builds history table', function() {
    expect('#tab_builds #builds').toMatchTable([
      ['Build', 'Commit',           'Message',        'Duration', 'Finished' ],
      ['2',     '91d1b7b (master)', 'Bump to 0.0.22', ], // TODO
      ['1',     '1a738d9 (master)', 'Add Gemfile'     ],
    ]);
  });

  it('updates the builds history table when a new build is added', function() {
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

  // TODO
  it('updates the builds history table when a build is updated', function() {
    var build = Travis.Repository.find(1).get('builds').firstObject();
    withinRunLoop(function() {
      build.update(this.buildAttributes);
    }.bind(this));

    expect('#tab_builds #builds').toMatchTable([
      ['Build', 'Commit',            'Message',        'Duration', 'Finished' ],
      ['5',     '1234567 (testing)', 'commit message' ], // TODO
    ]);
  });
});


