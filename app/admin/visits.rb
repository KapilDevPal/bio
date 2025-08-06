ActiveAdmin.register Visit do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :biodatum_id, :ip_address, :user_agent, :visited_at

  #
  # or
  #
  # permit_params do
  #   permitted = [:biodatum_id, :ip_address, :user_agent, :visited_at]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
  index do
    selectable_column
    id_column
    column :biodatum
    column :ip_address
    column :user_agent do |visit|
      truncate(visit.user_agent, length: 50)
    end
    column :visited_at
    column "Time Ago" do |visit|
      time_ago_in_words(visit.visited_at) + " ago"
    end
    actions
  end

  show do
    attributes_table do
      row :id
      row :biodatum
      row :ip_address
      row :user_agent
      row :visited_at
      row "Time Ago" do |visit|
        time_ago_in_words(visit.visited_at) + " ago"
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :biodatum
      f.input :ip_address
      f.input :user_agent
      f.input :visited_at
    end
    f.actions
  end

  sidebar "Visit Statistics", only: :index do
    attributes_table do
      row "Total Visits" do
        Visit.count
      end
      row "Visits Today" do
        Visit.today.count
      end
      row "Visits This Week" do
        Visit.this_week.count
      end
      row "Visits This Month" do
        Visit.this_month.count
      end
      row "Unique IPs" do
        Visit.distinct.count(:ip_address)
      end
    end
  end

  filter :biodatum
  filter :ip_address
  filter :visited_at
  filter :created_at
end
