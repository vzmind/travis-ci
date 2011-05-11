Travis.Repository = SC.Record.extend(Travis.Helpers.Urls, {
  primaryKey:         'id',

  slug:                SC.Record.attr(String),
  lastBuildId:         SC.Record.attr(Number, { key: 'last_build_id' }),
  lastBuildNumber:     SC.Record.attr(Number, { key: 'last_build_number' }),
  lastBuildStatus:     SC.Record.attr(String, { key: 'last_build_status' }),
  lastBuildStartedAt:  SC.Record.attr(String, { key: 'last_build_started_at' }),  // Date
  lastBuildFinishedAt: SC.Record.attr(String, { key: 'last_build_finished_at' }), // Date

  lastBuildDuration: function() {
    return Utils.duration(this.get('lastBuildStartedAt'), this.get('lastBuildFinishedAt'));
  }.property('lastBuildStartedAt', 'lastBuildFinishedAt').cacheable(),

  builds: function() {
    return Travis.Build.byRepositoryId(this.get('id'));
  }.property().cacheable(),

  lastBuild: function() {
    return Travis.Build.find(this.get('lastBuildId'));
  }.property().cacheable(),

  scguid: function() {
    return SC.guidFor(repository);
  }.property()
});

Travis.Repository.mixin({
  _queries: {
    latest: {},
    bySlug: {}
  },
  find: function(id) {
    return Travis.store.find(this, id);
  },
  latest: function() {
    return Travis.store.find(SC.Query.local(Travis.Repository));
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

