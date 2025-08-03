# 💕 Marriage Biodata Generator

A beautiful, responsive web application for creating, customizing, and downloading marriage biodata without requiring user accounts. Built with Ruby on Rails 8, Hotwire, and TailwindCSS.

## ✨ Features

### 🎨 **Beautiful & Responsive Design**
- Clean, modern UI optimized for mobile, tablet, and desktop
- Beautiful typography with Google Fonts (Inter + Playfair Display)
- Smooth animations and hover effects
- Professional color scheme with pink accents

### 📝 **Dynamic Form Builder**
- **Custom Fields**: Add/remove unlimited input fields
- **Dynamic Sections**: Personal, Family, Contact, Partner Preferences
- **Live Preview**: Real-time WYSIWYG preview using StimulusJS
- **Auto-save**: Changes are saved automatically as you type

### 🌐 **Multilingual Support**
- Support for 6 languages: English, Hindi, Punjabi, Marathi, Telugu, Tamil
- Easy language switching with dropdown
- Localized field labels and content

### 📄 **PDF Generation**
- Download biodata as professionally formatted PDF
- Clean, print-ready layout
- Custom styling for different sections

### 🔐 **Security & Privacy**
- **No user accounts required** - completely anonymous
- **Secure edit tokens** - UUID-based edit access
- **QR code generation** - scan to edit later
- **Shareable public links** - slug-based URLs

### 📱 **QR Code & Sharing**
- Generate QR codes for easy editing access
- Copy public share links to clipboard
- Mobile-friendly QR code scanning

## 🚀 Quick Start

### Prerequisites
- Ruby 3.3.4 or higher
- Rails 8.0.2
- SQLite3
- Node.js (for asset compilation)

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

3. **Set up the database**
   ```bash
   rails db:create
   rails db:migrate
   ```

4. **Build assets**
   ```bash
   rails tailwindcss:build
   ```

5. **Start the server**
   ```bash
   rails server
   ```

6. **Visit the application**
   Open your browser and go to `http://localhost:3000`

## 🏗️ Architecture

### Database Schema

```ruby
# Bio Model
- slug: string (for public URL)
- edit_token: string (UUID for secure editing)
- language_code: string (en, hi, pa, mr, te, ta)
- created_at, updated_at

# Section Model (belongs to Bio)
- bio_id: references
- name: string (e.g., "Personal Details")
- position: integer (for ordering)

# Field Model (belongs to Section)
- section_id: references
- label: string (e.g., "Full Name")
- value: text (e.g., "Rahul Sharma")
- position: integer (for ordering)
```

### Key Technologies

- **Ruby on Rails 8** - Backend framework
- **Hotwire (Turbo + Stimulus)** - Real-time updates
- **TailwindCSS** - Styling and responsiveness
- **SQLite** - Database (can be easily changed to PostgreSQL)
- **WickedPDF** - PDF generation
- **RQRCode** - QR code generation

## 📱 Usage Guide

### Creating a New Biodata

1. **Visit the homepage** - Choose your preferred language
2. **Click "Create My Biodata"** - Get redirected to the editor
3. **Fill in the details** - Use the dynamic form builder
4. **Customize sections** - Add/remove fields as needed
5. **Preview in real-time** - See changes instantly
6. **Download PDF** - Get your formatted biodata

### Editing Existing Biodata

1. **Use the QR code** - Scan with your phone
2. **Or use the edit link** - Direct URL access
3. **Make changes** - All updates are auto-saved
4. **Download updated PDF** - Get the latest version

### Sharing Your Biodata

1. **Public link** - Share the public URL with family
2. **QR code** - Let others scan to view
3. **PDF download** - Send the file directly

## 🎯 Key Features Explained

### Live Preview
The application uses StimulusJS to provide real-time preview updates. As you type in the form, the preview pane automatically updates to show how your biodata will look.

### Dynamic Field Management
- **Add Fields**: Click the ➕ button in any section
- **Remove Fields**: Click the ❌ button next to any field
- **Add Sections**: Click "Add New Section" at the bottom
- **Remove Sections**: Click the 🗑️ button in section headers

### Language Support
The application supports multiple Indian languages:
- **English** (en) - Default
- **Hindi** (hi) - हिंदी
- **Punjabi** (pa) - ਪੰਜਾਬੀ
- **Marathi** (mr) - मराठी
- **Telugu** (te) - తెలుగు
- **Tamil** (ta) - தமிழ்

### PDF Generation
Uses WickedPDF to generate professional PDFs with:
- Clean typography
- Proper page breaks
- Print-optimized layout
- Custom styling

## 🔧 Configuration

### Environment Variables
```bash
# Add to .env file (optional)
RAILS_ENV=development
DATABASE_URL=sqlite3:db/development.sqlite3
```

### PDF Configuration
The PDF generation is configured in `config/initializers/wicked_pdf.rb`:
- Page size: A4
- Margins: 10mm on all sides
- Encoding: UTF-8
- Viewport: 1280x1024

## 🚀 Deployment

### Heroku Deployment
```bash
# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Deploy
git push heroku main

# Run migrations
heroku run rails db:migrate

# Build assets
heroku run rails tailwindcss:build
```

### Docker Deployment
```bash
# Build image
docker build -t marriage-biodata .

# Run container
docker run -p 3000:3000 marriage-biodata
```

## 🧪 Testing

```bash
# Run tests
rails test

# Run system tests
rails test:system

# Run specific test file
rails test test/controllers/bios_controller_test.rb
```

## 📁 Project Structure

```
app/
├── controllers/
│   ├── bios_controller.rb          # Main biodata controller
│   └── api/bios_controller.rb      # API for dynamic updates
├── models/
│   ├── bio.rb                      # Main biodata model
│   ├── section.rb                  # Section model
│   └── field.rb                    # Field model
├── views/
│   ├── bios/
│   │   ├── new.html.erb           # Landing page
│   │   ├── edit.html.erb          # Editor with preview
│   │   ├── show.html.erb          # Public view
│   │   └── _preview.html.erb      # Preview partial
│   └── layouts/
│       ├── application.html.erb   # Main layout
│       └── pdf.html.erb           # PDF layout
└── javascript/
    └── controllers/
        └── bio_form_controller.js  # Stimulus controller
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ruby on Rails** team for the amazing framework
- **Hotwire** team for real-time functionality
- **TailwindCSS** team for the utility-first CSS framework
- **Font Awesome** for the beautiful icons
- **Google Fonts** for the typography

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Email: support@marriagebiodata.com
- Documentation: [docs.marriagebiodata.com](https://docs.marriagebiodata.com)

---

**Made with ❤️ for your special moments**
