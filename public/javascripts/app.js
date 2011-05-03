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
    var repository = this._findRepository(params);
    var build = Travis.store.find(Travis.Build, 2);

    Travis.repositoryController.set('content', repository);
    Travis.buildController.set('content', build);
    this._activateTab('current');
  },
  history: function(params) {
    var repository = this._findRepository(params);
    var builds = Travis.store.find(Travis.Build);

    if(repository) {
      Travis.repositoryController.set('content', repository);
      Travis.buildsController.set('content', repository.get('builds'));
    }
    this._activateTab('builds');
  },
  build: function(params) {
    var repository = this._findRepository(params);
    var build = Travis.store.find(Travis.Build, params.id);

    Travis.repositoryController.set('content', repository);
    Travis.buildController.set('content', build);
    this._activateTab('build');
 },
  _findRepository: function(params) {
    var slug = params.owner + '/' + params.repository;
    var repositories = Travis.store.find(Travis.Queries.RepositoryBySlug.local({ slug: slug }));
    return repositories.firstObject();
  },
  _activateTab: function(tab) {
    Travis.repositoryController.set('activeTab', tab);
  }
});

SC.ready(function() {
  $.extend(SC.TEMPLATES, Utils.loadTemplates(SC.Handlebars.compile));
  Travis.main();
});
