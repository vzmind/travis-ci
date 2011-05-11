describe('Views: the workers list', function() {
  beforeEach(function() {
  });

  it('shows a list of workers', function() {
    expect('#workers ul li').not.toBeEmpty();
  });
});

