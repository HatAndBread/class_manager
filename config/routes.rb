Rails.application.routes.draw do

  resources :users, only: [:new, :create] do
    resources :my_classes, shallow: true
  end
  resources :my_classes, only: [:show, :index, :edit] do
    resources :students, shallow: true
  end
  get 'home', to: 'pages#home'
  get 'random_student', to: 'pages#random_student'
  get 'random_group', to: 'pages#random_group'
  post 'my_students', to: 'my_classes#my_students'
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  get 'logout', to: 'sessions#logout'
  get 'authorized', to: 'sessions#page_requires_login'

  root 'pages#home'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
