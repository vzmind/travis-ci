Travis.Worker = SC.Record.extend({
  primaryKey: 'id',
});

Travis.Worker.mixin({
  all: function(id) {
    return Travis.store.find(this);
  },
})
