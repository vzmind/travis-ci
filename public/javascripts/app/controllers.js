Travis.repositoriesController = SC.ArrayController.create({
});

Travis.repositoryController = SC.ObjectController.create({
  load: function(params) {
    this.params = params;
    this.activateTab(params.tab);
    this.set('content', Travis.Repository.bySlug(params.owner + '/' + params.repository));
  },
  activateTab: function(tab) {
    this.activeTabController = Travis[tab + 'TabController'];
    $('#repository .tabs > li').removeClass('active');
    $('#repository #tab_' + tab).addClass('active');
  },
  repositoryObserver: function() {
    var repository = Travis.repositoryController.getPath('content.firstObject');
    if(repository) {
      this.activeTabController.load(repository, this.params);
    }
  }.observes('Travis.repositoryController.*content'),
});

Travis.currentTabController = SC.ObjectController.create(Travis.Helpers.Build, {
  load: function(repository, params) {
    this.set('content', repository.get('lastBuild'));
  },
});

Travis.buildsTabController = SC.ArrayController.create({
  load: function(repository, params) {
    this.set('content', repository.get('builds'));
  }
});

Travis.buildTabController = SC.ObjectController.create(Travis.Helpers.Build, {
  load: function(repository, params) {
    this.set('content', Travis.Build.find(params.id));
  },
});

