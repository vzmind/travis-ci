sc_require('helpers/urls')

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

  repository: SC.Record.toOne('Travis.Repository', { inverse: 'builds' }),

  matrix: function() {
    return Travis.Build.byParentId(this.get('id'));
  },
});

Travis.Build.mixin({
  _queries: {
    byRepositoryId: {},
    byParentId: {}
  },
  byRepositoryId: function(id) {
    var query = this._queries.byRepositoryId[id] = this._queries.byRepositoryId[id] || SC.Query.local(Travis.Build, {
      conditions: 'repositoryId = {repositoryId} AND parentId = null',
      parameters: { repositoryId: id }
    });
    return Travis.store.find(query);
  },
  byParentId: function(id) {
    var query = this._queries.byParentId[id] = this._queries.byParentId[id] || SC.Query.local(Travis.Build, {
      conditions: 'parentId = {parentId}',
      parameters: { parentId: id }
    });
    return Travis.store.find(query);
  }
  // byId: function(id) {
  //   // return Travis.store.find(SC.Query.remote(Travis.Build, { parameters: { id: id } }));
  //   return Travis.store.find(Travis.Build, id);
  // },
})


