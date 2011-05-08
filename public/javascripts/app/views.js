Travis.Views = {
  Jobs: SC.TemplateCollectionView.extend({
    tagName: 'ul',
    itemClass: 'job',
    contentBinding: 'Travis.controllers.jobs',
    // emptyView: SC.View.extend({
    //   render: function(context, firstTime) {
    //     context = context.begin('li').push('No jobs');
    //     sc_super();
    //   }
    // })
  }),
  Workers: SC.TemplateCollectionView.extend({
    tagName: 'ul',
    itemClass: 'worker',
    contentBinding: 'Travis.controllers.workers',
    // emptyView: SC.View.extend({
    //   render: function(context, firstTime) {
    //     context = context.begin('li').push('No workers');
    //     sc_super();
    //   }
    // })
  }),
};
