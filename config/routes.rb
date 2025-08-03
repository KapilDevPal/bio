Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that works with load balancers and uptime monitors.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Marriage Biodata Generator routes
  root "bios#new"
  
  # Debug route
  get "/debug", to: "bios#debug"
  
  # Public routes
  get "/b/:slug", to: "bios#show", as: :bio
  get "/e/:edit_token", to: "bios#edit", as: :edit_bio
  
  # Admin routes
  resources :bios, except: [:index, :show, :edit] do
    member do
      get :download_pdf
      get :qr_code
      get :share_link
    end
  end
  
  # API routes for dynamic form updates
  namespace :api do
    resources :bios, only: [:update] do
      member do
        post :add_field
        delete :remove_field
        post :add_section
        delete :remove_section
      end
    end
  end
end
