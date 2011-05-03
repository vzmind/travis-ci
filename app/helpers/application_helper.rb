module ApplicationHelper
  def active_page?(page)
    controller, action = page.split('#')
    params[:controller] == controller && params[:action] == action
  end

  def gravatar(user, options = {})
    settings = { :size => 48 }.merge(options)
    image_tag("http://www.gravatar.com/avatar/#{user.profile_image_hash}?s=#{settings[:size]}&d=mm", :alt => user.name, :class => "profile-avatar")
  end

  def handlebars_template_tags
    dir = Rails.root.join('public/javascripts/app/templates/')
    Dir[dir.join('**/*.*')].map do |path|
      name = path.gsub(dir.to_s, '').sub(File.extname(path), '')
      script = File.read(path).html_safe
      content_tag(:script, script, :name => name, :type => 'text/x-js-template')
    end.join("\n").html_safe
  end
end
