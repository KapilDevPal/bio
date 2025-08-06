class RemoveNotNullConstraintFromBiodataFields < ActiveRecord::Migration[8.0]
  def change
    change_column_null :biodata_fields, :biodatum_id, true
    change_column_null :biodata_fields, :biodata_section_id, true
  end
end
end
