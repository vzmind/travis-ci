describe('Views: the repositories list', function() {
  it('highlights the selected repository', function() {
    var minimal = Travis.Repository.find(1);
    var enginex = Travis.Repository.find(2);

    withinRunLoop(function() {
      minimal.select();
    });
    expect($('#repositories .selected .slug').text()).toBe(minimal.get('slug'));

    withinRunLoop(function() {
      enginex.select();
    });
    expect($('#repositories .selected .slug').text()).toBe(enginex.get('slug'));
  });

  it('shows the stored repositories', function() {
    var repositories = Travis.controllers.repositories.get('content').toArray();

    expect(repositories.getEach('slug')).toEqual('svenfuchs/minimal josevalim/enginex'.w());
    expect('#repositories').toListRepositories(repositories);
  });

  it('updates a repository list item view when the respective repository gets updated', function() {
    var repository = Travis.Repository.find(1);

    withinRunLoop(function() {
      repository.update({
        slug: 'was/updated',
        lastBuildNumber: '3',
        lastBuildStatus: '1',
        lastBuildStartedAt: '2011-05-14T02:20:00Z',
        lastBuildFinishedAt: '2011-05-14T02:20:40Z'
      });
    });
    expect('#repositories li:nth-child(1)').toListRepository(repository);
  });

  it('adds a repository list item view when a repository gets loaded to the store', function() {
    withinRunLoop(function() {
      Travis.store.loadRecord(Travis.Repository, {
        slug: 'new/record',
        last_build_number: '1',
        last_build_status: '0',
        last_build_started_at:  '2011-05-14T02:20:00Z',
        last_build_finished_at: '2011-05-14T02:20:40Z'
      });
    });
    expect($('#repositories li:nth-child(1) .slug').text()).toEqual('new/record')
  });

  it('sorts repositories by their lastBuildStartedAt attribute', function() {
    var latest = Travis.Repository.latest();

    expect('#repositories').toListRepositories(latest);
    withinRunLoop(function() {
      Travis.Repository.update(1, { lastBuildFinishedAt: '2011-05-10T02:20:00Z' });
    })
    expect('#repositories').toListRepositories(latest);
  });
});
