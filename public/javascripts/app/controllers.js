Travis.repositoriesController = SC.ArrayController.create({
});

Travis.repositoryController = SC.ObjectController.create({
  tabCurrentClass: function() {
    return this.get('activeTab') == 'current' ? 'active' : '';
  }.property('activeTab'),
  tabBuildsClass: function() {
    return this.get('activeTab') == 'builds' ? 'active' : '';
  }.property('activeTab'),
  tabBuildClass: function() {
    return this.get('activeTab') == 'build' ? 'active' : '';
  }.property('activeTab'),
});

Travis.buildsController = SC.ArrayController.create({
});

Travis.buildController = SC.ObjectController.create({
  foldedLog: function() {
    if(this.content) return this.content.get('log'); // fold log etc. here
  }.property('log'),
});
