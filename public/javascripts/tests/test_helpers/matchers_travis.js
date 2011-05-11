jasmine.matchSelectorValues = function(selector, expected, errors, context) { // TODO make this an actual matcher
  if(typeof expected === 'object') {
    $.each(expected, function(name, value) {
      var actual = $(selector, context);
      actual = name == 'text' ? actual.text() : actual.attr(name);
      if(!jasmine.doesMatchText(actual, value)) {
        errors.push('expected "' + context.selector + ' ' + selector + '" to have the attribute ' + name + ': "' + value + '", but actually has: "' + actual + '".');
      }
    });
  } else {
    var actual = $(selector, context).text();
    if(!jasmine.doesMatchText(actual, expected)) {
      errors.push('expected "' + context.selector + ' ' + selector + '" to have the text "' + expected + '", but actually has: "' + actual + '".');
    }
  }
}

beforeEach(function() {
  this.addMatchers({
    toListRepository: function(repository, options) {
      var actual = $(this.actual);
      var errors = [];
      var expected = {
        'a:nth-child(1)': repository.get('slug'),
        'a:nth-child(2)': { text: '#' + repository.get('lastBuildNumber'), href: '#!/%@/builds/%@'.fmt(repository.get('slug'), repository.get('lastBuildId')) },
        '.duration':      { title: repository.get('lastBuildDuration') },
        '.finished_at':   { title: repository.get('lastBuildFinishedAt') }
      };

      $.each(expected, function(selector, text) {
        jasmine.matchSelectorValues(selector, text, errors, actual);
      });

      // if(repository.selected && !$(this.actual).hasClass('selected')) {
      //   errors.push('expected "' + this.actual.selector + '" to be selected but it is not.');
      // } else if(!repository.selected && $(this.actual).hasClass('selected')) {
      //   errors.push('expected "' + this.actual.selector + '" not to be selected but it is.');
      // }

      // if(repository.color && !$(this.actual).hasClass(repository.color)) {
      //   errors.push('expected "' + this.actual.selector + '" to be ' + repository.color + ' but it is not.');
      // } else if(_.include(_.keys(repository), 'color') && !repository.color && _.any(['red', 'green'], function(color) { return $(this.actual).hasClass(color) })) {
      //   errors.push('expected "' + this.actual.selector + '" not to have a color class but it has.');
      // }

      this.message = function() { return errors.join("\n"); };
      return errors.length == 0;
    },
    toShowRepository: function(repository) {
      var actual = $(this.actual);
      var errors = [];

      var expected = {
        'h3 a':                    { href: 'http://github.com/' + repository.get('slug'), text: repository.get('slug') },
        '.github-stats .watchers': { href: 'http://github.com/' + repository.get('slug') + '/watchers' },
        '.github-stats .forks':    { href: 'http://github.com/' + repository.get('slug') + '/network' },
      };
      $.each(expected, function(selector, text) {
        jasmine.matchSelectorValues(selector, text, errors, actual);
      });

      this.message = function() { return errors.join("\n"); };
      return errors.length == 0;
    },
    toShowBuildSummary: function(build) {
      var actual = $(this.actual);
      var errors = [];

      var commit       = build.get('commit').slice(0, 7) + (build.get('branch') ? ' (%@)'.fmt(build.get('branch')) : '');
      var commitUrl    = 'http://github.com/' + build.getPath('repository.slug') + '/commit/' + build.get('commit');
      var committerUrl = 'mailto:' + build.get('committerEmail');
      var authorUrl    = 'mailto:' + build.get('authorEmail');

      var expected = {
        '.summary .number':        build.get('number'),
        '.summary .commit-hash a': { text: commit, href: commitUrl },
        '.summary .committer a':   { text: build.get('committerName'), href: committerUrl },
        '.summary .author a':      { text: build.get('authorName'), href: authorUrl },
        '.summary .duration':      build.get('duration') || '-',
        '.summary .finished_at':   { title: build.get('finished_at') },
      }
      $.each(expected, function(selector, text) {
        jasmine.matchSelectorValues(selector, text, errors, actual);
      });

      // if(summary.color && !$('.summary', this.actual).hasClass(summary.color)) {
      //   errors.push('expected "' + this.actual.selector + '" to be ' + summary.color + ' but it is not.');
      // } else if(_.include(_.keys(summary), 'color') && !summary.color && _.any(['red', 'green'], function(color) { return $('.summary', this.actual).hasClass(color) })) {
      //   errors.push('expected "' + this.actual.selector + '" not to have a color class but it has.');
      // }

      this.message = function() { return errors.join("\\\\n"); };
      return errors.length == 0;
    },
    toShowBuildLog: function(log) {
      this.actual = $(this.actual);
      var errors = [];
      var actual = this.actual.find('.log').text();

      if(actual != log) {
        errors.push('expected "' + this.actual.selector + ' .log" to show the log "' + log + '", but it shows "' + actual + '".');
      }

      this.message = function() { return errors.join("\\\\n"); };
      return errors.length == 0;
    },
    toShowActiveTab: function(tab) {
      this.actual = $(this.actual);
      var errors = [];

      if(!$('#tab_' + tab, this.actual).hasClass('active')) {
        errors.push('expected the tab "' + tab + '" to be active, but it is not.');
      }

      this.message = function() { return errors.join("\n"); };
      return errors.length == 0;
    },
  });
});
