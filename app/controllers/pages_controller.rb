class PagesController < ApplicationController
    skip_before_action :authorized, only: [:home]
    def home
        @user = current_user
    end

end
