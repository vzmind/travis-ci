Travis.Build = SC.Record.extend(Travis.Helpers.Urls, {
  primaryKey:     'id',

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
  duration:       SC.Record.attr(Number),
  finishedAt:     SC.Record.attr(String, { key: 'finished_at'}), // Date

  repository: function() {
    return Travis.Repository.find(this.get('repositoryId'));
  }.property(),

  // matrix: function() {
  //   return Travis.Build.byParentId(this.get('id'));
  // },

  // isMatrix: function() {
  //   return this.matrix().length() > 0;
  // }.property()
});

Travis.Build.mixin({
  _queries: {
    byRepositoryId: {},
    byParentId: {}
  },
  find: function(id) {
    return Travis.store.find(this, id);
  },
  byRepositoryId: function(id, parameters) {
    parameters = parameters || {};
    var key = [id, parameters.limit].join('-');
    var query = this._queries.byRepositoryId[key] = this._queries.byRepositoryId[key] || SC.Query.local(Travis.Build, {
      conditions: 'repositoryId = %@ AND parentId = null'.fmt(id),
      url: '/repositories/%@/builds.json?limit=%@'.fmt(id, parameters.limit)
    });
    return Travis.store.find(query);
  },
})


