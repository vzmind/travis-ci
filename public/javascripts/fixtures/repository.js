sc_require('models/repository');

Travis.Repository.FIXTURES = [
  {
    id: 1,
    slug: 'svenfuchs/minimal',
    last_build_number: 4,
    last_build_started_at: '2010-11-12T13:00:00Z',
    last_build_finished_at: '2010-11-12T13:00:20Z',
    last_build_status: 1,
    finished: false,
    builds: [1, 2]
  },
  {
    id: 2,
    slug: 'josevalim/enginex',
    last_build_number: 1,
    last_build_started_at: '2010-11-12T13:01:00Z',
    last_build_finished_at: '2010-11-12T13:01:20Z',
    last_build_status: 0,
    finished: true,
    builds: [3, 4, 5, 6, 7, 8]
  }
];

