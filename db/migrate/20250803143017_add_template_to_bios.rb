class AddTemplateToBios < ActiveRecord::Migration[8.0]
  def change
    add_column :bios, :template, :string
  end
end
