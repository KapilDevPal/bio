class CreateBiodataFields < ActiveRecord::Migration[8.0]
  def change
    create_table :biodata_fields do |t|
      t.references :biodatum, null: false, foreign_key: true
      t.references :biodata_section, null: false, foreign_key: true
      t.string :label
      t.text :value
      t.string :field_type, default: 'text'
      t.integer :position, default: 0

      t.timestamps
    end
    add_index :biodata_fields, [:biodatum_id, :position]
  end
end
