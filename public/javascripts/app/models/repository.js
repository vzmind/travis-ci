Travis.Repository = Travis.Record.extend(Travis.Helpers.Urls, {
  slug:                SC.Record.attr(String),
  lastBuildId:         SC.Record.attr(Number, { key: 'last_build_id' }),
  lastBuildNumber:     SC.Record.attr(Number, { key: 'last_build_number' }),
  lastBuildStatus:     SC.Record.attr(String, { key: 'last_build_status' }),
  lastBuildStartedAt:  SC.Record.attr(String, { key: 'last_build_started_at' }),  // Date
  lastBuildFinishedAt: SC.Record.attr(String, { key: 'last_build_finished_at' }), // Date

  builds: function() {
    return Travis.Build.byRepositoryId(this.get('id'));
  }.property(),

  lastBuildDuration: function() {
    return Utils.duration(this.get('lastBuildStartedAt'), this.get('lastBuildFinishedAt'));
  }.property('lastBuildStartedAt', 'lastBuildFinishedAt').cacheable(),

  // TODO the following display logic all all seems to belong to a controller or helper module,
  // but I can't find a way to bind an itemClass to a controller w/ TemplateCollectionView

  color: function() {
    return Utils.buildColor(this.get('lastBuildStatus'));
  }.property('lastBuildStatus'),

  formattedLastBuildDuration: function() {
    return this.get('lastBuildDuration') ? Utils.readableTime(this.get('lastBuildDuration')) : '-';
  }.property('lastBuildDuration'),

  formattedLastBuildFinishedAt: function() {
    return this.get('lastBuildFinishedAt') ? $.timeago.distanceInWords(this.get('lastBuildFinishedAt')) : '-';
  }.property('lastBuildFinishedAt'),

  select: function() {
    this.whenReady(function() {
      var id = this.get('id');
      Travis.Repository.latest().forEach(function(repository) {
        repository.whenReady(function() { repository.set('selected', repository.get('id') == id); });
      });
    }.bind(this));
  },

  cssClasses: function() {
    return $.compact(['repository', this.get('color'), this.get('selected') ? 'selected' : null]).join(' ');
  }.property('color', 'selected')
});

Travis.Repository.mixin({
  latest: function() {
    return this.all({ orderBy: 'lastBuildFinishedAt DESC' });
  },
})

