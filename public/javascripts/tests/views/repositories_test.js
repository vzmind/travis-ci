describe('Views: the repositories list', function() {
  it('shows the stored repositories', function() {
    var repositories = Travis.controllers.repositories.get('content').toArray();

    expect(repositories[0].get('slug')).toBe('svenfuchs/minimal');
    expect('#repositories li:nth-child(1)').toListRepository(repositories[0]);

    expect(repositories[1].get('slug')).toBe('josevalim/enginex');
    expect('#repositories li:nth-child(2)').toListRepository(repositories[1]);
  });

  // it('updates a repository list item view when the respective repository gets updated', function() {
  //   withinRunLoop(function() {
  //     Travis.Repository.find(1).set('slug', 'was/updated');
  //   });
  //   expect($('#repositories li:nth-child(1) .slug').text()).toEqual('was/updated')
  // });

  // it('adds a repository list item view when a repository gets added', function() {
  //   withinRunLoop(function() {
  //     Travis.store.loadRecord(Travis.Repository, { slug: 'new/record' });
  //   });
  //   expect($('#repositories li:nth-child(1) .slug').text()).toEqual('new/record')
  // });
});
