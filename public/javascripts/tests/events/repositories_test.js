var EVENT_PAYLOADS = {
  'build:started': function(repository) {
    var build = repository.builds().firstObject();
    return {
      build: {
        id: build.get('id') + 1,
        // repository_id: repository.get('id'),
        number: parseInt(Travis.Build.all().lastObject()) + 1,
        started_at: '2011-05-22T22:22:00Z',
        finished_at: '2011-05-22T22:22:22Z',
        commit: '1111111',
        committer_name: 'committer name',
        committer_email: 'committer@email.com',
        message: 'build message',
        log: 'build log ... '
      }
    };
  }
}

describe('Events: the repositories list', function() {
  describe('for an existing repository', function() {
    it('build:started sorts the repository to the top of the list', function() {
      var minimal = Travis.Repository.find(1);
      var enginex = Travis.Repository.find(2);
      expect($('#repositories .repository:first-child .slug').text()).toBe(minimal.get('slug'));

      withinRunLoop(function() {
        Travis.receive('build:started', EVENT_PAYLOADS['build:started'](enginex));
      });
      expect($('#repositories .repository:first-child .slug').text()).toBe(enginex.get('slug'));
    });
  });
});
