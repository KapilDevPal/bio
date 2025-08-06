# Clear existing data
BiodataField.destroy_all
BiodataSection.destroy_all
Biodatum.destroy_all

# Create sample biodata
biodatum = Biodatum.create!(
  name: "Rahul Sharma",
  description: "A professional software engineer looking for a life partner",
  background_template: "watercolor-1"
)

# Create sections and fields
personal_section = biodatum.biodata_sections.create!(
  name: "Personal Information",
  position: 1
)

personal_section.biodata_fields.create!([
  { label: "Full Name", value: "Rahul Sharma", field_type: "text", position: 0, biodatum: biodatum },
  { label: "Date of Birth", value: "15 March 1995", field_type: "date", position: 1, biodatum: biodatum },
  { label: "Age", value: "28 years", field_type: "number", position: 2, biodatum: biodatum },
  { label: "Height", value: "5 feet 8 inches", field_type: "text", position: 3, biodatum: biodatum },
  { label: "Blood Group", value: "B+", field_type: "text", position: 4, biodatum: biodatum },
  { label: "Religion", value: "Hindu", field_type: "text", position: 5, biodatum: biodatum },
  { label: "Caste", value: "Brahmin", field_type: "text", position: 6, biodatum: biodatum }
])

family_section = biodatum.biodata_sections.create!(
  name: "Family Information",
  position: 2
)

family_section.biodata_fields.create!([
  { label: "Father's Name", value: "Rajesh Sharma", field_type: "text", position: 0, biodatum: biodatum },
  { label: "Mother's Name", value: "Sunita Sharma", field_type: "text", position: 1, biodatum: biodatum },
  { label: "Family Type", value: "Nuclear Family", field_type: "text", position: 2, biodatum: biodatum },
  { label: "Family Status", value: "Upper Middle Class", field_type: "text", position: 3, biodatum: biodatum }
])

contact_section = biodatum.biodata_sections.create!(
  name: "Contact Information",
  position: 3
)

contact_section.biodata_fields.create!([
  { label: "Phone Number", value: "+91 98765 43210", field_type: "phone", position: 0, biodatum: biodatum },
  { label: "Email Address", value: "rahul.sharma@email.com", field_type: "email", position: 1, biodatum: biodatum },
  { label: "Address", value: "123, Green Park, New Delhi - 110016", field_type: "textarea", position: 2, biodatum: biodatum }
])

education_section = biodatum.biodata_sections.create!(
  name: "Education & Career",
  position: 4
)

education_section.biodata_fields.create!([
  { label: "Education", value: "B.Tech in Computer Science", field_type: "text", position: 0, biodatum: biodatum },
  { label: "Occupation", value: "Software Engineer", field_type: "text", position: 1, biodatum: biodatum },
  { label: "Company", value: "Tech Solutions Pvt Ltd", field_type: "text", position: 2, biodatum: biodatum },
  { label: "Annual Income", value: "₹12,00,000", field_type: "text", position: 3, biodatum: biodatum }
])

preferences_section = biodatum.biodata_sections.create!(
  name: "Partner Preferences",
  position: 5
)

preferences_section.biodata_fields.create!([
  { label: "Age Range", value: "24-30 years", field_type: "text", position: 0, biodatum: biodatum },
  { label: "Education Preference", value: "Graduate or above", field_type: "text", position: 1, biodatum: biodatum },
  { label: "Location Preference", value: "Delhi NCR", field_type: "text", position: 2, biodatum: biodatum },
  { label: "Occupation Preference", value: "Any professional job", field_type: "text", position: 3, biodatum: biodatum }
])

puts "Sample biodata created successfully!"
puts "Visit http://localhost:3000 to see the application"

# Create admin user for admin panel
User.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
