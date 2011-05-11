describe('Views: the jobs list', function() {
  beforeEach(function() {
  });

  it('shows a list of workers', function() {
    expect('#jobs ul li').not.toBeEmpty();
  });
});


