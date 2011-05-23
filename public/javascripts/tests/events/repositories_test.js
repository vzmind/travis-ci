var EVENT_PAYLOADS = {
  'build:started': function(repository, options) {
    var build = Travis.Build.find(8);
    return {
      build: $.extend(options || {}, {
        id: build.get('id'),
        repository_id: repository.get('id'),
        number: '99',
        started_at:  '2011-05-22T22:22:00Z',
        finished_at: '2011-05-22T22:22:22Z',
        commit: '1111111',
        committer_name: 'committer name',
        committer_email: 'committer@email.com',
        message: 'build message',
        log: 'build log ... '
      })
    };
  }
}

describe('Events: the repositories list', function() {
  describe('for an existing repository', function() {
    beforeEach(function() {
    });

    it('build:started sorts the repository to the top of the list', function() {
      var minimal = Travis.Repository.find(1);
      var enginex = Travis.Repository.find(2);
      // expect($('#repositories .repository:first-child .slug').text()).toBe(minimal.get('slug'));

      // withinRunLoop(function() {
      //   var build = Travis.Build.find(8);
      //   waitsFor(function() { return build.get('status') & SC.Record.READY })

      //   runs(function() {
      //     console.log(EVENT_PAYLOADS['build:started'](enginex).build.repository_id)
      //     Travis.receive('build:started', EVENT_PAYLOADS['build:started'](enginex));
      //   })
      // });
      // runs(function() {
      //   expect($('#repositories .repository:first-child .slug').text()).toBe(enginex.get('slug'));
      // })
    });
  });

  // describe('for a new repository', function() {
  //   it('build:started sorts the repository to the top of the list', function() {
  //     var minimal = Travis.Repository.find(1);
  //     var enginex = Travis.Repository.find(2);
  //     expect($('#repositories .repository:first-child .slug').text()).toBe(minimal.get('slug'));

  //     withinRunLoop(function() {
  //       Travis.receive('build:started', EVENT_PAYLOADS['build:started'](enginex));
  //     });
  //     expect($('#repositories .repository:first-child .slug').text()).toBe(enginex.get('slug'));
  //   });
  // });
});
