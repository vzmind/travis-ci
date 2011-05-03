sc_require('helpers/urls')

Travis.Build = SC.Record.extend(Travis.Helpers.Urls, {
  primaryKey:     'id',

  repositoryId:   SC.Record.attr(String, { key: 'repository_id' }),
  parentId:       SC.Record.attr(String, { key: 'parent_id' }),
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
    return Travis.store.find(SC.Query.local(Travis.Build, { conditions: 'parentId = %@', parameters: [this.get('id')] }));
  }.property().cacheable(),
});
