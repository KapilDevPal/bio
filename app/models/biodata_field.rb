class BiodataField < ApplicationRecord
  belongs_to :biodatum, optional: true
  belongs_to :biodata_section, optional: true

  # Removed validations to allow creation without data
  # validates :label, presence: true
  # validates :position, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  FIELD_TYPES = %w[text textarea date email phone number].freeze

  # validates :field_type, inclusion: { in: FIELD_TYPES }

  before_validation :set_default_position, on: :create

  private

  def set_default_position
    return if position.present?

    max_position = biodata_section&.biodata_fields&.maximum(:position) || -1
    self.position = max_position + 1
  end
end
