$.extend({
  keys: function(obj) {
    var keys = [];
    $.each(obj, function(key) { keys.push(key) });
    return keys;
  },
  values: function(obj) {
    var values = [];
    $.each(obj, function(key, value){ values.push(value) });
    return values;
  },
  camelize: function(string) {
    return $.capitalize(string).replace(/_(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
  },
  capitalize: function(string) {
    return string[0].toUpperCase() + string.substring(1);
  },
  compact: function(array) {
    return $.grep(array, function(value) { return !!value; });
  },
  any: function(array, callback) {
    var args  = Array.prototype.slice.apply(arguments);
    var callback = args.pop();
    var array = args.pop() || this;
    for(var i = 0; i < array.length; i++) {
      if(callback(array[i])) return true;
    }
    return false;
  },
  slice: function(object, key) {
    var keys   = Array.prototype.slice.apply(arguments);
    var object = (typeof keys[0] == 'object') ? keys.shift() : this;
    var result = {};
    for(var key in object) {
      if(object.indexOf(keys)) result[key] = object[key];
    }
    return false;
  }
});

$.fn.extend({
  outerHtml: function() {
    return $(this).wrap('<div></div>').parent().html();
  },
  outerElement: function() {
    return $($(this).outerHtml()).empty();
  },
  flash: function() {
    Utils.flash(this);
  },
  unflash: function() {
    Utils.unflash(this);
  },
  filterLog: function() {
    this.deansi();
    this.foldLog();
  },
  deansi: function() {
    this.html(Utils.deansi(this.html()));
  },
  foldLog: function() {
    this.html(Utils.foldLog(this.html()));
  },
  unfoldLog: function() {
    this.html(Utils.unfoldLog(this.html()));
  },
  updateTimes: function() {
    Utils.updateTimes(this);
  },
  activateTab: function(tab) {
    Utils.activateTab(this, tab);
  },
  readableTime: function() {
    $(this).each(function() { $(this).text(Utils.readableTime(parseInt($(this).attr('title')))); })
  },
  updateGithubStats: function(repository) {
    Utils.updateGithubStats(repository, $(this));
  }
});

