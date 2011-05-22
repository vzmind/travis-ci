describe('Views: the workers list', function() {
  beforeEach(function() {
  });

  it('shows a list of workers', function() {
    expect('#workers ul > *').not.toBeEmpty(); // TODO should be an li, but actually is a div. bug in sc: empty row should use tagName depending on parent tagName
  });
});

