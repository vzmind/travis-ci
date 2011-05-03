sc_require('models/build');

Travis.Build.FIXTURES = [
  {
    id: 1,
    repository_id: 1,
    number: '1',
    commit: '1a738d9',
    message: 'add Gemfile',
    committer_name: 'Sven Fuchs',
    committer_email: 'svenfuchs@artweb-design.de',
    author_name: 'Sven Fuchs',
    author_email: 'svenfuchs@artweb-design.de',
    log: 'minimal build 1 log ...'
  },
  {
    id: 2,
    repository_id: 1,
    number: '2',
    commit: '91d1b7b',
    message: 'Bump to 0.0.22',
    committer_name: 'Sven Fuchs',
    committer_email: 'svenfuchs@artweb-design.de',
    author_name: 'Sven Fuchs',
    author_email: 'svenfuchs@artweb-design.de',
    log: 'minimal build 2 log ...'
  },
  {
    id: 3,
    repository_id: 2,
    number: '1',
    commit: '565294c',
    message: 'Update Capybara',
    committer_name: 'Jose Valim',
    committer_email: 'jose@email.com',
    author_name: 'Jose Valim',
    author_email: 'jose@email.com',
    log: 'enginex build 1 log ...'
  },
  {
    id: 4,
    repository_id: 2,
    parent_id: 3,
    number: '1.1',
    commit: '565294c',
    message: 'Update Capybara',
    committer_name: 'Jose Valim',
    committer_email: 'jose@email.com',
    author_name: 'Jose Valim',
    author_email: 'jose@email.com',
    log: 'enginex build 1.1 log ...'
  },
  {
    id: 5,
    repository_id: 2,
    parent_id: 3,
    number: '1.2',
    commit: '565294c',
    message: 'Update Capybara',
    committer_name: 'Jose Valim',
    committer_email: 'jose@email.com',
    author_name: 'Jose Valim',
    author_email: 'jose@email.com',
    log: 'enginex build 1.2 log ...'
  },
  {
    id: 6,
    repository_id: 2,
    number: '2',
    commit: '1ba4b1f',
    message: 'Add Gemfile',
    committer_name: 'Jose Valim',
    committer_email: 'jose@email.com',
    author_name: 'Jose Valim',
    author_email: 'jose@email.com',
    log: 'enginex build 1 log ...'
  },
  {
    id: 7,
    repository_id: 2,
    parent_id: 6,
    number: '2.1',
    commit: '1ba4b1f',
    message: 'Add Gemfile',
    committer_name: 'Jose Valim',
    committer_email: 'jose@email.com',
    author_name: 'Jose Valim',
    author_email: 'jose@email.com',
    log: 'enginex build 1.1 log ...'
  },
  {
    id: 8,
    repository_id: 2,
    parent_id: 6,
    number: '2.2',
    commit: '1ba4b1f',
    message: 'Add Gemfile',
    committer_name: 'Jose Valim',
    committer_email: 'jose@email.com',
    author_name: 'Jose Valim',
    author_email: 'jose@email.com',
    log: 'enginex build 1.2 log ...'
  },
];
