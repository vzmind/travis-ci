Travis.Record = SC.Record.extend({
  childRecordNamespace: Travis,
  primaryKey: 'id',

  update: function(attributes) {
    this.whenReady(function(record) {
      $.each(attributes, function(key, value) {
        this.set(key, value);
      }.bind(this));
    }.bind(this));
    return this;
  },

  whenReady: function(callback) {
    if(this.get('status') & SC.Record.READY) {
      callback(this);
    } else {
      this.addObserver('status', function() {
        if(this.get('status') & SC.Record.READY) callback(this);
      })
    }
  }
});

Travis.Record.mixin({
  update: function(id, attributes) {
    this.find(id).update(attributes);
  },

  find: function(id, callback) {
    var record = Travis.store.find(this, id);
    if(callback) {
      if(record.get('status') & SC.Record.READY) {
        callback(record);
      } else {
        record.addObserver('status', function() {
          if(record.get('status') & SC.Record.READY) callback(record);
        })
      }
    }
    return record;
  },

  all: function(options) {
    return Travis.store.find(this._cachedQuery('all', options, function() {
      return SC.Query.local(this, options);
    }.bind(this)));
  },

  findBy: function(options) { // TODO join with all?
    return Travis.store.find(this._cachedQuery('by', options, function() {
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
    }).join('-');
  },

  _queryConditions: function(params) {
    var conditions = [];
    var skip = ['url', 'orderBy'];
    $.each(params, function(name, value) {
      if(skip.indexOf(name) == -1) {
        conditions.push('%@ = %@'.fmt(name, this._quoteQueryValue(name, value)));
      }
    }.bind(this));
    return conditions.join(' AND ');
  },

  _queryUrl: function(options) {
    var resource = this.toString().toLowerCase().replace('travis.', '').replace('y', 'ies'); // TODO
    var params = [];
    var skip = ['url', 'orderBy'];
    $.each(options, function(name, value) {
      if(skip.indexOf(name) == -1) {
        params.push('%@=%@'.fmt(name, encodeURIComponent(value)));
      }
    });
    return '/%@.json?%@'.fmt(resource, params.join('&'));
  },

  _quoteQueryValue: function(name, value) {
    return this.prototype[name].get('type') == String ? '"%@"'.fmt(value) : value;
  }
});
