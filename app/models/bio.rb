class Bio < ApplicationRecord
  has_many :sections, -> { order(position: :asc) }, dependent: :destroy
  has_many :fields, through: :sections

  validates :slug, presence: true, uniqueness: true
  validates :edit_token, presence: true, uniqueness: true
  validates :language_code, presence: true, inclusion: { in: %w[en hi pa mr te ta] }
  validates :template, presence: true, inclusion: { in: %w[classic modern elegant floral minimal corporate romantic vintage artistic professional] }

  before_validation :generate_slug, on: :create
  before_validation :generate_edit_token, on: :create

  accepts_nested_attributes_for :sections, allow_destroy: true

  def self.available_templates
    [
      { id: 'classic', name: 'Classic Traditional', description: 'Traditional design with formal layout', color: 'bg-blue-600' },
      { id: 'modern', name: 'Modern Minimalist', description: 'Clean and contemporary design', color: 'bg-gray-800' },
      { id: 'elegant', name: 'Elegant Premium', description: 'Sophisticated and premium look', color: 'bg-purple-600' },
      { id: 'floral', name: 'Floral Romantic', description: 'Beautiful floral patterns and colors', color: 'bg-pink-500' },
      { id: 'minimal', name: 'Minimal Clean', description: 'Simple and clean design', color: 'bg-green-600' },
      { id: 'corporate', name: 'Corporate Professional', description: 'Professional business style', color: 'bg-indigo-600' },
      { id: 'romantic', name: 'Romantic Hearts', description: 'Romantic design with heart elements', color: 'bg-red-500' },
      { id: 'vintage', name: 'Vintage Classic', description: 'Retro and vintage aesthetic', color: 'bg-yellow-600' },
      { id: 'artistic', name: 'Artistic Creative', description: 'Creative and artistic design', color: 'bg-orange-500' },
      { id: 'professional', name: 'Professional Clean', description: 'Clean professional layout', color: 'bg-teal-600' }
    ]
  end

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

  def localized_field_labels
    case language_code
    when 'hi'
      {
        'Full Name' => 'पूरा नाम',
        'Date of Birth' => 'जन्म तिथि',
        'Age' => 'उम्र',
        'Height' => 'ऊंचाई',
        'Education' => 'शिक्षा',
        'Occupation' => 'व्यवसाय',
        'Religion' => 'धर्म',
        'Caste' => 'जाति',
        'Marital Status' => 'वैवाहिक स्थिति',
        'Father\'s Name' => 'पिता का नाम',
        'Mother\'s Name' => 'माता का नाम',
        'Family Type' => 'परिवार का प्रकार',
        'Family Income' => 'परिवार की आय',
        'Native Place' => 'मूल निवास',
        'Siblings' => 'भाई-बहन',
        'Phone Number' => 'फोन नंबर',
        'Email' => 'ईमेल',
        'Address' => 'पता',
        'City' => 'शहर',
        'State' => 'राज्य',
        'Preferred Age Range' => 'पसंदीदा उम्र सीमा',
        'Preferred Education' => 'पसंदीदा शिक्षा',
        'Preferred Occupation' => 'पसंदीदा व्यवसाय',
        'Preferred Location' => 'पसंदीदा स्थान',
        'Other Preferences' => 'अन्य पसंद'
      }
    when 'pa'
      {
        'Full Name' => 'ਪੂਰਾ ਨਾਮ',
        'Date of Birth' => 'ਜਨਮ ਤਾਰੀਖ',
        'Age' => 'ਉਮਰ',
        'Height' => 'ਕੱਦ',
        'Education' => 'ਸਿੱਖਿਆ',
        'Occupation' => 'ਕਿੱਤਾ',
        'Religion' => 'ਧਰਮ',
        'Caste' => 'ਜਾਤ',
        'Marital Status' => 'ਵਿਆਹੁਤਾ ਸਥਿਤੀ',
        'Father\'s Name' => 'ਪਿਤਾ ਦਾ ਨਾਮ',
        'Mother\'s Name' => 'ਮਾਤਾ ਦਾ ਨਾਮ',
        'Family Type' => 'ਪਰਿਵਾਰ ਦਾ ਕਿਸਮ',
        'Family Income' => 'ਪਰਿਵਾਰ ਦੀ ਆਮਦਨ',
        'Native Place' => 'ਮੂਲ ਸਥਾਨ',
        'Siblings' => 'ਭਰਾ-ਭੈਣ',
        'Phone Number' => 'ਫੋਨ ਨੰਬਰ',
        'Email' => 'ਈਮੇਲ',
        'Address' => 'ਪਤਾ',
        'City' => 'ਸ਼ਹਿਰ',
        'State' => 'ਰਾਜ',
        'Preferred Age Range' => 'ਪਸੰਦੀਦਾ ਉਮਰ ਸੀਮਾ',
        'Preferred Education' => 'ਪਸੰਦੀਦਾ ਸਿੱਖਿਆ',
        'Preferred Occupation' => 'ਪਸੰਦੀਦਾ ਕਿੱਤਾ',
        'Preferred Location' => 'ਪਸੰਦੀਦਾ ਸਥਾਨ',
        'Other Preferences' => 'ਹੋਰ ਪਸੰਦ'
      }
    when 'te'
      {
        'Full Name' => 'పూర్తి పేరు',
        'Date of Birth' => 'పుట్టిన తేదీ',
        'Age' => 'వయస్సు',
        'Height' => 'ఎత్తు',
        'Education' => 'విద్య',
        'Occupation' => 'వృత్తి',
        'Religion' => 'మతం',
        'Caste' => 'కులం',
        'Marital Status' => 'వివాహ స్థితి',
        'Father\'s Name' => 'తండ్రి పేరు',
        'Mother\'s Name' => 'తల్లి పేరు',
        'Family Type' => 'కుటుంబ రకం',
        'Family Income' => 'కుటుంబ ఆదాయం',
        'Native Place' => 'స్వస్థలం',
        'Siblings' => 'సోదరీమణులు',
        'Phone Number' => 'ఫోన్ నంబర్',
        'Email' => 'ఇమెయిల్',
        'Address' => 'చిరునామా',
        'City' => 'నగరం',
        'State' => 'రాష్ట్రం',
        'Preferred Age Range' => 'ఇష్టమైన వయస్సు పరిధి',
        'Preferred Education' => 'ఇష్టమైన విద్య',
        'Preferred Occupation' => 'ఇష్టమైన వృత్తి',
        'Preferred Location' => 'ఇష్టమైన ప్రదేశం',
        'Other Preferences' => 'ఇతర ఇష్టాలు'
      }
    when 'ta'
      {
        'Full Name' => 'முழு பெயர்',
        'Date of Birth' => 'பிறந்த தேதி',
        'Age' => 'வயது',
        'Height' => 'உயரம்',
        'Education' => 'கல்வி',
        'Occupation' => 'தொழில்',
        'Religion' => 'மதம்',
        'Caste' => 'சாதி',
        'Marital Status' => 'திருமண நிலை',
        'Father\'s Name' => 'தந்தை பெயர்',
        'Mother\'s Name' => 'தாய் பெயர்',
        'Family Type' => 'குடும்ப வகை',
        'Family Income' => 'குடும்ப வருமானம்',
        'Native Place' => 'பிறப்பிடம்',
        'Siblings' => 'சகோதரர்கள்',
        'Phone Number' => 'தொலைபேசி எண்',
        'Email' => 'மின்னஞ்சல்',
        'Address' => 'முகவரி',
        'City' => 'நகரம்',
        'State' => 'மாநிலம்',
        'Preferred Age Range' => 'விரும்பிய வயது வரம்பு',
        'Preferred Education' => 'விரும்பிய கல்வி',
        'Preferred Occupation' => 'விரும்பிய தொழில்',
        'Preferred Location' => 'விரும்பிய இடம்',
        'Other Preferences' => 'பிற விருப்பங்கள்'
      }
    when 'mr'
      {
        'Full Name' => 'पूर्ण नाव',
        'Date of Birth' => 'जन्म तारीख',
        'Age' => 'वय',
        'Height' => 'उंची',
        'Education' => 'शिक्षण',
        'Occupation' => 'व्यवसाय',
        'Religion' => 'धर्म',
        'Caste' => 'जात',
        'Marital Status' => 'वैवाहिक स्थिती',
        'Father\'s Name' => 'वडिलांचे नाव',
        'Mother\'s Name' => 'आईचे नाव',
        'Family Type' => 'कुटुंबाचा प्रकार',
        'Family Income' => 'कुटुंबाचे उत्पन्न',
        'Native Place' => 'मूळ गाव',
        'Siblings' => 'भावंडे',
        'Phone Number' => 'फोन नंबर',
        'Email' => 'ईमेल',
        'Address' => 'पत्ता',
        'City' => 'शहर',
        'State' => 'राज्य',
        'Preferred Age Range' => 'पसंतीचे वय श्रेणी',
        'Preferred Education' => 'पसंतीचे शिक्षण',
        'Preferred Occupation' => 'पसंतीचे व्यवसाय',
        'Preferred Location' => 'पसंतीचे स्थान',
        'Other Preferences' => 'इतर पसंती'
      }
    else
      {}
    end
  end

  def get_localized_label(english_label)
    localized_field_labels[english_label] || english_label
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
    
    base_slug = "bio-#{SecureRandom.hex(4)}"
    counter = 1
    
    while Bio.exists?(slug: base_slug)
      base_slug = "bio-#{SecureRandom.hex(4)}-#{counter}"
      counter += 1
    end
    
    self.slug = base_slug
  end

  def generate_edit_token
    return if edit_token.present?
    
    loop do
      self.edit_token = SecureRandom.uuid
      break unless Bio.exists?(edit_token: edit_token)
    end
  end
end
