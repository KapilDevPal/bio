class CreateBiodataSections < ActiveRecord::Migration[8.0]
  def change
    create_table :biodata_sections do |t|
      t.references :biodatum, null: false, foreign_key: true
      t.string :name
      t.integer :position

      t.timestamps
    end
  end
end
