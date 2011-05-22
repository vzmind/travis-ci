Travis.Repository = SC.Record.extend(Travis.Helpers.Urls, {
  primaryKey:         'id',

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
    $.each(Travis.Repository.all().toArray(), function(ix, repository) { repository.set('selected', false); });
    this.set('selected', true);
  },

  cssClasses: function() {
    return $.compact(['repository', this.get('color'), this.get('selected') ? 'selected' : null]).join(' ');
  }.property('color', 'selected')
});

Travis.Repository.mixin({
  _queries: {
    latest: {},
    bySlug: {}
  },
  all: function() {
    return Travis.store.find(this);
  },
  find: function(id, callback) {
    var record = Travis.store.find(this, id);
    if(callback) { // TODO move to SC.Store or something
      if(record.get('status') & SC.Record.READY) {
        callback(record);
      } else {
        record.addObserver('status', function() {
          if(record.get('status') & SC.Record.READY) callback(record);
        })
      }
    }
    return record;
  },
  latest: function() {
    return Travis.store.find(SC.Query.local(Travis.Repository, { orderBy: 'lastBuildFinishedAt DESC' }));
  },
  bySlug: function(slug) {
    var query = this._queries.bySlug[slug] = this._queries.bySlug[slug] || SC.Query.local(Travis.Repository, {
      conditions: 'slug = {slug}',
      parameters: { slug: slug },
      url: '/repositories.json?slug=%@'.fmt(slug)
    });
    return Travis.store.find(query);
  },
})

