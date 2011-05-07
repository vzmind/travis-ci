Travis = SC.Application.create({
  Helpers: {},
  main: function() {
    SC.routes.add('!/:owner/:repository/builds/:id', function(params) { Travis.repositoryController.load($.extend(params, { tab: 'build'   })) });
    SC.routes.add('!/:owner/:repository/builds',     function(params) { Travis.repositoryController.load($.extend(params, { tab: 'builds'  })) });
    SC.routes.add('!/:owner/:repository',            function(params) { Travis.repositoryController.load($.extend(params, { tab: 'current' })) });

    Travis.mainPane = SC.TemplatePane.append({
      layerId: 'travis',
      templateName: 'travis'
    });

    Travis.repositoriesController.set('content', Travis.Repository.latest());
  },
  store: SC.Store.create().from('Travis.DataSource')
});

SC.ready(function() {
  $.extend(SC.TEMPLATES, Utils.loadTemplates(SC.Handlebars.compile));
  Travis.main();
});
