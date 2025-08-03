class CreateSections < ActiveRecord::Migration[8.0]
  def change
    create_table :sections do |t|
      t.references :bio, null: false, foreign_key: true
      t.string :name
      t.integer :position

      t.timestamps
    end
  end
end
