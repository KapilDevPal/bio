module BiodataHelper
  def template_thumbnail_path(template)
    template_images = {
      'watercolor-1' => 'watercolor-leaves-with-copy-space-design_53876-62980.jpg',
      'watercolor-2' => 'hand-drawn-watercolor-blue-flowers-leaves-post-card-isolated-white-can-be-used-cards-banners-invitations-label_635006-1614.jpg',
      'watercolor-3' => 'hand-drawn-watercolor-blue-flowers-leaves-post-card-isolated-white-can-be-used-cards-banners-invitations-label_635006-1705.jpg',
      'watercolor-4' => 'painted-watercolor-delicate-romantic-leaves-berries-pastel-floral-clip-art-perfect-wedding-postcard-making-diy-project-closeup-white-background_78967-4658.jpg',
      'watercolor-5' => 'painted-watercolor-delicate-romantic-leaves-berries-pastel-floral-clip-art-perfect-wedding-postcard-making-diy-project-closeup-white-background_78967-4656.jpg',
      'watercolor-6' => 'painted-watercolor-delicate-romantic-leaves-berries-pastel-floral-clip-art-perfect-wedding-postcard-making-diy-project-closeup-white-background_78967-4657.jpg',
      'elegant-1' => 'elegant-letterhead-design-company-hotels_1101622-4756.jpg',
      'elegant-2' => 'white-invitation-card-design-element_53876-1002931.jpg',
      'botanical-1' => 'leafy-paper-rectangle-frame-vector_53876-164690.jpg',
      'botanical-2' => 'leaf-png-border-transparent-background_53876-998568.jpg',
      'botanical-3' => 'watercolor-illustration-frame-with-eucalyptus-feathers-anemones-berries-hand-drawn-clipart_596988-29.jpg',
      'minimal' => 'minimalistic-invitation-template-with-white-background-autumn-leaves-watercolor-style_700253-1176.jpg',
      'copper' => 'rectangle-copper-frame-with-foliage-pattern-design-element_53876-1020729.jpg',
      'gold' => 'metallic-gold-border-frame-png-winter-effect_53876-972438.jpg',
      'marble' => 'black-marble-frame-png-with-green-leaf_53876-968983.jpg',
      'paper' => 'paper-list-with-flowers-bright-background_23-2147829589.jpg',
      'blue-copper' => 'hand-drawn-watercolor-blue-copper-leaves-post-card-isolated-white-can-be-used-cards-banners-invitations-label_635006-1663.jpg',
      'santa-plants' => 'santa-claus-plants-letter-template_23-2147964131.jpg'
    }
    asset_path(template_images[template] || template_images['watercolor-1'])
  end
end
