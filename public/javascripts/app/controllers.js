Travis.repositoriesController = SC.ArrayController.create({
});

Travis.repositoryController = SC.ObjectController.create({
  repositoryObserver: function() {
    var repository = this.getPath('content.firstObject');
    if(repository) {
      Travis.buildsController.set('content', repository.builds())
    }
  }.observes('*content'),
  activateTab: function(tab) {
    $('#repository .tabs > li').removeClass('active');
    $('#repository #tab_' + tab).addClass('active');
  }
});

Travis.buildsController = SC.ArrayController.create({
});

Travis.buildController = SC.ObjectController.create({
  foldedLog: function() {
    if(this.content) return this.getPath('content.log'); // fold log etc. here
  }.property('content'),
});

