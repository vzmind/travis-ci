describe('Build', function() {
  it("matrix returns the build's (matrix) child builds", function() {
    var build = Travis.store.find(Travis.Build, 3);
    expect(build.get('matrix').getEach('number')).toEqual(['1.1', '1.2']);
  });
});

