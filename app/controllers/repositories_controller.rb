class RepositoriesController < ApplicationController
  respond_to :json

  def index
    render :json => repositories.as_json
  end

  def show
    respond_to do |format|
      format.json do
        render :json => repository.as_json
      end
      format.png do
        status = Repository.human_status_by(params.slice(:owner_name, :name))
        response.headers["Expires"] = CGI.rfc1123_date(Time.now)
        send_file(Rails.public_path + "/images/status/#{status}.png", :type => 'image/png', :disposition => 'inline')
      end
    end
  end

  protected
    def repositories
      repos = Repository.timeline.recent
      repos = repos.where(:owner_name => params[:owner_name]) if params[:owner_name].present?
      repos = repos.where(:name => params[:slug].split('/').first, :name => params[:slug].split('/').last) if params[:slug].present?
      repos = repos.search(params[:search]) if params[:search].present?
      repos
    end

    def repository
      @repository ||= params[:id] ? Repository.find(params[:id]) : nil
    end
    helper_method :repository
end
