require 'test_helper'

class TaggingTest < ActiveSupport::TestCase
  attr_reader :repository

  def setup
    @repository = Factory(:repository)
  end

  test "Automatic MissingTravisFile tag addition " do
    build = Factory(:build, :repository => repository)
    line1 = "$ no Travis file git clone --depth=1000 --quiet git://github.com/intridea/omniauth.git ~/builds/intridea/omniauth\n"
    build.append_log!(line1)
    build.reload

    build.add_tags 
    assert_equal build.tags, "MissingTravisFile"
  end

  test "Automatic MissingRakeFile tag addition " do
    build = Factory(:build, :repository => repository)
    line1 = "$ no RakeFile git clone --depth=1000 --quiet git://github.com/intridea/omniauth.git ~/builds/intridea/omniauth\n"
    build.append_log!(line1)
    build.reload

    build.add_tags 
    assert_equal build.tags, "MissingRakeFile"
  end
end

