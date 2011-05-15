Travis = SC.Application.create({
  Helpers: {},
  store: SC.Store.create().from('Travis.DataSource'),
  main: function() {
    $.extend(SC.TEMPLATES, Utils.loadTemplates(SC.Handlebars.compile));

    SC.routes.add('!/:owner/:repository/builds/:id', function(params) { Travis.controllers.repository.load($.extend(params, { tab: 'build'   })) });
    SC.routes.add('!/:owner/:repository/builds',     function(params) { Travis.controllers.repository.load($.extend(params, { tab: 'builds'  })) });
    SC.routes.add('!/:owner/:repository',            function(params) { Travis.controllers.repository.load($.extend(params, { tab: 'current' })) });
    SC.routes.add('',                                function(params) { Travis.controllers.repository.load($.extend(params, { tab: 'current' })) });

    Travis.mainPane = SC.TemplatePane.append({
      layerId: 'travis',
      templateName: 'travis'
    });

    Travis.controllers.repositories.load();
    Travis.controllers.workers.load();
    Travis.controllers.jobs.load();

    // TODO: This registers an interval that updates the DOM.
    // We should update this to just invalidate SproutCore properties so the
    // DOM updates automatically.
    // Utils.updateTimes();

    $('.tool-tip').tipsy({ gravity: 'n', fade: true });
    $('.fold').live('click', function() { $(this).hasClass('open') ? $(this).removeClass('open') : $(this).addClass('open'); })

    $('#top .profile').mouseover(function() { $('#top .profile ul').show(); });
    $('#top .profile').mouseout(function() { $('#top .profile ul').hide(); });
  },
  receive: function(event, data) {
    data = data.build;
    if(data) {
      if(data.status) {
        data.result = data.status; // TODO setting build status doesn't seem to trigger bindings?
      }

      Travis.Build.find(data.id, function(build) {
        $.each(data, function(key, value) {
          build.set(key, value);
        });
      });

      Travis.Repository.find(data.repository_id, function(repository) {
        $.each(['id', 'number', 'status', 'started_at', 'finished_at'], function(ix, key) {
          if(data[key]) {
            console.log('lastBuild' + $.camelize(key), data[key])
            repository.set('lastBuild' + $.camelize(key), data[key]);
          }
        });
      });
    }
  }
});

SC.ready(function() {
  if(typeof Jasmine !== undefined) Travis.main();
});
