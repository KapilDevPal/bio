class CreateBiodata < ActiveRecord::Migration[8.0]
  def change
    create_table :biodata do |t|
      t.string :name
      t.string :slug
      t.string :photo
      t.string :background_template, default: 'watercolor-1'
      t.text :description
      t.boolean :is_active, default: true

      t.timestamps
    end
    add_index :biodata, :slug, unique: true
  end
end
