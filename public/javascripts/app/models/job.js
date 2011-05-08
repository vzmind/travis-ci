Travis.Job = SC.Record.extend({
  primaryKey: 'id',
});

Travis.Job.mixin({
  all: function(id) {
    return Travis.store.find(this);
  },
})

