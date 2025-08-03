class CreateFields < ActiveRecord::Migration[8.0]
  def change
    create_table :fields do |t|
      t.references :section, null: false, foreign_key: true
      t.string :label
      t.text :value
      t.integer :position

      t.timestamps
    end
  end
end
