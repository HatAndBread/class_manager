class MyClass < ApplicationRecord
  belongs_to :user
  has_many :students
  validates :class_name, presence: true, uniqueness: { case_sensitive: false }
end
