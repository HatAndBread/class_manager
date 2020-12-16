class MyClassesController < ApplicationController

    def index
        user = User.find(session[:user_id])
        @my_classes = user.my_classes.all
    end
    def edit
        my_class = MyClass.find(params[:id])
        @class_id = my_class.id
        @class_name = my_class.class_name
        @students = my_class.students.all
    end
    def new
        @user = User.find(session[:user_id])
    end
    def update
        my_class = MyClass.find(params[:id].to_i)
        params[:data].each do |key, value|
            if value[:id]
                student = Student.find(value[:id])
                student.update({first_name: value[:first_name], last_name: value[:last_name], birthday: value[:birthday]})
            else
                student = my_class.students.create({first_name: value[:first_name], last_name: value[:last_name], birthday: value[:birthday]})
                if student.valid?
                    puts "successfully added new student"
                end
            end
        end
        render json: my_class.to_json(include: [:students])
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
