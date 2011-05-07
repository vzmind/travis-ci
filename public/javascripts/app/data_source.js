// mostly stolen from http://svarovsky-tomas.com/sproutcore-datasource.html, thanks Tomáš!

Travis.DataSource = SC.DataSource.extend({
  fetch: function(store, query) {
    options = {
      url:     this._urlForQuery(query),
      store:   store,
      query:   query,
      isQuery: YES
    };
    if(options.url) {
      return this._getFromUrl(options);
    }
    return NO;
  },

  retrieveRecord: function(store, storeKey) {
    var url = this._urlForRecord(storeKey, store.idFor(storeKey));
    this._getFromUrl({
      url:      url,
      storeKey: storeKey,
      store:    store,
      type:     store.recordTypeFor(storeKey)
    });
    return YES;
  },

  _urlForQuery: function(query) {
    if(query.url) {
      return query.url
    } else if(query.recordType == Travis.Repository) {
      return '/repositories.json';
    } else if(query.recordType == Travis.Build) {
      var parameters = query.parameters || {};
      return '/builds/%@.json'.fmt(parameters.id);
    }
    console.log('can not generate url for query:', query)
  },

  _urlForRecord: function(storeKey, id) {
    if (SC.Store.recordTypeFor(storeKey) === Travis.Build) {
      return '/builds/%@.json'.fmt(id);
    } else {
      console.log('can not generate url for ' + recordType)
    }
  },

  _getFromUrl: function(options) {
    var notifyMethod = options.isQuery ? this._didGetQuery : this._didRetrieveRecords;
    SC.Request.getUrl(options.url).set('isJSON', YES).notify(this, notifyMethod, options).send();
    return YES;
  },

  _didGetQuery: function(response, params) {
    var store     = params.store,
        query     = params.query,
        type      = params.query.get('recordType'),
        deferred  = params.deferred;

    if (SC.ok(response)) {
      if (query.get('isLocal')) {
        // console.log('fetch local');
        var storeKeys = store.loadRecords(type, response.get('body'));
        store.dataSourceDidFetchQuery(query);
      } else if (deferred) {
        // console.log("fetch remote deferred");
        var storeKeys = response.get('body').map(function(id) {
          return Md.Person.storeKeyFor(id);
        }, this);
        store.loadQueryResults(query, storeKeys);
      } else {
        // console.log("fetch remote");
        var storeKeys = store.loadRecords(type, response.get('body'));
        store.loadQueryResults(query, storeKeys);
      }
    } else {
      store.dataSourceDidErrorQuery(query, response);
    }
  },

  _didRetrieveRecords: function(response, params) {
    var store = params.store,
        type  = params.type;
    if (SC.ok(response)) {
      var data = response.get('body');
      // console.log(data, type);
      store.loadRecords(type, data.isEnumerable ? data : [data]);
    } else {
      store.dataSourceDidError(storeKey, response.get('body'));
    }
  },
});
