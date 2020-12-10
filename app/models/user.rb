class User < ApplicationRecord
    has_secure_password
    has_many :my_classes

    validates :username, presence: true
    validates :username, uniqueness: true
    validates :password_digest, presence: true

end
