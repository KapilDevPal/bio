namespace :biodata do
  desc "Clear all biodata records and related data"
  task clear_all: :environment do
    puts "Clearing all biodata records..."
    
    # Clear in the correct order to avoid foreign key constraints
    Visit.destroy_all
    puts "✓ Visits cleared"
    
    BiodataField.destroy_all
    puts "✓ Biodata fields cleared"
    
    BiodataSection.destroy_all
    puts "✓ Biodata sections cleared"
    
    Biodatum.destroy_all
    puts "✓ Biodata records cleared"
    
    puts "All biodata records have been cleared successfully!"
  end
end 