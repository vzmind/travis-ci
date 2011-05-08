# encoding: utf-8
# truncate all tables for test and development
if Rails.env != 'production'
  require 'database_cleaner'
  DatabaseCleaner.clean_with(:truncation)
end

minimal = Repository.create!({
  :owner_name => 'svenfuchs',
  :name => 'minimal',
  :url => 'https://github.com/svenfuchs/minimal',
  :last_duration => 10
})

enginex = Repository.create!({
  :owner_name => 'josevalim',
  :name => 'enginex',
  :url => 'https://github.com/josevalim/enginex',
  :last_duration => 30
})

builds = [
  {
    :repository => minimal,
    :number => '1',
    :commit => '1a738d9d6f297c105ae2',
    :ref => 'refs/heads/develop',
    :branch => 'master',
    :message => 'Add Gemfile',
    :committed_at => '2010-11-12 11:58:00',
    :committer_name => 'Sven Fuchs',
    :committer_email => 'svenfuchs@artweb-design.de',
    :status => 1,
    :started_at => '2010-11-12 1:00:00',
    :finished_at => '2010-11-12 1:00:10',
    :agent => '76f4f2ba',
    :log => 'minimal build 1 log ...'
  },
  {
    :repository => minimal,
    :number => '2',
    :commit => '91d1b7b2a310131fe3f8',
    :ref => 'refs/heads/master',
    :branch => 'master',
    :message => 'Bump to 0.0.22',
    :committed_at => '2010-11-12 12:28:00',
    :committer_name => 'Sven Fuchs',
    :committer_email => 'svenfuchs@artweb-design.de',
    :author_name => 'Chris Floess',
    :author_email => 'flooose@gmail.com',
    :status => 0,
    :started_at => '2010-11-12 2:00:00',
    :finished_at => '2010-11-12 2:00:10',
    :agent => 'a1732e4f',
    :log => 'minimal build 2 log ...'
  },
  {
    :repository => enginex,
    :number => '1',
    :commit => '565294c',
    :message => 'Update Capybara',
    :committed_at => '2010-11-11 11:58:00',
    :author_name => 'Jose Valim',
    :author_email => 'jose@email.com',
    :committer_name => 'Jose Valim',
    :committer_email => 'jose@email.com',
    :status => 1,
    :started_at => '2010-11-11 3:00:00',
    :finished_at => '2010-11-11 3:00:20',
    :agent => 'a1732e4f',
    :log => 'enginex build 1 log ...',
    :config => { 'rvm' => ['1.8.7', '1.9.2'] }
  },
  {
    :repository => enginex,
    :number => '2',
    :commit => '1ba4b1f',
    :message => 'Update Gemfile',
    :committer_name => 'Jose Valim',
    :committer_email => 'jose@email.com',
    :author_name => 'Jose Valim',
    :author_email => 'jose@email.com',
    :log => 'enginex build 1 log ...',
    :status => 0,
    :started_at => '2010-11-11 3:00:00',
    :finished_at => '2010-11-11 3:00:20',
    :config => { 'rvm' => ['1.8.7', '1.9.2'] }
  },
]

builds.each do |build|
  Build.create!(build)
end

[4, 5, 7, 8].each do |id|
  Build.find(id).update_attributes!(:log => "enginex build #{build.number} log")
end
