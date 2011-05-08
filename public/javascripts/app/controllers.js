Travis.controllers = SC.Object.create({
  repositories: SC.ArrayController.create({
    init: function() {
      this.set('content', Travis.Repository.latest());
    }
  }),
  repository: SC.SingleObjectController.create({
    tabs: SC.Object.create({
      current: SC.ObjectController.create(Travis.Helpers.Build, {
        name: 'current',
        load: function(repository, params) {
          this.set('content', repository.lastBuild());
        }
      }),
      builds: SC.ArrayController.create({
        name: 'builds',
        load: function(repository, params) {
          this.set('content', repository.builds());
        }
      }),
      build: SC.ObjectController.create(Travis.Helpers.Build, {
        name: 'build',
        load: function(repository, params) {
          this.set('content', Travis.Build.find(params.id));
        },
      })
    }),
    load: function(params) {
      this.params = params;
      this.activateTab(params.tab);
      this.set('content', null);
      this.set('content', Travis.Repository.bySlug(params.owner + '/' + params.repository));
    },
    activateTab: function(tab) {
      this.tabs.active = this.tabs[tab];
      $('#repository .tabs > li').removeClass('active');
      $('#repository #tab_' + tab).addClass('active');
    },
    repositoryObserver: function() {
      var repository = this.getPath('content.firstObject');
      if(repository) {
        this.tabs.active.set('content', null);
        this.tabs.active.load(repository, this.params);
      }
    }.observes('*content'),
  }),
  jobs: SC.ArrayController.create({
    init: function() {
      this.set('content', Travis.Job.all());
    }
  }),
  workers: SC.ArrayController.create({
    init: function() {
      this.set('content', Travis.Worker.all());
    }
  }),
});

