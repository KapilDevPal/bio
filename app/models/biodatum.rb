class Biodatum < ApplicationRecord
  has_many :biodata_sections, -> { order(:position) }, dependent: :destroy
  has_many :biodata_fields, through: :biodata_sections, dependent: :destroy
  
  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
  
  before_validation :generate_slug, on: :create
  
  accepts_nested_attributes_for :biodata_sections, allow_destroy: true, reject_if: :all_blank
  
  # Available background templates
  BACKGROUND_TEMPLATES = [
    'watercolor-1',
    'watercolor-2', 
    'watercolor-3',
    'watercolor-4',
    'watercolor-5',
    'watercolor-6',
    'elegant-1',
    'elegant-2',
    'botanical-1',
    'botanical-2',
    'botanical-3',
    'minimal',
    'copper',
    'gold',
    'marble',
    'paper',
    'blue-copper',
    'santa-plants'
  ].freeze
  
  def to_param
    slug
  end
  
  def background_image_url
    template_images = {
      'watercolor-1' => ActionController::Base.helpers.asset_path('watercolor-leaves-with-copy-space-design_53876-62980.jpg'),
      'watercolor-2' => ActionController::Base.helpers.asset_path('hand-drawn-watercolor-blue-flowers-leaves-post-card-isolated-white-can-be-used-cards-banners-invitations-label_635006-1614.jpg'),
      'watercolor-3' => ActionController::Base.helpers.asset_path('hand-drawn-watercolor-blue-flowers-leaves-post-card-isolated-white-can-be-used-cards-banners-invitations-label_635006-1705.jpg'),
      'watercolor-4' => ActionController::Base.helpers.asset_path('painted-watercolor-delicate-romantic-leaves-berries-pastel-floral-clip-art-perfect-wedding-postcard-making-diy-project-closeup-white-background_78967-4658.jpg'),
      'watercolor-5' => ActionController::Base.helpers.asset_path('painted-watercolor-delicate-romantic-leaves-berries-pastel-floral-clip-art-perfect-wedding-postcard-making-diy-project-closeup-white-background_78967-4656.jpg'),
      'watercolor-6' => ActionController::Base.helpers.asset_path('painted-watercolor-delicate-romantic-leaves-berries-pastel-floral-clip-art-perfect-wedding-postcard-making-diy-project-closeup-white-background_78967-4657.jpg'),
      'elegant-1' => ActionController::Base.helpers.asset_path('elegant-letterhead-design-company-hotels_1101622-4756.jpg'),
      'elegant-2' => ActionController::Base.helpers.asset_path('white-invitation-card-design-element_53876-1002931.jpg'),
      'botanical-1' => ActionController::Base.helpers.asset_path('leafy-paper-rectangle-frame-vector_53876-164690.jpg'),
      'botanical-2' => ActionController::Base.helpers.asset_path('leaf-png-border-transparent-background_53876-998568.jpg'),
      'botanical-3' => ActionController::Base.helpers.asset_path('watercolor-illustration-frame-with-eucalyptus-feathers-anemones-berries-hand-drawn-clipart_596988-29.jpg'),
      'minimal' => ActionController::Base.helpers.asset_path('minimalistic-invitation-template-with-white-background-autumn-leaves-watercolor-style_700253-1176.jpg'),
      'copper' => ActionController::Base.helpers.asset_path('rectangle-copper-frame-with-foliage-pattern-design-element_53876-1020729.jpg'),
      'gold' => ActionController::Base.helpers.asset_path('metallic-gold-border-frame-png-winter-effect_53876-972438.jpg'),
      'marble' => ActionController::Base.helpers.asset_path('black-marble-frame-png-with-green-leaf_53876-968983.jpg'),
      'paper' => ActionController::Base.helpers.asset_path('paper-list-with-flowers-bright-background_23-2147829589.jpg'),
      'blue-copper' => ActionController::Base.helpers.asset_path('hand-drawn-watercolor-blue-copper-leaves-post-card-isolated-white-can-be-used-cards-banners-invitations-label_635006-1663.jpg'),
      'santa-plants' => ActionController::Base.helpers.asset_path('santa-claus-plants-letter-template_23-2147964131.jpg')
    }
    
    template_images[background_template] || template_images['watercolor-1']
  end
  
  private
  
  def generate_slug
    return if slug.present?
    
    base_slug = name.parameterize
    counter = 1
    new_slug = base_slug
    
    while Biodatum.exists?(slug: new_slug)
      new_slug = "#{base_slug}-#{counter}"
      counter += 1
    end
    
    self.slug = new_slug
  end
end
