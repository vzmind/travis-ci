Travis.Build = SC.Record.extend(Travis.Helpers.Urls, {
  primaryKey:     'id',
  childRecordNamespace: Travis,
  matrix: SC.Record.toMany('Travis.Build', { nested: true }),

  repositoryId:   SC.Record.attr(Number, { key: 'repository_id' }),
  parentId:       SC.Record.attr(Number, { key: 'parent_id' }),
  number:         SC.Record.attr(String),
  commit:         SC.Record.attr(String),
  message:        SC.Record.attr(String),
  committerName:  SC.Record.attr(String, { key: 'committer_name' }),
  committerEmail: SC.Record.attr(String, { key: 'committer_email' }),
  authorName:     SC.Record.attr(String, { key: 'author_name' }),
  authorEmail:    SC.Record.attr(String, { key: 'author_email' }),
  log:            SC.Record.attr(String),
  startedAt:      SC.Record.attr(String, { key: 'started_at'}), // Date
  finishedAt:     SC.Record.attr(String, { key: 'finished_at'}), // Date

  repository: function() {
    return Travis.Repository.find(this.get('repositoryId'));
  }.property(),

  commitAndBranch: function() {
    return (this.get('commit') || '').substr(0, 7) + (this.get('branch') ? ' (%@)'.fmt(this.get('branch')) : '');
  }.property(),

  duration: function() {
    return Utils.duration(this.get('startedAt'), this.get('finishedAt'));
  }.property('startedAt', 'finishedAt'),

  configDimensions: function() {
    return $.map($.keys(this.get('config')), function(value) { return $.camelize(value) });
  }.property(),

  configValues: function() {
    return $.values(this.get('config'));
  }.property()
});

Travis.Build.mixin({
  _queries: {
    byRepositoryId: {},
  },
  find: function(id) {
    return Travis.store.find(this, id);
  },
  byRepositoryId: function(id, parameters) {
    parameters = parameters || {};
    var key = [id, parameters.limit].join('-');
    var query = this._queries.byRepositoryId[key] = this._queries.byRepositoryId[key] || SC.Query.local(Travis.Build, {
      conditions: 'repositoryId = %@ AND parentId = null'.fmt(id),
      url: '/repositories/%@/builds.json?limit=%@'.fmt(id, parameters.limit),
      orderBy: 'number DESC'
    });
    return Travis.store.find(query);
  },
})


