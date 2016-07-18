class User < ActiveRecord::Base
  has_many :usertrips
  has_many :trips, through: :usertrips

  BCrypt::Engine.cost = 12

  # email & password_digest fields must exist
  validates :email, :password_digest, presence: true
  # a user must have a password & password confirmation field
  # the fields are match against each other but never persisted to the database
  validates_confirmation_of :password
  # TODO: add validator for unique emails

  def password=(unencrypted_password)
    #raise scope of password to instance
    @password = unencrypted_password
    self.password_digest = BCrypt::Password.create(@password)
  end

  def password
    #get password, equivalent to `attr_reader :password`
    @password
  end

  # to authenticate the user using bcrypt's built in 
  def authenticate(unencrypted_password)
    # check that a hashed version of the unencrypted password is the same as the secure password
    BCrypt::Password.new(self.password_digest) == unencrypted_password ? self : false
  end

  # class method `::confirm`
  def self.confirm(email_param, password_param)
    # add a unique email validator later
    user = User.find_by_email(email_param)
    user.authenticate(password_param)
  end

end