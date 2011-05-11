describe('Models: Repository', function() {
  it('find returns the repository with the given id', function() {
    var repository = Travis.Repository.find(2);
    expect(repository.get('slug')).toEqual('josevalim/enginex');
  });

  it('latest returns the latest repositories order by their last build', function() {
    var repositories = Travis.Repository.latest();
    expect(repositories.getEach('slug')).toEqual(['svenfuchs/minimal', 'josevalim/enginex']);
  });

  it("bySlug returns an array containing the repository with the given slug", function() {
    var repositories = Travis.Repository.bySlug('josevalim/enginex');
    expect(repositories.getEach('slug')).toEqual(['josevalim/enginex']);
  });

  it("builds returns the repository's builds, not including child builds", function() {
    var builds = Travis.Repository.find(2).get('builds');
    expect(builds.getEach('number').sort()).toEqual(['1', '2']); // TODO shouldn't need to sort here
  });
});
