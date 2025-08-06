class BiodataSection < ApplicationRecord
  belongs_to :biodatum
  has_many :biodata_fields, -> { order(:position) }, dependent: :destroy
  
  validates :name, presence: true
  validates :position, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  
  accepts_nested_attributes_for :biodata_fields, allow_destroy: true, reject_if: :all_blank
end
