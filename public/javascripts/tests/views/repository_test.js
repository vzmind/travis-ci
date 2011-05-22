describe('Views: the repository show view', function() {
  beforeEach(function() {
    follow('svenfuchs/minimal', '#repositories');
  });

  it('shows the current repository', function() {
    var repository = Travis.Repository.find(1)
    expect(repository.get('slug')).toBe('svenfuchs/minimal');
    expect('#repository').toShowRepository(repository);
  });
});
