Travis.Views = {
  MatrixTable: SC.View.create(Travis.Helpers.Urls, {
    contentBinding: 'Travis.controllers.repository.tabs.active.content',

    render: function(context) {
      var content = this.get('content');
      var matrix = content && content.get('matrix');

      if(content && matrix) {
        context.push('<table id="matrix">');
        context.push('<caption>Build Matrix</caption>');
        context.push('<thead>');
        context.push('<th>Build</th>');
        context.push($.map(content.get('configDimensions'), function(value) { return '<th>%@</th>'.fmt(value) }));
        context.push('<th>Duration</th>');
        context.push('<th>Finished</th>');
        context.push('</thead>');
        context.push('<tbody>');

        $.each(matrix.toArray(), function(ix, build) {
          context.push('<tr class="%@">'.fmt(build.get('color')))
          context.push('<td class="number"><a href="%@">%@</a></td>'.fmt(this.urlBuild(), build.get('number')));
          context.push($.map(build.get('configValues'), function(value) { return '<td>%@</td>'.fmt(value) }));
          context.push('<td class="duration" title="%@">-</td>'.fmt(build.get('duration')));
          context.push('<td class="finished_at timeago" title="%@">-</td>'.fmt(build.get('finishedAt')));
        });

        context.push('</tbody>');
        context.push('</table>');
      }
    },
  }),
};
