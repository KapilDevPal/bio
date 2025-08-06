class CreateVisits < ActiveRecord::Migration[8.0]
  def change
    create_table :visits do |t|
      t.references :biodatum, null: false, foreign_key: true
      t.string :ip_address
      t.text :user_agent
      t.datetime :visited_at

      t.timestamps
    end
  end
end
