# 💕 Marriage Biodata Generator

A beautiful, dynamic marriage biodata generation application built with Ruby on Rails 8. Create professional biodata profiles with customizable templates, dynamic fields, and beautiful backgrounds.

## ✨ Features

- **Dynamic Biodata Creation**: Add custom sections and fields
- **18 Beautiful Templates**: Watercolor, elegant, botanical, and more
- **Real-time Preview**: Switch templates instantly
- **Photo Upload**: Direct image upload support
- **Export Options**: Download as image, PDF, or print
- **Responsive Design**: Works perfectly on mobile and desktop
- **Admin Panel**: Manage biodata and view analytics
- **Visitor Tracking**: Monitor profile views and engagement

## 🛠️ Technology Stack

- **Ruby on Rails 8.0.2** - Modern web framework
- **Hotwire (Turbo + Stimulus)** - Dynamic interactions without JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Active Admin** - Admin interface and analytics
- **Devise** - Authentication system
- **Active Storage** - File upload handling
- **SQLite3** - Database (development/production)
- **Puma** - Web server
- **Importmap Rails** - JavaScript module management

## 🚀 Getting Started

### Prerequisites

- Ruby 3.3.4 or higher
- Node.js (for TailwindCSS compilation)
- Git
- Docker (optional, for containerized deployment)

### Installation

#### Option 1: Local Development

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
   rails db:seed
   ```

4. **Start the server**
   ```bash
   rails server
   ```

5. **Visit the application**
   Open your browser and go to `http://localhost:3000`

#### Option 2: Docker Deployment

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bio_test_app
   ```

2. **Copy environment file**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Build and run with Docker Compose**
   ```bash
   # Production
   docker-compose up -d
   
   # Development
   docker-compose --profile dev up -d
   ```

4. **Setup database (first time only)**
   ```bash
   docker-compose exec web rails db:create db:migrate db:seed
   ```

5. **Visit the application**
   - Production: `http://localhost:3000`
   - Development: `http://localhost:3001`

## 📁 Project Structure

```
app/
├── controllers/
│   ├── application_controller.rb    # Main application controller
│   └── biodata_controller.rb        # Biodata management
├── models/
│   ├── biodatum.rb                  # Main biodata model
│   ├── biodata_section.rb           # Section model
│   ├── biodata_field.rb             # Field model
│   ├── visit.rb                     # Visitor tracking
│   └── admin_user.rb                # Admin user model
├── views/
│   ├── layouts/
│   │   └── application.html.erb     # Main layout
│   └── biodata/
│       ├── index.html.erb           # Landing page
│       ├── new.html.erb             # Create biodata form
│       ├── show.html.erb            # View biodata
│       ├── edit.html.erb            # Edit biodata
│       └── preview.html.erb         # Preview with templates
├── admin/
│   ├── biodata.rb                   # Active Admin configuration
│   └── visits.rb                    # Visit analytics
├── javascript/
│   └── controllers/
│       └── biodata_form_controller.js # Dynamic form handling
└── assets/
    ├── images/                      # Template backgrounds
    └── stylesheets/                 # CSS files
```

## 🎨 Customization

This biodata application is highly customizable:

1. **Add new templates**: Add background images to `app/assets/images/` and update the `BACKGROUND_TEMPLATES` in `app/models/biodatum.rb`
2. **Customize fields**: Modify field types in `app/models/biodata_field.rb`
3. **Add new sections**: Create new section types in `app/models/biodata_section.rb`
4. **Customize styling**: Modify TailwindCSS classes in views
5. **Admin features**: Add new admin panels in `app/admin/`
6. **Analytics**: Extend visitor tracking in `app/models/visit.rb`

## 🧪 Development

- **Rails console**: `rails console`
- **Database console**: `rails dbconsole`
- **Asset compilation**: `rails assets:precompile`
- **Tests**: `rails test`
- **Admin panel**: `http://localhost:3000/admin` (admin@example.com / password)
- **Clear data**: `rails biodata:clear_all`

## 🔧 Docker Commands

```bash
# Build the image
docker build -t biodata-app .

# Run in production
docker-compose up -d

# Run in development
docker-compose --profile dev up -d

# View logs
docker-compose logs -f web

# Execute commands
docker-compose exec web rails console
docker-compose exec web rails db:migrate
```

## 📦 Deployment

This application is ready for deployment to platforms like:

- **Docker**: Use the provided Dockerfile and docker-compose.yml
- **Heroku**: Deploy with `git push heroku main`
- **Railway**: Connect your GitHub repository
- **Render**: Use the Docker deployment option
- **DigitalOcean App Platform**: Deploy with Docker
- **AWS ECS**: Use the Docker image

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

## 🎯 Key Features

- **Dynamic Form Creation**: Add/remove sections and fields dynamically
- **Template Switching**: 18 beautiful background templates
- **Real-time Preview**: See changes instantly
- **Photo Upload**: Direct image upload with Active Storage
- **Export Options**: Download as image, PDF, or print
- **Admin Analytics**: Track visits and manage biodata
- **Responsive Design**: Perfect on all devices
- **Clean Database**: Easy data management with rake tasks

---

Built with ❤️ using Rails 8, Hotwire, TailwindCSS, and Active Admin
