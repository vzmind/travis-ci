describe('Views: the repositories list', function() {
  it('highlights the selected repository (1)', function() {
    var minimal = Travis.Repository.find(1);
    whenLoaded(minimal, function() {
      withinRunLoop(function() {
        minimal.select();
      });

      withinRunLoop(function() {
        expect($('#repositories .selected .slug').text()).toBe(minimal.get('slug'));
      });
    });
  });

  it('highlights the selected repository (2)', function() {
    var enginex = Travis.Repository.find(2);
    whenLoaded(enginex, function() {
      withinRunLoop(function() {
        enginex.select();
      });
      expect($('#repositories .selected .slug').text()).toBe(enginex.get('slug'));
    });
  });

  it('shows the stored repositories', function() {
    var repositories = Travis.controllers.repositories.get('content');
    whenLoaded(repositories, function() {
      expect(repositories.getEach('slug')).toEqual('josevalim/enginex svenfuchs/minimal'.w());
      expect('#repositories').toListRepositories(repositories);
    });
  });

  it('updates a repository list item view when the respective repository gets updated', function() {
    var repository = Travis.Repository.find(1);
    whenLoaded(repository, function() {
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
    whenLoaded(latest, function() {
      expect('#repositories').toListRepositories(latest);
      withinRunLoop(function() {
        Travis.Repository.update(1, { lastBuildFinishedAt: '2011-05-10T02:20:00Z' });
      })
      expect('#repositories').toListRepositories(latest);
    });
  });
});
