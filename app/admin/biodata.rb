ActiveAdmin.register Biodatum do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :name, :description, :background_template, :photo, :is_active,
                biodata_sections_attributes: [:id, :name, :position, :_destroy,
                  biodata_fields_attributes: [:id, :label, :value, :field_type, :position, :_destroy]]

  #
  # or
  #
  # permit_params do
  #   permitted = [:name, :description, :background_template, :photo, :is_active]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  index do
    selectable_column
    id_column
    column :name
    column :background_template
    column :sections_count do |biodatum|
      biodatum.biodata_sections.count
    end
    column :fields_count do |biodatum|
      biodatum.biodata_fields.count
    end
    column :total_visits do |biodatum|
      biodatum.total_visits
    end
    column :created_at
    actions do |biodatum|
      item "Preview", preview_biodatum_path(biodatum), target: "_blank"
      item "View Public", biodatum_path(biodatum), target: "_blank"
    end
  end

  show do
    attributes_table do
      row :id
      row :name
      row :description
      row :background_template
      row :is_active
      row :created_at
      row :updated_at
      row :total_visits
      row :visits_today
      row :visits_this_week
      row :visits_this_month
      row :photo do |biodatum|
        if biodatum.photo.attached?
          image_tag biodatum.photo, style: "max-width: 200px; max-height: 200px;"
        else
          "No photo attached"
        end
      end
    end

    panel "Sections" do
      table_for biodatum.biodata_sections do
        column :name
        column :position
        column :fields_count do |section|
          section.biodata_fields.count
        end
      end
    end

    panel "Fields" do
      table_for biodatum.biodata_fields do
        column :label
        column :value
        column :field_type
        column :position
        column :section do |field|
          field.biodata_section&.name
        end
      end
    end

    panel "Recent Visits" do
      table_for biodatum.visits.recent.limit(10) do
        column :ip_address
        column :visited_at
        column :user_agent do |visit|
          truncate(visit.user_agent, length: 50)
        end
      end
    end
  end

  sidebar "Statistics", only: :show do
    attributes_table do
      row "Total Sections" do |biodatum|
        biodatum.biodata_sections.count
      end
      row "Total Fields" do |biodatum|
        biodatum.biodata_fields.count
      end
      row "Fields with Values" do |biodatum|
        biodatum.biodata_fields.where.not(value: [nil, ""]).count
      end
      row "Empty Fields" do |biodatum|
        biodatum.biodata_fields.where(value: [nil, ""]).count
      end
      row "Total Visits" do |biodatum|
        biodatum.total_visits
      end
      row "Visits Today" do |biodatum|
        biodatum.visits_today
      end
      row "Visits This Week" do |biodatum|
        biodatum.visits_this_week
      end
      row "Visits This Month" do |biodatum|
        biodatum.visits_this_month
      end
    end
  end

  action_item :preview_biodata, only: :show do
    link_to "Preview Biodata", preview_biodatum_path(biodatum), target: "_blank"
  end

  action_item :view_public, only: :show do
    link_to "View Public Page", biodatum_path(biodatum), target: "_blank"
  end
end
