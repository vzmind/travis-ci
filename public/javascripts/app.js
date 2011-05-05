Travis = SC.Application.create({
  main: function() {
    SC.routes.add('!/:owner/:repository/builds/:id', Travis.dispatch, 'build');
    SC.routes.add('!/:owner/:repository/builds', Travis.dispatch, 'history');
    SC.routes.add('!/:owner/:repository', Travis.dispatch, 'current');

    Travis.mainPane = SC.TemplatePane.append({
      layerId: 'travis',
      templateName: 'travis'
    });

    Travis.repositoriesController.set('content', Travis.Repository.latest());
  },
  store: SC.Store.create().from('Travis.DataSource') // .from(SC.Record.fixtures)
});

Travis.dispatch = SC.Object.create({
  current: function(params) {
    Travis.repositoryController.set('content', Travis.Repository.bySlug(params.owner + '/' + params.repository));
    // Travis.buildController.set('content', Travis.Build.byId(2));
    Travis.repositoryController.activateTab('current');
  },
  history: function(params) {
    Travis.repositoryController.set('content', Travis.Repository.bySlug(params.owner + '/' + params.repository));
    // var builds = Travis.store.find(Travis.Build);
    // Travis.buildsController.set('content', repository.get('builds'));
    Travis.repositoryController.activateTab('builds');
  },
 //  build: function(params) {
 //    var repositories = this._repositoriesBySlug(params);
 //    var build = Travis.store.find(Travis.Build, params.id);

 //    Travis.repositoryController.set('content', repositories);
 //    Travis.buildController.set('content', build);
 //    this._activateTab('build');
 // },
});

SC.ready(function() {
  $.extend(SC.TEMPLATES, Utils.loadTemplates(SC.Handlebars.compile));
  Travis.main();
});
