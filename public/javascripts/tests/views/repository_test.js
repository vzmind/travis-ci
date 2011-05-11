describe('Views: the repository show view', function() {
  beforeEach(function() {
    follow('svenfuchs/minimal', '#repositories');
    follow('Current');
    waits(300)
  });

  it('shows the current repository', function() {
    // var repository = Travis.controllers.repository.get('content');
    // var repository = Travis.Repository.find(1)
    // expect(repository.get('slug')).toBe('svenfuchs/minimal');
    // expect('#repository').toShowRepository(repository);
  });
});
