Travis.Record = SC.Record.extend({
  childRecordNamespace: Travis,
  primaryKey: 'id',
  id: SC.Record.attr(Number),

  update: function(attributes) {
    this.whenReady(function(record) {
      $.each(attributes, function(key, value) {
        this.set(key, value);
      }.bind(this));
    }.bind(this));
    return this;
  },

  whenReady: function(callback) {
    if(!callback) {
      return this;
    } else if(this.get('status') & SC.Record.READY) {
      callback(this);
    } else {
      this.addObserver('status', function() {
        if(this.get('status') & SC.Record.READY) callback(this);
      })
    }
    return this;
  }
});

Travis.Record.mixin({
  update: function(id, attributes) {
    return this.find(id).update(attributes);
  },

  find: function(id, callback) {
    var record = Travis.store.find(this, id)
    return record ? record.whenReady(callback) : record;
  },

  all: function(options) {
    options = options || {};
    return Travis.store.find(this._cachedQuery('all', options, function() {
      return SC.Query.local(this, {
        conditions: this._queryConditions(options),
        url: options.url || this._queryUrl(options),
        orderBy: options.orderBy || 'id'
      });
    }.bind(this)));
  },

  _queryCache: {
  },

  _cachedQuery: function() {
    var args  = Array.prototype.slice.apply(arguments);
    var query = args.pop();
    var key   = this._queryKey(args);
    if(!this._queryCache[key]) { this._queryCache[key] = query(); }
    return this._queryCache[key];
  },

  _queryKey: function(args) {
    args.unshift(this);
    return $.map(args, function(arg) {
      if(arg) return typeof arg == 'object' ? SC.json.encode(arg) : arg.toString();
    }.bind(this)).join('-');
  },

  _queryConditions: function(options) {
    return $.map($.except(options || {}, 'id', 'url', 'orderBy'), function(value, name) {
      return '%@ = %@'.fmt(name, this._quoteQueryValue(name, value));
    }.bind(this)).join(' AND ');
  },

  _queryUrl: function(options) {
    return [this._queryPath(options), this._queryParams()].join('?')
  },

  _queryResource: function() {
    return this.toString().toLowerCase().replace('travis.', '').replace('y', 'ies'); // TODO demodulize, singularize?
  },

  _queryPath: function(options) {
    return '/%@%@.json'.fmt(this._queryResource(), (options.id ? '/' + id : ''))
  },

  _queryParams: function(options) {
    return $.map($.except(options || {}, 'id', 'url', 'orderBy'), function(value, name) {
      return '%@=%@'.fmt(name, encodeURIComponent(value));
    }).join('&');
  },

  _quoteQueryValue: function(name, value) {
    return this.prototype[name].get('type') == String ? '"%@"'.fmt(value) : value;
  }
});
