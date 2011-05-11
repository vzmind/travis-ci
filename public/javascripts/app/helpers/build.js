Travis.Helpers.Build = {
  foldedLog: function() {
    return this.getPath('content.log'); // fold log etc. here
  }.property('content'),
  commit: function() {
    return (this.getPath('content.commit') || '').substr(0, 7);
  }.property(),
  formattedDuration: function() {
    return this.get('duration') ? Utils.readableTime(this.get('duration')) : '-';
  }.property('duration'),
  formattedFinishedAt: function() {
    return this.get('finishedAt') ? $.timeago.inWords($.timeago.distance($.timeago.parse(this.get('finishedAt')))) : '-';
  }.property('finishedAt')
}


