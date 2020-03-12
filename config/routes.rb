Rails.application.routes.draw do

	namespace :api, defaults: { format: "json" } do
	    get "games", to: "games#index"
	    get "games/new", to: "games#new"
	    get "games/evaluate", to: "games#evaluate"
	    
  	end
  	root "home#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
