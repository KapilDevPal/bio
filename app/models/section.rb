class Section < ApplicationRecord
  belongs_to :bio
  has_many :fields, -> { order(position: :asc) }, dependent: :destroy

  validates :name, presence: true
  validates :position, presence: true, numericality: { only_integer: true, greater_than: 0 }

  accepts_nested_attributes_for :fields, allow_destroy: true

  scope :ordered, -> { order(position: :asc) }
end
