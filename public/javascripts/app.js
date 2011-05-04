Travis = SC.Application.create({
  main: function() {
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
    var repositories = Travis.Repository.bySlug(params.owner + '/' + params.repository);
    Travis.repositoriesBySlugController.set('content', repositories);
  },
});

SC.ready(function() {
  $.extend(SC.TEMPLATES, Utils.loadTemplates(SC.Handlebars.compile));
  Travis.main();
});
