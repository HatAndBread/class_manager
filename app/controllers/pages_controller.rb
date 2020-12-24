class PagesController < ApplicationController
    skip_before_action :authorized, only: [:home]
    def home
        @user = current_user
    end
    def random_student
        user = User.find(session[:user_id])
        @my_classes = user.my_classes.all
    end
    def random_group
        user = User.find(session[:user_id])
        @my_classes = user.my_classes.all
    end
end
