Travis.Query = SC.Query.extend();
Travis.Query.mixin({
  build: function(location, params) {
    var conditions = this.conditions ? this.conditions.fmt(params) : null;
    var query = SC.Query.build.apply(this, [location, this.recordType, conditions]);
    if(this.url) query.url = this.url;
    return query;
  }
});

Travis.Queries = {
  LatestRepositories: SC.Query.extend({
    recordType: Travis.Repository,
    orderBy: 'DESC lastBuildStartedAt',
    url: function() {
      return '/repositories.json';
    }
  }),
  RepositoryBySlug: Travis.Query.extend({
  }),
  RepositoryBuilds: SC.Query.extend({
    recordType: Travis.Build,
    conditions: 'repositoryId = {repositoryId} AND parentId = {parentId}',
    orderBy: 'DESC id',
    init: function() {
      this.parameters = { repositoryId: this.repositoryId, parentId: null }
    },
    url: function() {
      return '/repositories/%@/builds.json'.fmt(this.repositoryId);
    }
  }),
  BuildMatrix: SC.Query.extend({
    recordType: Travis.Build,
    conditions: 'parentId = {parentId}',
    orderBy: 'id',
    init: function() {
      this.parameters = { parentId: this.buildId }
    },
    url: function() {
      return '/builds/%@/builds.json'.fmt(this.buildId);
    }
  })
};

Travis.Queries.RepositoryBySlug.mixin({
  recordType: Travis.Repository,
  conditions: 'slug = "%@"',
  // parameterKeys: 'slug'.w(),
  // url: function() {
  //   return '/repositories.json';
  // }
})

