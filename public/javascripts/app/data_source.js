Travis.DataSource = SC.DataSource.extend({
  fetch: function(store, query) {
    var url = this.urlForQuery(query);
    console.log(url)
    if(url) {
      SC.Request.getUrl(url).set('isJSON', YES) .notify(this, 'didFetchRecords', store, query).send();
      return YES;
    }
    return NO;
  },
  urlForQuery: function(query) {
    if(query.recordType == Travis.Repository) {
      if(!query.conditions) {
        return '/repositories.json';
      } else {
         return '/repositories.json?slug=' + query.parameters.slug;
      }
    }
    console.log(query)
  },
  didFetchRecords: function(response, store, query) {
    var records = response.get('body');
    console.log('loading ' + records.length + ' records of type ' + query.recordType.toString())
    store.loadRecords(query.recordType, records);
    store.dataSourceDidFetchQuery(query);
  },
}) ;

