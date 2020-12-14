class MyClassesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        user = User.find(session[:user_id])
        @my_classes = user.my_classes.all
    end
    def edit
        my_class = MyClass.find(params[:id])
        @class_name = my_class.class_name
        @students = my_class.students.all
    end
    def new
        @user = User.find(session[:user_id])
    end
    def update
        my_class = MyClass.find(params[:id].to_i)
        params[:data].each do |key, value|
            student = Student.find(value[:id])
            p student
            if student.update({first_name: value[:first_name], last_name: value[:last_name], birthday: value[:birthday]})
                puts 'SUCCESSS!'
            else
                puts 'FAILURE'
            end
        end
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
