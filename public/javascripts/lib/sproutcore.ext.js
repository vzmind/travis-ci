// Add an option forceSingleContent which defaults to YES and makes this
// controller use the first item of an enumerable content.
SC.SingleObjectController = SC.ObjectController.extend({
  forceSingleContent: YES,

  observableContent: function() {
    var content = this.get('content'),
        len, allowsMultiple, forceSingle;

    // if enumerable, extract the first item or possibly become null
    if (content && content.isEnumerable) {
      len = content.get('length');
      forceSingle = this.get('forceSingleContent');
      allowsMultiple = this.get('allowsMultipleContent');

      if (len === 1 || forceSingle && content.isEnumerable)
        content = content.firstObject();
      else if (len===0 || !allowsMultiple) content = null;

      // if we got some new content, it better not be enum also...
      if (content && !allowsMultiple && content.isEnumerable) content=null;
    }

    return content;
  }.property('content', 'allowsMultipleContent').cacheable(),
});

// Allow adding routes without a target option
SC.routes.trigger = function() {
  var firstRoute = this._firstRoute,
      location = this.get('location'),
      params, route;

  if (firstRoute) {
    params = this._extractParametersAndRoute({ route: location });
    location = params.route;
    delete params.route;
    delete params.params;
    route = firstRoute.routeForParts(location.split('/'), params);
    // if (route && route.target && route.method) {
    if (route && route.method) {
      route.method.call(route.target, params);
    }
  }
};
