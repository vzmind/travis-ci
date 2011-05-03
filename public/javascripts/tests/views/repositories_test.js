describe('Views: the repositories list', function() {
  it('shows the stored repositories', function() {
    var repositories = Travis.repositoriesController.get('content').toArray();

    expect(repositories[0].get('slug')).toBe('svenfuchs/minimal');
    expect('#repositories li:nth-child(1)').toListRepository(repositories[0]);

    expect(repositories[1].get('slug')).toBe('josevalim/enginex');
    expect('#repositories li:nth-child(2)').toListRepository(repositories[1]);
  });

  it('updates a repository list item view when the respective repository gets updated', function() {
    var repository = Travis.store.find(Travis.Repository, 1)
    withinRunLoop(function() {
       repository.set('slug', 'svenfuchs/updated');
    });
    expect($('#repositories li:nth-child(1) .slug').text()).toEqual('svenfuchs/updated')
  });

  it('adds a repository list item view when a repository gets added', function() {
  });
});


