# WickedPDF Configuration
WickedPdf.configure do |config|
  # Path to the wkhtmltopdf executable
  config.exe_path = Gem.bin_path('wkhtmltopdf-binary', 'wkhtmltopdf')
  
  # Default options for PDF generation
  config.default_options = {
    page_size: 'A4',
    print_media_type: true,
    disable_javascript: false,
    disable_internal_links: false,
    disable_external_links: false,
    no_stop_slow_scripts: false,
    no_background: false,
    encoding: 'UTF-8',
    margin: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    },
    viewport_size: '1280x1024',
    enable_local_file_access: true
  }
end 