Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Multi-step biodata generation workflow
  root "application#index"
  get "data_entry", to: "application#data_entry"
  get "template_selection", to: "application#template_selection"
  get "preview", to: "application#preview"
  post "save_data", to: "application#save_data"
  patch "update_template", to: "application#update_template"
  
  # Export routes
  get "export_pdf", to: "application#export_pdf", defaults: { format: :pdf }
  get "export_image", to: "application#export_image"
end
