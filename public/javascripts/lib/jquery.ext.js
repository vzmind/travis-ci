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
  }
});

