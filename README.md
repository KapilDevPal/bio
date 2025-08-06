# 🚀 Rails Application

A clean, modern Rails 8 application built with Hotwire and TailwindCSS. This is a fresh starting point for building web applications.

## 🛠️ Technology Stack

- **Ruby on Rails 8.0.2** - Modern web framework
- **Hotwire (Turbo + Stimulus)** - Dynamic interactions without JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **SQLite3** - Database (development)
- **Puma** - Web server
- **Importmap Rails** - JavaScript module management

## 🚀 Getting Started

### Prerequisites

- Ruby 3.3.4 or higher
- Node.js (for TailwindCSS compilation)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bio_test_app
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Setup database**
   ```bash
   rails db:create
   rails db:migrate
   ```

4. **Start the server**
   ```bash
   rails server
   ```

5. **Visit the application**
   Open your browser and go to `http://localhost:3000`

## 📁 Project Structure

```
app/
├── controllers/
│   └── application_controller.rb    # Main application controller
├── views/
│   ├── layouts/
│   │   └── application.html.erb     # Main layout
│   └── application/
│       └── index.html.erb           # Landing page
├── javascript/
│   ├── controllers/                 # Stimulus controllers
│   └── application.js               # Main JavaScript entry
└── assets/
    ├── images/                      # Static images
    └── stylesheets/                 # CSS files
```

## 🎨 Customization

This is a clean slate application. You can:

1. **Add new controllers** in `app/controllers/`
2. **Create new views** in `app/views/`
3. **Add Stimulus controllers** in `app/javascript/controllers/`
4. **Customize styles** using TailwindCSS classes
5. **Add new routes** in `config/routes.rb`

## 🧪 Development

- **Rails console**: `rails console`
- **Database console**: `rails dbconsole`
- **Asset compilation**: `rails assets:precompile`
- **Tests**: `rails test`

## 📦 Deployment

This application is ready for deployment to platforms like:

- **Heroku**
- **Railway**
- **Render**
- **DigitalOcean App Platform**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the Rails documentation: https://guides.rubyonrails.org/

---

Built with ❤️ using Rails 8, Hotwire, and TailwindCSS
