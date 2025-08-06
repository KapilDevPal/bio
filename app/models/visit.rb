class Visit < ApplicationRecord
  belongs_to :biodatum

  validates :ip_address, presence: true
  validates :visited_at, presence: true

  scope :recent, -> { order(visited_at: :desc) }
  scope :today, -> { where(visited_at: Date.current.beginning_of_day..Date.current.end_of_day) }
  scope :this_week, -> { where(visited_at: Date.current.beginning_of_week..Date.current.end_of_week) }
  scope :this_month, -> { where(visited_at: Date.current.beginning_of_month..Date.current.end_of_month) }
end
