Travis.Views = {
  Jobs: SC.TemplateCollectionView.extend({
    tagName: 'ul',
    itemClass: 'job',
    contentBinding: 'Travis.controllers.jobs',
  }),
  Workers: SC.TemplateCollectionView.extend({
    tagName: 'ul',
    itemClass: 'worker',
    contentBinding: 'Travis.controllers.workers',
  }),
};
