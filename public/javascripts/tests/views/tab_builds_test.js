describe('Views: the builds history tab', function() {
  beforeEach(function() {
    follow('svenfuchs/minimal');
    follow('Build History');
  });

  it('has the builds tab activated', function() {
    expect('#repository').toShowActiveTab('builds');
  });

  it('shows the builds history table', function() {
    expect('#tab_builds #builds').toMatchTable([
      ['Build', 'Commit',           'Message',              ],
      ['2',     '91d1b7b (master)', 'Bump to 0.0.22'        ],
      ['1',     '1a738d9 (master)', 'Add Gemfile'           ],
    ]);
    // expect(this.history.el.find('tbody .green').length).toEqual(1);
  });
});


