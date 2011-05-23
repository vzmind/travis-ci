describe('Views: the builds history tab', function() {
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

  beforeEach(function() {
    goTo('svenfuchs/minimal/builds');

    repository = Travis.Repository.find(1);
    whenLoaded(repository, function() {
      builds = repository.builds();
      waitsFor(function() { return builds.get('status') & SC.Record.READY });
    });
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
    withinRunLoop(function() {
      Travis.store.loadRecord(Travis.Build, $.extend(buildAttributes, { repository_id: repository.get('id') }));
    });

    var build = builds.firstObject();
    expect(build.get('number')).toEqual('5');
    expect('#tab_current').toShowBuildSummary(build);
  });

  it('updates the builds history table when a build is updated', function() {
    withinRunLoop(function() {
      builds.firstObject().update(buildAttributes);
    });

    expect('#tab_builds #builds').toMatchTable([
      ['Build', 'Commit',            'Message',        'Duration', 'Finished' ],
      ['5',     '1234567 (testing)', 'commit message' ], // TODO
    ]);
  });
});


