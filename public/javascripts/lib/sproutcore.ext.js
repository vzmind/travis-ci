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

// Make TemplateCollectionView emptyViews use li for list elements and tr for table elements.
SC.TemplateCollectionView = SC.TemplateCollectionView.extend({
  arrayContentDidChange: function(start, removedCount, addedCount) {
    if (!this.get('layer')) { return; }

    var content       = this.get('content'),
        itemViewClass = this.get('itemViewClass'),
        childViews    = this.get('childViews'),
        addedViews    = [],
        renderFunc, childView, itemOptions, elem, insertAtElement, item, itemElem, idx, len;

    var addedObjects = content.slice(start, start+addedCount);

    // If we have content to display, create a view for
    // each item.
    itemOptions = this.get('itemViewOptions') || {};

    elem = this.$();
    insertAtElement = elem.find('li')[start-1] || null;
    len = addedObjects.get('length');

    // TODO: This logic is duplicated from the view helper. Refactor
    // it so we can share logic.
    var itemAttrs = {
      "id": itemOptions.id,
      "class": itemOptions['class'],
      "classBinding": itemOptions.classBinding
    };

    renderFunc = function(context) {
      arguments.callee.base.apply(this,arguments);
      SC.Handlebars.ViewHelper.applyAttributes(itemAttrs, this, context);
    };

    itemOptions = SC.clone(itemOptions);
    delete itemOptions.id;
    delete itemOptions['class'];
    delete itemOptions.classBinding;

    for (idx = 0; idx < len; idx++) {
      item = addedObjects.objectAt(idx);
      childView = this.createChildView(itemViewClass.extend(itemOptions, {
        content: item,
        render: renderFunc
      }));

      var contextProperty = childView.get('contextProperty');
      if (contextProperty) {
        childView.set('context', childView.get(contextProperty));
      }

      itemElem = childView.createLayer().$();
      if (!insertAtElement) {
        elem.append(itemElem);
      } else {
        itemElem.insertAfter(insertAtElement);
      }
      insertAtElement = itemElem;

      addedViews.push(childView);
    }

    childViews.replace(start, 0, addedViews);

    var inverseTemplate = this.get('inverseTemplate');
    if (childViews.get('length') === 0 && inverseTemplate) {
      childView = this.createChildView(SC.TemplateView.extend({
        template: inverseTemplate,
        content:  this,
        tagName:  this.childViewTagName()
      }));
      this.set('emptyView', childView);
      childView.createLayer().$().appendTo(elem);
      this.childViews = [childView];
    }

    // Because the layer has been modified, we need to invalidate the frame
    // property, if it exists, at the end of the run loop. This allows it to
    // be used inside of SC.ScrollView.
    this.invokeLast('invalidateFrame');
  },
  childViewTagName: function() {
    switch(this.get('tagName')) {
      case 'ul':
      case 'ol':
        return 'li';
      case 'table':
      case 'thead':
      case 'tbody':
      case 'tfoot':
        return 'tr'
    }
  }
});
