describe('Models: Repository', function() {
  it('latest sorts repositories by their lastBuildStartedAt attribute', function() {
    var latest = Travis.Repository.latest();
    var repository = Travis.Repository.find(1);

    whenLoaded(latest, function() {
      expect(latest.getEach('slug').toArray()).toEqual(['josevalim/enginex', 'svenfuchs/minimal']);
      withinRunLoop(function() {
        repository.set('lastBuildFinishedAt', '2011-05-10T02:20:00Z');
      });
      expect(latest.getEach('slug').toArray()).toEqual(['svenfuchs/minimal', 'josevalim/enginex']);
    });
  });

  it("the latest repositories sort order is updated when a build's startedAt attribute is updated", function() {
    var startedAt  = '2011-05-22T22:22:00Z';
    var finishedAt = '2011-05-22T22:22:22Z';
    var repository = Travis.Repository.find(2);

    whenLoaded(repository, function() {
      var builds = repository.get('builds');

      whenLoaded(builds, function() {
        var build = builds.firstObject();

        withinRunLoop(function() {
          build.set('startedAt', startedAt);
          build.set('finishedAt', finishedAt); // TODO can use a snakecase attribute name for started_at but not finished_at
        });

        expect(Travis.Repository.latest().getEach('slug')).toEqual(['josevalim/enginex', 'svenfuchs/minimal']);
      });
    });
  });

  it('find returns the repository with the given id', function() {
    var repository = Travis.Repository.find(2);
    whenLoaded(repository, function() {
      expect(repository.get('slug')).toEqual('josevalim/enginex');
    });
  });

  it("given a conditions hash all returns an array containing the repository with the given slug", function() {
    var repositories = Travis.Repository.all({ slug: 'josevalim/enginex' });
    whenLoaded(repositories, function() {
      expect(repositories.getEach('slug')).toEqual(['josevalim/enginex']);
    });
  });

  it("builds returns the repository's builds, not including child builds", function() {
    var repository = Travis.Repository.find(2);
    whenLoaded(repository, function() {
      var builds = repository.get('builds');

      whenLoaded(builds, function() {
        expect(builds.getEach('number')).toEqual(['2', '1']);
      });
    });
  });

  it('updates the builds collection when a new build is added', function() {
    var repository = Travis.Repository.find(1);
    whenLoaded(repository, function() {
      withinRunLoop(function() {
        Travis.store.loadRecord(Travis.Build, {
          repository_id: repository.get('id'),
          number: '5',
          started_at: '2011-05-13T00:00:00Z'
        });
      });

      var builds = repository.get('builds');
      whenLoaded(builds, function() {
        expect(builds.getEach('number')).toEqual(['5', '2', '1'])
      });
    });
  });
});
