Travis.Helpers.Build = {
  foldedLog: function() {
    if(this.content) return this.getPath('content.log'); // fold log etc. here
  }.property('content'),
}


