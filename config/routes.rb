Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Root route
  root "biodata#index"
  
  # Admin routes
  get 'admin/dashboard', to: 'admin#dashboard'
  get 'admin/biodata', to: 'admin#biodata'
  get 'admin/visits', to: 'admin#visits'

  # Biodata routes
  resources :biodata, except: [:destroy] do
    member do
      get :preview
    end
  end
end
