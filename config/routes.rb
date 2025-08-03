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
  patch "/e/:edit_token", to: "bios#update", as: :update_bio
  
  # Download and share routes using edit tokens
  get "/e/:edit_token/download_pdf", to: "bios#download_pdf", as: :download_pdf_bio
  get "/e/:edit_token/download_image", to: "bios#download_image", as: :download_image_bio
  get "/e/:edit_token/qr_code", to: "bios#qr_code", as: :qr_code_bio
  get "/e/:edit_token/share_link", to: "bios#share_link", as: :share_link_bio
  
  # Admin routes
  resources :bios, except: [:index, :show, :edit] do
    member do
      get :download_pdf
      get :download_image
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
