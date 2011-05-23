describe('Models: Build', function() {
  it('find returns the build with the given id', function() {
    var build = Travis.Build.find(2);
    expect(build.get('number')).toEqual('2');
  });

  it('byRepositoryId returns the builds with the given repositoryId', function() {
    var builds = Travis.Build.byRepositoryId(1);
    expect(builds.getEach('number')).toEqual(['2', '1']);
  });

  it("matrix returns the build's (matrix) child builds", function() {
    var matrix = Travis.Build.find(3).get('matrix');
    expect(matrix.getEach('number')).toEqual(['1.1', '1.2']);
  });

  it("configDimensions returns the build's camelized config keys", function() {
    var build = Travis.Build.find(3);
    expect(build.get('configDimensions')).toEqual(['Rvm']);
  });

  it("configValues returns the (child) build's camelized config values", function() {
    var build = Travis.Build.find(4);
    expect(build.get('configValues')).toEqual(['1.8.7']);
  });

  it("updates the repository's lastBuild attributes after update", function() {
    var repository = Travis.Repository.find(1);
    var build  = repository.get('builds').firstObject();
    var date_1 = '2011-05-13T00:00:00Z';
    var date_2 = '2011-05-14T00:00:00Z'

    expect(repository.get('lastBuildStartedAt')).not.toEqual(date_1);
    expect(repository.get('lastBuildFinishedAt')).not.toEqual(date_1);

    withinRunLoop(function() {
      build.update({ startedAt: date_1, finishedAt: date_1 });
    });

    expect(repository.get('lastBuildStartedAt')).toEqual(date_1);
    expect(repository.get('lastBuildFinishedAt')).toEqual(date_1);

    withinRunLoop(function() {
      build.update({ startedAt: date_2, finishedAt: date_2 });
    });

    expect(repository.get('lastBuildStartedAt')).toEqual(date_2);
    expect(repository.get('lastBuildFinishedAt')).toEqual(date_2);
  });

  it("updates the repository's lastBuild attributes after update (2)", function() {
    var repository = Travis.Repository.find(2);
    var build = repository.builds().firstObject();
    var startedAt  = '2011-05-22T22:22:00Z';
    var finishedAt = '2011-05-22T22:22:22Z';

    withinRunLoop(function() {
      build.set('started_at', startedAt);
      build.set('finishedAt', finishedAt); // TODO can use a snakecase attribute name for started_at but not finished_at
    });

    expect(repository.get('lastBuildStartedAt')).toEqual(startedAt);
    expect(repository.get('lastBuildFinishedAt')).toEqual(finishedAt);
  });
});
