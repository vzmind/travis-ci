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
