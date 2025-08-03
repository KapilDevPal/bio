class BiosController < ApplicationController
  before_action :set_bio, only: [:show, :destroy, :download_pdf, :qr_code, :share_link]
  before_action :set_bio_by_edit_token, only: [:edit, :update]
  before_action :set_bio_by_slug, only: [:show]

  def new
    @bio = Bio.new(language_code: 'en')
  end

  def debug
    # This action will render the debug view
  end

  def create
    @bio = Bio.new(bio_params)
    
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
      
      redirect_to edit_bio_path(@bio.edit_token), notice: 'Biodata created successfully! You can now customize it.'
    else
      Rails.logger.error "Failed to create bio: #{@bio.errors.full_messages}"
      render :new, status: :unprocessable_entity
    end
  end

  def show
    respond_to do |format|
      format.html
      format.pdf do
        render pdf: "marriage_biodata_#{@bio.slug}",
               template: "bios/show",
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
    if @bio.update(bio_params)
      respond_to do |format|
        format.html { redirect_to edit_bio_path(@bio.edit_token), notice: 'Biodata updated successfully!' }
        format.turbo_stream { 
          render turbo_stream: turbo_stream.replace("preview", partial: "bios/preview", locals: { bio: @bio })
        }
        format.json { render json: { success: true, bio: @bio.as_json(include: { sections: { include: :fields } }) } }
      end
    else
      respond_to do |format|
        format.html { render :edit, status: :unprocessable_entity }
        format.turbo_stream { 
          render turbo_stream: turbo_stream.replace("preview", partial: "bios/preview", locals: { bio: @bio })
        }
        format.json { render json: { success: false, errors: @bio.errors }, status: :unprocessable_entity }
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
               template: "bios/show",
               layout: "pdf",
               disposition: "attachment"
      end
    end
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
