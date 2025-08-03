class Bio < ApplicationRecord
  has_many :sections, -> { order(position: :asc) }, dependent: :destroy
  has_many :fields, through: :sections

  validates :slug, presence: true, uniqueness: true
  validates :edit_token, presence: true, uniqueness: true
  validates :language_code, presence: true, inclusion: { in: %w[en hi pa mr te ta] }

  before_validation :generate_slug, on: :create
  before_validation :generate_edit_token, on: :create

  accepts_nested_attributes_for :sections, allow_destroy: true
  accepts_nested_attributes_for :fields, allow_destroy: true

  def self.default_sections
    [
      { name: 'Personal Details', position: 1 },
      { name: 'Family Details', position: 2 },
      { name: 'Contact Details', position: 3 },
      { name: 'Partner Preferences', position: 4 }
    ]
  end

  def self.default_fields_for_section(section_name)
    case section_name
    when 'Personal Details'
      [
        { label: 'Full Name', value: '', position: 1 },
        { label: 'Date of Birth', value: '', position: 2 },
        { label: 'Age', value: '', position: 3 },
        { label: 'Height', value: '', position: 4 },
        { label: 'Education', value: '', position: 5 },
        { label: 'Occupation', value: '', position: 6 },
        { label: 'Religion', value: '', position: 7 },
        { label: 'Caste', value: '', position: 8 },
        { label: 'Marital Status', value: '', position: 9 }
      ]
    when 'Family Details'
      [
        { label: 'Father\'s Name', value: '', position: 1 },
        { label: 'Mother\'s Name', value: '', position: 2 },
        { label: 'Family Type', value: '', position: 3 },
        { label: 'Family Income', value: '', position: 4 },
        { label: 'Native Place', value: '', position: 5 },
        { label: 'Siblings', value: '', position: 6 }
      ]
    when 'Contact Details'
      [
        { label: 'Phone Number', value: '', position: 1 },
        { label: 'Email', value: '', position: 2 },
        { label: 'Address', value: '', position: 3 },
        { label: 'City', value: '', position: 4 },
        { label: 'State', value: '', position: 5 }
      ]
    when 'Partner Preferences'
      [
        { label: 'Preferred Age Range', value: '', position: 1 },
        { label: 'Preferred Education', value: '', position: 2 },
        { label: 'Preferred Occupation', value: '', position: 3 },
        { label: 'Preferred Location', value: '', position: 4 },
        { label: 'Other Preferences', value: '', position: 5 }
      ]
    else
      []
    end
  end

  def create_with_default_sections
    transaction do
      save!
      Bio.default_sections.each do |section_attrs|
        section = sections.create!(section_attrs)
        Bio.default_fields_for_section(section_attrs[:name]).each do |field_attrs|
          section.fields.create!(field_attrs)
        end
      end
    end
  end

  def public_url
    Rails.application.routes.url_helpers.bio_url(slug: slug, host: Rails.application.config.action_mailer.default_url_options[:host])
  end

  def edit_url
    Rails.application.routes.url_helpers.edit_bio_url(edit_token: edit_token, host: Rails.application.config.action_mailer.default_url_options[:host])
  end

  private

  def generate_slug
    return if slug.present?
    
    loop do
      self.slug = SecureRandom.alphanumeric(8).downcase
      break unless Bio.exists?(slug: slug)
    end
  end

  def generate_edit_token
    return if edit_token.present?
    
    loop do
      self.edit_token = SecureRandom.uuid
      break unless Bio.exists?(edit_token: edit_token)
    end
  end
end
