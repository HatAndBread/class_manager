class StudentsController < ApplicationController
    def index
    
    end
    def create
        @my_class = MyClass.find(params[:my_class_id])
        @student = @my_class.students.create(student_params)
        if @student.valid?
            render :new
        else
            render :new
        end
    end
    def new
        @my_class = MyClass.find(params[:my_class_id])
    end

    def update
        p params
    end
    def destroy
        puts "THIS IS THE DESTROY METHOD HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
        student = Student.find(params[:id])
        p student
        student.destroy!
        render json: student
    end

    private

    def student_params
        params.require(:student).permit(:first_name, :last_name, :birthday)
    end
end
