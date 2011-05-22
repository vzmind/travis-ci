Travis.Build = Travis.Record.extend(Travis.Helpers.Urls, {
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
  result:         SC.Record.attr(String, { key: 'status' }), // status is reserved by SC
  log:            SC.Record.attr(String),
  startedAt:      SC.Record.attr(String, { key: 'started_at'}), // Date
  finishedAt:     SC.Record.attr(String, { key: 'finished_at'}), // Date

  repository: function() {
    return Travis.Repository.find(this.get('repositoryId'));
  }.property(),

  parent: function() {
    return this.get('parentId') ? Travis.Build.find(this.get('parentId')) : null;
  }.property(),

  commitAndBranch: function() {
    return (this.get('commit') || '').substr(0, 7) + (this.get('branch') ? ' (%@)'.fmt(this.get('branch')) : '');
  }.property(),

  color: function() {
    return Utils.buildColor(this.get('result'));
  }.property('result'),

  duration: function() {
    return Utils.duration(this.get('startedAt'), this.get('finishedAt'));
  }.property('startedAt', 'finishedAt'),

  configDimensions: function() {
    return $.map($.keys(this.get('config') || {}), function(value) { return $.camelize(value) });
  }.property(),

  configValues: function() {
    return $.values(this.get('config') || {});
  }.property(),

  observer: function() {
    var repository = this.get('repository');
    if(repository.get('lastBuildStartedAt') < this.get('startedAt') || repository.get('lastBuildFinishedAt') < this.get('finishedAt')) {
      repository.update({
        lastBuildStartedAt:  this.get('startedAt'),
        lastBuildFinishedAt: this.get('finishedAt'),
        lastBuildStatus:     this.get('result')
      });
    }
  }.observes('startedAt', 'finishedAt', 'result'),

  // TODO the following display logic all seems to belong to a controller or helper module

  formattedLog: function() {
    return this.get('log'); // fold log etc. here
  }.property('log'),

  formattedCommit: function() {
    return (this.get('commit') || '').substr(0, 7) + (this.get('branch') ? ' (%@)'.fmt(this.get('branch')) : '');
  }.property('commit'),

  formattedDuration: function() {
    return this.get('duration') ? Utils.readableTime(this.get('duration')) : '-';
  }.property('duration'),

  formattedFinishedAt: function() {
    return this.get('finishedAt') ? $.timeago.distanceInWords(this.get('finishedAt')) : '-';
  }.property('finishedAt'),

  configDisplay: function() {
    var config = this.get('config');
    if(config) {
      var result = []; // doh. sc is on jquery 1.4
      $.each(config, function(key, value) {
        result.push('%@: %@'.fmt(key, value.join ? value.join(', ') : value))
      });
      return result.join(', ');
    }
  }.property('config')
});

Travis.Build.mixin({
  byRepositoryId: function(id, parameters) {
    return this.all({ repositoryId: id, parentId: null, url: '/repositories/%@/builds.json'.fmt(id), orderBy: 'number DESC' })
  },
})


