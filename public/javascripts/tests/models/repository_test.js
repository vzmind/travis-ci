describe('Repository', function() {
  it("builds returns the repository's builds, not including child builds", function() {
    var repository = Travis.store.find(Travis.Repository, 2);
    expect(repository.get('builds').getEach('number')).toEqual(['1', '2']);
  });
});
