class BiosController < ApplicationController
  before_action :set_bio, only: [:show, :destroy]
  before_action :set_bio_by_edit_token, only: [:edit, :update, :download_pdf, :download_image, :qr_code, :share_link]
  before_action :set_bio_by_slug, only: [:show]
  skip_before_action :verify_authenticity_token, only: [:update], if: -> { request.xhr? }

  def new
    @bio = Bio.new(language_code: 'en', template: 'classic')
  end

  def debug
    # This action will render the debug view
  end

  def create
    @bio = Bio.new(bio_params)
    @bio.template ||= 'classic'  # Set default template if not provided
    
    if @bio.save
      # Create default sections and fields
      Bio.default_sections.each do |section_attrs|
        section = @bio.sections.create!(section_attrs)
        Bio.default_fields_for_section(section_attrs[:name]).each do |field_attrs|
          section.fields.create!(field_attrs)
        end
      end
      
      # Debug: Check if sections were created
      Rails.logger.info "Created bio with #{@bio.sections.count} sections and #{@bio.fields.count} fields"
      
      redirect_to edit_bio_path(@bio.edit_token), notice: 'Biodata created successfully!'
    else
      Rails.logger.error "Failed to create bio: #{@bio.errors.full_messages}"
      render :new, status: :unprocessable_entity
    end
  end

  def show
    respond_to do |format|
      format.html { 
        render "templates/#{@bio.template}", locals: { bio: @bio }
      }
      format.pdf do
        render pdf: "marriage_biodata_#{@bio.slug}",
               template: "templates/#{@bio.template}",
               layout: "pdf",
               disposition: "attachment"
      end
    end
  end

  def edit
    # Ensure we have all sections and fields
    if @bio.sections.empty?
      Bio.default_sections.each do |section_attrs|
        section = @bio.sections.create!(section_attrs)
        Bio.default_fields_for_section(section_attrs[:name]).each do |field_attrs|
          section.fields.create!(field_attrs)
        end
      end
    end
  end

  def update
    # Debug logging
    Rails.logger.info "Update params: #{params.inspect}"
    Rails.logger.info "Bio params: #{bio_params.inspect}"
    
    # Check if language is being changed
    language_changed = @bio.language_code != bio_params[:language_code]
    
    if @bio.update(bio_params)
      # If language changed, update field labels
      if language_changed
        update_field_labels_for_language
      end
      
      respond_to do |format|
        format.html { redirect_to edit_bio_path(@bio.edit_token), notice: 'Biodata updated successfully!' }
        format.turbo_stream { 
          render turbo_stream: turbo_stream.replace("template-preview", partial: "templates/#{@bio.template}", locals: { bio: @bio })
        }
        format.json { render json: { success: true, bio: @bio.as_json(include: { sections: { include: :fields } }) } }
        format.js { 
          render json: { success: true, html: render_to_string(partial: "templates/#{@bio.template}", locals: { bio: @bio }) }
        }
        format.text { 
          render plain: render_to_string(partial: "templates/#{@bio.template}", locals: { bio: @bio })
        }
        format.all { 
          # For any other format, return the template HTML
          render plain: render_to_string(partial: "templates/#{@bio.template}", locals: { bio: @bio })
        }
      end
    else
      Rails.logger.error "Update failed: #{@bio.errors.full_messages}"
      respond_to do |format|
        format.html { render :edit, status: :unprocessable_entity }
        format.turbo_stream { 
          render turbo_stream: turbo_stream.replace("template-preview", partial: "templates/#{@bio.template}", locals: { bio: @bio })
        }
        format.json { render json: { success: false, errors: @bio.errors }, status: :unprocessable_entity }
        format.js { 
          render json: { success: false, errors: @bio.errors }, status: :unprocessable_entity
        }
        format.text { 
          render plain: "Error updating template", status: :unprocessable_entity
        }
        format.all { 
          render plain: "Error updating template", status: :unprocessable_entity
        }
      end
    end
  end

  def destroy
    @bio.destroy
    redirect_to root_path, notice: 'Biodata deleted successfully!'
  end

  def download_pdf
    respond_to do |format|
      format.pdf do
        render pdf: "marriage_biodata_#{@bio.slug}",
               template: "templates/#{@bio.template}",
               layout: "pdf",
               disposition: "attachment"
      end
    end
  end

  def download_image
    # Generate HTML content for the biodata using selected template
    html_content = render_to_string(partial: "templates/#{@bio.template}", locals: { bio: @bio })
    
    # Use Puppeteer or similar to convert HTML to image
    # For now, we'll return the HTML with instructions to save as image
    send_data html_content, 
              type: 'text/html', 
              disposition: 'attachment',
              filename: "biodata_#{@bio.slug}.html"
  end

  def qr_code
    qr = RQRCode::QRCode.new(@bio.edit_url)
    svg = qr.as_svg(
      color: "000",
      shape_rendering: "crispEdges",
      module_size: 6,
      standalone: true
    )
    
    send_data svg, type: 'image/svg+xml', disposition: 'inline'
  end

  def share_link
    render json: { 
      public_url: @bio.public_url,
      edit_url: @bio.edit_url,
      qr_code_url: qr_code_bio_path(@bio)
    }
  end

  private

  def set_bio
    @bio = Bio.find(params[:id])
  end

  def set_bio_by_edit_token
    @bio = Bio.find_by!(edit_token: params[:edit_token])
  end

  def set_bio_by_slug
    @bio = Bio.find_by!(slug: params[:slug])
  end

  def update_field_labels_for_language
    # Update field labels based on the new language
    @bio.sections.each do |section|
      section.fields.each do |field|
        # Only update if the field has a default English label
        if Bio.default_fields_for_section(section.name).any? { |f| f[:label] == field.label }
          localized_label = @bio.get_localized_label(field.label)
          field.update(label: localized_label) if localized_label != field.label
        end
      end
    end
  end

  def bio_params
    params.require(:bio).permit(
      :language_code, :template,
      sections_attributes: [
        :id, :name, :position, :_destroy,
        fields_attributes: [:id, :label, :value, :position, :_destroy]
      ]
    )
  end
end
