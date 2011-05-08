Travis.Helpers.Build = {
  foldedLog: function() {
    return this.getPath('content.log'); // fold log etc. here
  }.property('content'),
  commit: function() {
    return (this.getPath('content.commit') || '').substr(0, 7);
  }.property()
}


