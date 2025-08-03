class Field < ApplicationRecord
  belongs_to :section

  validates :label, presence: true
  validates :position, presence: true, numericality: { only_integer: true, greater_than: 0 }

  scope :ordered, -> { order(position: :asc) }
end
