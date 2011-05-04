Travis.repositoriesController = SC.ArrayController.create({
});

Travis.repositoriesBySlugController = SC.ArrayController.create({
  // readyObserver: function(){
  //   var content = this.get('content');
  //   if(content){
  //     var status = content.get('status');
  //     if(status === SC.Record.READY_CLEAN && content.get('length') === 0) {
  //         var query = SC.Query.create(Travis.Repository, { conditions: 'slug = "%@"'.fmt('svenfuchs/minimal') }).mixin({ url: '/repositories.json' });
  //         var repositories = Travis.store.find(query);
  //         this.set('content', repositories);
  //      }
  //   }
  // }.observes('*content.status')
});

Travis.repositoryController = SC.ObjectController.create({
  // contentBinding: SC.Binding.single('Travis.repositoriesBySlugController*arrangedObjects').transform(function(value) { console.log(value); return value; }),
  // contentBinding: SC.Binding.from('Travis.repositoriesBySlugController.arrangedObjects.firstObject'),
  // contentBinding: SC.Binding.from('Travis.repositoriesBySlugController.arrangedObjects.firstObject').transform(function(value) { console.log(value); return value; }),
  // contentBinding: SC.Binding.oneWay('Travis.repositoriesBySlugController.arrangedObjects').transform(function(value) { console.log(value); if(value) return value.firstObject(); }),
  // contentBinding: SC.Binding.oneWay('Travis.repositoriesBySlugController.arrangedObjects').transform(function(value) { if(value && value.isEnumerable) { value = value.firstObject(); } return value; }),
  // contentBinding: SC.Binding.oneWay('Travis.repositoriesBySlugController*firstObject').transform(function(value) { console.log(value); return value; }),
  // contentBinding: SC.Binding.single('Travis.repositoriesBySlugController*content').transform(function(value) { console.log(value); return value; }),
  contentBinding: SC.Binding.single('Travis.repositoriesBySlugController*content'),
  tabCurrentClass: function() { return this.get('activeTab') == 'current' ? 'active' : ''; }.property('activeTab'),
  tabBuildsClass:  function() { return this.get('activeTab') == 'builds'  ? 'active' : ''; }.property('activeTab'),
  tabBuildClass:   function() { return this.get('activeTab') == 'build'   ? 'active' : ''; }.property('activeTab'),
});

Travis.buildsController = SC.ArrayController.create({
});

Travis.buildController = SC.ObjectController.create({
  foldedLog: function() {
    if(this.content) return this.content.get('log'); // fold log etc. here
  }.property('log'),
});

