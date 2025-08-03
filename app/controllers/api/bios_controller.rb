class Api::BiosController < ApplicationController
  before_action :set_bio_by_edit_token, only: [:update, :add_field, :remove_field, :add_section, :remove_section]
  skip_before_action :verify_authenticity_token

  def update
    if @bio.update(bio_params)
      render json: { 
        success: true, 
        bio: @bio.as_json(include: { sections: { include: :fields } })
      }
    else
      render json: { success: false, errors: @bio.errors }, status: :unprocessable_entity
    end
  end

  def add_field
    section = @bio.sections.find(params[:section_id])
    max_position = section.fields.maximum(:position) || 0
    
    field = section.fields.create!(
      label: params[:label] || "New Field",
      value: params[:value] || "",
      position: max_position + 1
    )
    
    render json: { 
      success: true, 
      field: field.as_json,
      html: render_to_string(partial: 'bios/field', locals: { field: field, section: section }, formats: [:html])
    }
  end

  def remove_field
    field = Field.find(params[:field_id])
    field.destroy
    
    render json: { success: true }
  end

  def add_section
    max_position = @bio.sections.maximum(:position) || 0
    
    section = @bio.sections.create!(
      name: params[:name] || "New Section",
      position: max_position + 1
    )
    
    render json: { 
      success: true, 
      section: section.as_json,
      html: render_to_string(partial: 'bios/section', locals: { section: section }, formats: [:html])
    }
  end

  def remove_section
    section = @bio.sections.find(params[:section_id])
    section.destroy
    
    render json: { success: true }
  end

  private

  def set_bio_by_edit_token
    @bio = Bio.find_by!(edit_token: params[:edit_token])
  end

  def bio_params
    params.require(:bio).permit(
      :language_code,
      sections_attributes: [
        :id, :name, :position, :_destroy,
        fields_attributes: [:id, :label, :value, :position, :_destroy]
      ]
    )
  end
end
