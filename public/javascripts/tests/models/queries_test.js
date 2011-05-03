describe('Queries:', function() {
  describe('LatestRepositories', function() {
    beforeEach(function() {
      this.query = Travis.Queries.LatestRepositories.create();
    });

    it('retrieves the latest repositories in descending order by their latest builds', function() {
      expect(Travis.store.find(this.query).getEach('id')).toEqual([1, 2]);
    });

    it('returns /repositories as an url', function() {
      expect(this.query.url()).toBe('/repositories.json');
    });
  });

  describe('RepositoryBuilds', function() {
    beforeEach(function() {
      this.query = Travis.Queries.RepositoryBuilds.create({ repositoryId: '2' });
    });

    it('RepositoryBuilds retrieves the builds belonging to the given repository that are not matrix child builds in descending order', function() {
      expect(Travis.store.find(this.query).getEach('id')).toEqual(['3', '6']);
    });

    it('returns /repositories/:id/builds as an url', function() {
      expect(this.query.url()).toBe('/repositories/2/builds.json');
    });
  });

  describe('BuildMatrix', function() {
    beforeEach(function() {
      this.query = Travis.Queries.BuildMatrix.create({ buildId: '3' });
    });

    it('BuildMatrix retrieves the matrix child builds belonging to the given build', function() {
      expect(Travis.store.find(this.query).getEach('id')).toEqual(['4', '5']);
    });

    it('returns /builds/:id/builds as an url', function() {
      expect(this.query.url()).toBe('/builds/3/builds.json');
    });
  });
});
