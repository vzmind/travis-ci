describe('Views: the repository show view', function() {
  it('shows the current repository', function() {
    var repository = Travis.repositoryController.get('content');
    expect(repository.get('slug')).toBe('svenfuchs/minimal');
    expect('#repository').toShowRepository(repository);
  });

  describe('the current build tab', function() {
    describe('with a non-matrix build', function() {
      it('the current build tab shows the build summary', function() {
        var build = Travis.buildController.get('content');
        expect(build.get('number')).toBe('2');
        expect('#tab_current').toShowBuildSummary(build);
      });

      it('the current build tab shows the build log', function() {
        var build = Travis.buildController.get('content');
        expect(build.get('number')).toBe('2');
        expect('#tab_current').toShowBuildLog(build.get('log'));
      });
    });
  });
});
