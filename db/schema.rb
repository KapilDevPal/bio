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

ActiveRecord::Schema[8.0].define(version: 2025_08_06_002633) do
  create_table "biodata", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.string "photo"
    t.string "background_template", default: "watercolor-1"
    t.text "description"
    t.boolean "is_active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_biodata_on_slug", unique: true
  end

  create_table "biodata_fields", force: :cascade do |t|
    t.integer "biodatum_id", null: false
    t.integer "biodata_section_id", null: false
    t.string "label"
    t.text "value"
    t.string "field_type", default: "text"
    t.integer "position", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["biodata_section_id"], name: "index_biodata_fields_on_biodata_section_id"
    t.index ["biodatum_id", "position"], name: "index_biodata_fields_on_biodatum_id_and_position"
    t.index ["biodatum_id"], name: "index_biodata_fields_on_biodatum_id"
  end

  create_table "biodata_sections", force: :cascade do |t|
    t.integer "biodatum_id", null: false
    t.string "name"
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["biodatum_id"], name: "index_biodata_sections_on_biodatum_id"
  end

  add_foreign_key "biodata_fields", "biodata"
  add_foreign_key "biodata_fields", "biodata_sections"
  add_foreign_key "biodata_sections", "biodata"
end
