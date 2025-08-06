class AdminController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_admin

  def dashboard
    @total_biodata = Biodatum.count
    @total_visits = Visit.count
    @visits_today = Visit.today.count
    @visits_this_week = Visit.this_week.count
    @visits_this_month = Visit.this_month.count
    @recent_biodata = Biodatum.order(created_at: :desc).limit(5)
    @recent_visits = Visit.recent.limit(10)
  end

  def biodata
    @biodata = Biodatum.includes(:biodata_sections, :biodata_fields, :visits)
                      .order(created_at: :desc)
                      .page(params[:page])
                      .per(20)
  end

  def visits
    @visits = Visit.includes(:biodatum)
                   .order(visited_at: :desc)
                   .page(params[:page])
                   .per(50)
  end

  private

  def ensure_admin
    # Simple admin check - you can enhance this based on your needs
    unless current_user&.email == 'admin@example.com'
      redirect_to root_path, alert: 'Access denied. Admin only.'
    end
  end
end 