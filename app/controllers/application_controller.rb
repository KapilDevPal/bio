class ApplicationController < ActionController::Base
  def index
    # Landing page - show the beautiful welcome page from main branch
  end

  def data_entry
    # Phase 1: Data entry page
  end

  def template_selection
    # Phase 2: Template selection page
    @biodata = session[:biodata_data] || {}
  end

  def preview
    # Phase 3: Preview and export page
    @biodata = session[:biodata_data] || {}
    @selected_template = params[:template] || 'classic'
  end

  def save_data
    # Save biodata to session
    session[:biodata_data] = params[:biodata]
    redirect_to template_selection_path
  end

  def update_template
    # Update selected template
    session[:selected_template] = params[:template]
    redirect_to preview_path(template: params[:template])
  end

  def export_pdf
    @biodata = session[:biodata_data] || {}
    @selected_template = params[:template] || 'classic'
    
    respond_to do |format|
      format.pdf do
        pdf = Prawn::Document.new(page_size: 'A4', margin: [20, 20, 20, 20])
        
        # Header
        pdf.text "Biodata", size: 24, style: :bold, align: :center
        pdf.move_down 20
        
        # Personal Information
        if @biodata["personal"].present?
          pdf.text "Personal Information", size: 16, style: :bold
          pdf.move_down 10
          
          @biodata["personal"].each do |key, value|
            if value.present?
              pdf.text "#{key.titleize}: #{value}", size: 12
              pdf.move_down 5
            end
          end
          pdf.move_down 15
        end
        
        # Family Information
        if @biodata["family"].present?
          pdf.text "Family Information", size: 16, style: :bold
          pdf.move_down 10
          
          @biodata["family"].each do |key, value|
            if value.present?
              pdf.text "#{key.titleize}: #{value}", size: 12
              pdf.move_down 5
            end
          end
          pdf.move_down 15
        end
        
        # Contact Information
        if @biodata["contact"].present?
          pdf.text "Contact Information", size: 16, style: :bold
          pdf.move_down 10
          
          @biodata["contact"].each do |key, value|
            if value.present?
              pdf.text "#{key.titleize}: #{value}", size: 12
              pdf.move_down 5
            end
          end
          pdf.move_down 15
        end
        
        # Partner Preferences
        if @biodata["preferences"].present?
          pdf.text "Partner Preferences", size: 16, style: :bold
          pdf.move_down 10
          
          @biodata["preferences"].each do |key, value|
            if value.present?
              pdf.text "#{key.titleize}: #{value}", size: 12
              pdf.move_down 5
            end
          end
          pdf.move_down 15
        end
        
        # Footer
        pdf.move_down 20
        pdf.text "Generated on #{Date.current.strftime('%B %d, %Y')}", size: 10, align: :center
        
        send_data pdf.render, filename: "biodata_#{Date.current}.pdf", type: "application/pdf", disposition: "attachment"
      end
    end
  end

  def export_image
    @biodata = session[:biodata_data] || {}
    @selected_template = params[:template] || 'classic'
    
    # For image export, we'll provide a clean HTML page that users can screenshot
    # or use browser's "Save as image" feature
    render "application/export_image", layout: false
  end
end
