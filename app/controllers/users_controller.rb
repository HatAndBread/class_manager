class UsersController < ApplicationController
  skip_before_action :authorized, only: [:new, :create]
  def new
    @user = User.new
  end

  def create
    @user = User.create(params.require(:user).permit(:username, :password))
    if @user.valid?
      session[:user_id] = @user.id
      redirect_to '/home'
    else
      render json: @user.errors.messages.to_json
    end
  end
end
