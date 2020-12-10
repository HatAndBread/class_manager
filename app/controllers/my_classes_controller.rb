class MyClassesController < ApplicationController
    def new
        @user = User.find(session[:user_id])
    end
    def create
        @user = User.find(session[:user_id])
        @my_class = @user.my_classes.create(my_class_params)
        if @my_class.valid?
            redirect_to new_my_class_student_path(@my_class)
        else
            flash[:alert] = 'That class name is already taken.'
            render "new"
        end
    end

    private

    def my_class_params
        params.require(:my_class).permit(:class_name)
    end
end
