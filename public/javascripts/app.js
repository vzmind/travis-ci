Travis = SC.Application.create({
  main: function() {
    SC.routes.add('!/:owner/:repository/builds/:id', Travis.dispatch, 'build');
    SC.routes.add('!/:owner/:repository/builds', Travis.dispatch, 'history');
    SC.routes.add('!/:owner/:repository', Travis.dispatch, 'current');

    Travis.mainPane = SC.TemplatePane.append({
      layerId: 'travis',
      templateName: 'travis'
    });

    var repositories = Travis.Repository.latest();
    Travis.repositoriesController.set('content', repositories);

    if(repositories.length() > 0) { // TODO seems to be async?
      var tokens = repositories.objectAt(0).get('slug').split('/');
      Travis.app.current({ owner: tokens[0], repository: tokens[1] });
    }
  },
  store: SC.Store.create().from('Travis.DataSource') // .from(SC.Record.fixtures)
});

Travis.dispatch = SC.Object.create({
  current: function(params) {
    var repositories = this._repositoriesBySlug(params);
    var build = Travis.store.find(Travis.Build, 2);

    Travis.repositoriesBySlugController.set('content', repositories);
    // Travis.buildController.set('content', build);
    this._activateTab('current');
  },
  history: function(params) {
    var repositories = this._repositoriesBySlug(params);
    var builds = Travis.store.find(Travis.Build);

    if(repository) {
      Travis.repositoriesBySlugController.set('content', repositories);
      Travis.buildsController.set('content', repository.get('builds'));
    }
    this._activateTab('builds');
  },
  build: function(params) {
    var repositories = this._repositoriesBySlug(params);
    var build = Travis.store.find(Travis.Build, params.id);

    Travis.repositoriesBySlugController.set('content', repositories);
    Travis.buildController.set('content', build);
    this._activateTab('build');
 },
  _repositoriesBySlug: function(params) {
    return Travis.Repository.bySlug(params.owner + '/' + params.repository)
  },
  _activateTab: function(tab) {
    Travis.repositoryController.set('activeTab', tab);
  }
});

SC.ready(function() {
  $.extend(SC.TEMPLATES, Utils.loadTemplates(SC.Handlebars.compile));
  Travis.main();
});
