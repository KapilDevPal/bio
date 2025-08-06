class BiodataController < ApplicationController
  before_action :set_biodatum, only: [:show, :edit, :update, :preview]

  def index
    @biodata = Biodatum.where(is_active: true).order(created_at: :desc)
  end

  def show
    # Show the public view of the biodata
  end

  def new
    @biodatum = Biodatum.new
    setup_default_sections
  end

  def create
    @biodatum = Biodatum.new(biodatum_params)
    
    if @biodatum.save
      redirect_to @biodatum, notice: 'Biodata was successfully created.'
    else
      setup_default_sections
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    setup_default_sections
  end

  def update
    if @biodatum.update(biodatum_params)
      redirect_to @biodatum, notice: 'Biodata was successfully updated.'
    else
      setup_default_sections
      render :edit, status: :unprocessable_entity
    end
  end

  def preview
    # Preview the biodata with the selected template
    render layout: false
  end

  private

  def set_biodatum
    @biodatum = Biodatum.find_by!(slug: params[:id])
  end

  def biodatum_params
    params.require(:biodatum).permit(
      :name, :photo, :background_template, :description,
      biodata_sections_attributes: [
        :id, :name, :position, :_destroy,
        biodata_fields_attributes: [
          :id, :label, :value, :field_type, :position, :_destroy
        ]
      ]
    )
  end

  def setup_default_sections
    return if @biodatum.biodata_sections.any?

    # Create default sections if none exist
    default_sections = [
      { name: 'Personal Information', position: 1 },
      { name: 'Family Information', position: 2 },
      { name: 'Contact Information', position: 3 },
      { name: 'Education & Career', position: 4 },
      { name: 'Partner Preferences', position: 5 }
    ]

    default_sections.each do |section_attrs|
      section = @biodatum.biodata_sections.build(section_attrs)
      
      # Add some default fields for each section
      case section.name
      when 'Personal Information'
        add_default_fields(section, [
          { label: 'Full Name', field_type: 'text' },
          { label: 'Date of Birth', field_type: 'date' },
          { label: 'Age', field_type: 'number' },
          { label: 'Height', field_type: 'text' },
          { label: 'Blood Group', field_type: 'text' },
          { label: 'Religion', field_type: 'text' },
          { label: 'Caste', field_type: 'text' }
        ])
      when 'Family Information'
        add_default_fields(section, [
          { label: 'Father\'s Name', field_type: 'text' },
          { label: 'Mother\'s Name', field_type: 'text' },
          { label: 'Family Type', field_type: 'text' },
          { label: 'Family Status', field_type: 'text' }
        ])
      when 'Contact Information'
        add_default_fields(section, [
          { label: 'Phone Number', field_type: 'phone' },
          { label: 'Email Address', field_type: 'email' },
          { label: 'Address', field_type: 'textarea' }
        ])
      when 'Education & Career'
        add_default_fields(section, [
          { label: 'Education', field_type: 'text' },
          { label: 'Occupation', field_type: 'text' },
          { label: 'Company', field_type: 'text' },
          { label: 'Annual Income', field_type: 'text' }
        ])
      when 'Partner Preferences'
        add_default_fields(section, [
          { label: 'Age Range', field_type: 'text' },
          { label: 'Education Preference', field_type: 'text' },
          { label: 'Location Preference', field_type: 'text' },
          { label: 'Occupation Preference', field_type: 'text' }
        ])
      end
    end
  end

  def add_default_fields(section, fields)
    fields.each_with_index do |field_attrs, index|
      section.biodata_fields.build(
        label: field_attrs[:label],
        field_type: field_attrs[:field_type],
        position: index
      )
    end
  end
end
