Travis.controllers = SC.Object.create({
  repositories: SC.ArrayController.create({
    load: function() {
      this.set('content', Travis.Repository.latest());
    },
  }),
  repository: SC.SingleObjectController.create({
    tabs: SC.Object.create({
      active: null,
      current: SC.ObjectController.create(Travis.Helpers.Build, {
        name: 'current',
        load: function(repository, params) {
          this.set('content', repository.lastBuild());
        }
      }),
      builds: SC.ArrayController.create(Travis.Helpers.Build, {
        name: 'builds',
        load: function(repository, params) {
          this.set('content', repository.builds());
        },
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
      this.set('content', this.repository(params));
    },
    repository: function(params) {
      if(params.owner && params.repository) {
        return Travis.Repository.bySlug(params.owner + '/' + params.repository);
      } else {
        return Travis.Repository.latest();
      }
    },
    activateTab: function(tab) {
      this.tabs.set('active', this.tabs[tab]);
      $('#repository .tabs > li').removeClass('active');
      $('#repository #tab_' + tab).addClass('active');
    },
    repositoryObserver: function() {
      var repository = this.getPath('content.firstObject');
      if(repository) {
        var activeTab = this.tabs.get('active');
        activeTab.set('content', null);
        activeTab.load(repository, this.params);
        repository.select();
      }
    }.observes('*content'),
  }),
  jobs: SC.ArrayController.create({
    load: function() {
      this.set('content', Travis.Job.all());
    }
  }),
  workers: SC.ArrayController.create({
    load: function() {
      this.set('content', Travis.Worker.all());
    }
  }),
});

