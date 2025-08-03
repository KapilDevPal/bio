class CreateBios < ActiveRecord::Migration[8.0]
  def change
    create_table :bios do |t|
      t.string :slug
      t.string :edit_token
      t.string :language_code

      t.timestamps
    end
    add_index :bios, :language_code
  end
end
