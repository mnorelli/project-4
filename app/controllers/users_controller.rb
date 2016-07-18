class UsersController < ApplicationController
  def new
  end

  def create
    # TODO: once the controller is implemented don't forget to also sign the user in
  end

  def show
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

end
