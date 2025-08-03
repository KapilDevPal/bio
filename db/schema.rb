# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_08_03_143017) do
  create_table "bios", force: :cascade do |t|
    t.string "slug"
    t.string "edit_token"
    t.string "language_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "template"
    t.index ["language_code"], name: "index_bios_on_language_code"
  end

  create_table "fields", force: :cascade do |t|
    t.integer "section_id", null: false
    t.string "label"
    t.text "value"
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["section_id"], name: "index_fields_on_section_id"
  end

  create_table "sections", force: :cascade do |t|
    t.integer "bio_id", null: false
    t.string "name"
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bio_id"], name: "index_sections_on_bio_id"
  end

  add_foreign_key "fields", "sections"
  add_foreign_key "sections", "bios"
end
