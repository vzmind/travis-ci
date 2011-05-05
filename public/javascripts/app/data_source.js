Travis.DataSource = SC.DataSource.extend({
  fetch: function(store, query) {
    var url = this._urlForQuery(query);
    // console.log([url, query.isRemote()])
    if(url) {
      SC.Request.getUrl(url).set('isJSON', YES).notify(this, '_didFetchRecords', store, query).send();
      return YES;
    }
    return NO;
  },
  retrieveRecord: function(store, storeKey, id) {
    var url = this._urlForRecord(storeKey, id);
    SC.Request.getUrl(url).set('isJSON', YES).notify(this, '_didRetrieveRecord', store, storeKey).send();

    return YES;
  },
  _urlForQuery: function(query) {
    if(query.recordType == Travis.Repository) {
      if(query.getPath('parameters.slug')) {
        return '/repositories.json?slug=' + query.parameters.slug;
      } else {
        return '/repositories.json';
      }
    } else if(query.recordType == Travis.Build) {
      if(query.getPath('parameters.repositoryId')) {
        return '/repositories/%@/builds.json'.fmt(query.parameters.repositoryId);
      } else if(query.getPath('parameters.parentId')) {
        return '/builds/%@.json'.fmt(query.parameters.parentIdd);
      } else if(query.getPath('parameters.id')) {
        return '/builds/%@.json'.fmt(query.parameters.id);
      }
    }
    console.log(query)
  },
  _urlForRecord: function(storeKey, id) {
    var recordType = SC.Store.recordTypeFor(storeKey), url;
    if (recordType === Travis.Build) {
      return '/builds/%@.json'.fmt(id);
    } else {
      console.log('can not generate url for ' + recordType)
    }
  },
  _didFetchRecords: function(response, store, query) {
    var records = response.get('body');
    if(SC.typeOf(records) != SC.T_ARRAY) {
      records = [records];
    }
    if(SC.$ok(response)) {
      var storeKeys = store.loadRecords(query.recordType, records);
      if(query.isRemote()) {
        store.loadQueryResults(query, storeKeys);
      } else {
        store.dataSourceDidFetchQuery(query);
      }
    } else {
      store.dataSourceDidErrorQuery(query);
    }
  },
  _didRetrieveRecord: function(response, store, storeKey) {
    if (SC.$ok(response)) {
      store.dataSourceDidComplete(storeKey, response.get('body'));
    } else {
      store.dataSourceDidError(storeKey, response.get('body'));
    }
  },
}) ;

// Travis.DataSource = SC.DataSource.extend({
//   fetch: function(store, query) {
//     options = {
//       store:    store,
//       query:    query,
//       isQuery:  YES
//     };
//     if (query === Md.PEOPLE_QUERY) {
//       return this._getFromUri('/people', {type: Md.Person});
//     }
//     return NO;
//   },
//
//   _getFromUri: function(uri, options) {
//     var notifyMethod;
//     notifyMethod = options.isQuery ? this._didGetQuery : this._didRetrieveRecords;
//
//     SC.Request.getUrl(uri)
//       .set('isJSON', YES)
//       .notify(this, notifyMethod, options)
//       .send();
//     return YES;
//   },
//
//   // called when query is returned from server
//   // basically, you just load the records, or their ids and notify store, the you have finished
//   // there are three ways, you can handle the query, either it is local or remote
//   // remote can be loaded with fully records or just with keys
//
//   _didGetQuery: function(response, params) {
//       var store     = params.store,
//           query     = params.query,
//           type      = params.type,
//           deffered  = params.deffered;
//
//       if (SC.ok(response)) {
//         if (query.get('isLocal')) {
//             console.log("fetch local");
//             var storeKeys = store.loadRecords(type, response.get('body'));
//             store.dataSourceDidFetchQuery(query);
//         } else if (deffered) {
//           console.log("fetch remote deffered");
//           var storeKeys = response.get('body').map(function(id) {
//             return Md.Person.storeKeyFor(id);
//           }, this);
//           store.loadQueryResults(query, storeKeys);
//         } else {
//           console.log("fetch remote");
//           var storeKeys = store.loadRecords(type, response.get('body'));
//           store.loadQueryResults(query, storeKeys);
//         }
//       } else store.dataSourceDidErrorQuery(query, response);
//   },
//
//   // Method called by store when requesting individual record
//   retrieveRecord: function(store, storeKey) {
//     this._getFromUri(store.idFor(storeKey), {
//       storeKey:       storeKey,
//       store:          store,
//       type:           store.recordTypeFor(storeKey)
//
//     });
//     return YES;
//   },
//
//   // handler called when record returns from server, this method will deal with individual records as well as arrays of records od the same type
//   _didRetrieveRecords: function(response, params) {
//     var store = params.store,
//         type = params.type,
//         data;
//     if (SC.ok(response)) {
//       data = response.get('body');
//       console.log(data, type)
//       store.loadRecords(type, data.isEnumerable ? data : [data]);
//     } else store.dataSourceDidError(storeKey, response.get('body'));
//   },
// });
//
//
//
