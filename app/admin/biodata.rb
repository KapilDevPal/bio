ActiveAdmin.register Biodatum do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :name, :slug, :photo, :background_template, :description, :is_active,
                biodata_sections_attributes: [:id, :name, :position, :_destroy,
                  biodata_fields_attributes: [:id, :label, :value, :field_type, :position, :_destroy]]

  #
  # or
  #
  # permit_params do
  #   permitted = [:name, :slug, :photo, :background_template, :description, :is_active]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
  index do
    selectable_column
    id_column
    column :name
    column :slug
    column :background_template
    column :is_active
    column :created_at
    column :updated_at
    column "Total Sections" do |biodatum|
      biodatum.biodata_sections.count
    end
    column "Total Fields" do |biodatum|
      biodatum.biodata_fields.count
    end
    column "Total Visits" do |biodatum|
      biodatum.total_visits
    end
    column "Visits Today" do |biodatum|
      biodatum.visits_today
    end
    column "Photo" do |biodatum|
      if biodatum.photo.attached?
        image_tag biodatum.photo, style: "width: 50px; height: 50px; object-fit: cover; border-radius: 50%;"
      else
        "No photo"
      end
    end
    actions
  end

  show do
    attributes_table do
      row :id
      row :name
      row :slug
      row :background_template
      row :description
      row :is_active
      row :created_at
      row :updated_at
      row "Photo" do |biodatum|
        if biodatum.photo.attached?
          image_tag biodatum.photo, style: "width: 100px; height: 100px; object-fit: cover; border-radius: 50%;"
        else
          "No photo"
        end
      end
      row "Total Sections" do |biodatum|
        biodatum.biodata_sections.count
      end
      row "Total Fields" do |biodatum|
        biodatum.biodata_fields.count
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

    panel "Sections" do
      table_for biodatum.biodata_sections do
        column :name
        column :position
        column "Fields Count" do |section|
          section.biodata_fields.count
        end
        column :created_at
      end
    end

    panel "Fields" do
      table_for biodatum.biodata_fields.includes(:biodata_section) do
        column :label
        column :value
        column :field_type
        column "Section" do |field|
          field.biodata_section&.name
        end
        column :position
      end
    end

    panel "Recent Visits" do
      table_for biodatum.visits.recent.limit(10) do
        column :ip_address
        column :user_agent do |visit|
          truncate(visit.user_agent, length: 50)
        end
        column :visited_at
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :slug
      f.input :background_template, as: :select, collection: Biodatum::BACKGROUND_TEMPLATES
      f.input :description
      f.input :is_active
      f.input :photo, as: :file
    end

    f.inputs "Sections" do
      f.has_many :biodata_sections, allow_destroy: true do |section|
        section.input :name
        section.input :position
        section.has_many :biodata_fields, allow_destroy: true do |field|
          field.input :label
          field.input :value
          field.input :field_type, as: :select, collection: BiodataField::FIELD_TYPES
          field.input :position
        end
      end
    end

    f.actions
  end

  sidebar "Statistics", only: :show do
    attributes_table_for resource do
      row "Total Sections" do
        resource.biodata_sections.count
      end
      row "Total Fields" do
        resource.biodata_fields.count
      end
      row "Fields with Values" do
        resource.biodata_fields.where.not(value: [nil, ""]).count
      end
      row "Empty Fields" do
        resource.biodata_fields.where(value: [nil, ""]).count
      end
      row "Total Visits" do
        resource.total_visits
      end
      row "Visits Today" do
        resource.visits_today
      end
      row "Visits This Week" do
        resource.visits_this_week
      end
      row "Visits This Month" do
        resource.visits_this_month
      end
    end
  end

  action_item :preview, only: :show do
    link_to "Preview Biodata", preview_biodatum_path(resource), target: "_blank"
  end

  action_item :view_public, only: :show do
    link_to "View Public Page", biodatum_path(resource), target: "_blank"
  end
end
