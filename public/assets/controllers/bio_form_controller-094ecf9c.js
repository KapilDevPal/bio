import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form", "templatePreview", "languageSelector"]
  static values = { 
    editToken: String,
    updateUrl: String
  }

  connect() {
    this.setupEventListeners()
  }

  setupEventListeners() {
    // Debounced input listener for auto-save
    const debouncedUpdate = this.debounce(() => this.updateTemplate(), 1000)
    
    // Listen for input changes in the form
    this.formTarget.addEventListener('input', debouncedUpdate)
    
    // Listen for language changes
    if (this.hasLanguageSelectorTarget) {
      this.languageSelectorTarget.addEventListener('change', (e) => {
        this.updateLanguage(e.target.value)
      })
    }
  }

  selectTemplate(event) {
    const templateId = event.currentTarget.dataset.templateId
    console.log('Selected template:', templateId)
    
    // Update hidden field
    const templateField = this.formTarget.querySelector('#bio_template')
    if (templateField) {
      templateField.value = templateId
    }
    
    // Update visual selection
    document.querySelectorAll('.template-option').forEach(option => {
      option.classList.remove('border-blue-500', 'bg-blue-50')
      option.classList.add('border-gray-200', 'hover:border-gray-300')
    })
    
    event.currentTarget.classList.remove('border-gray-200', 'hover:border-gray-300')
    event.currentTarget.classList.add('border-blue-500', 'bg-blue-50')
    
    // Update preview
    this.updateTemplate()
    
    // Show notification
    this.showNotification(`Template changed to ${this.getTemplateName(templateId)}`, 'success')
  }

  updateTemplate() {
    if (!this.hasFormTarget || !this.hasTemplatePreviewTarget) return

    const formData = new FormData(this.formTarget)
    
    // Get CSRF token from meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
    
    const headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'text/plain'
    }
    
    // Add CSRF token if available
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken
    }
    
    fetch(this.updateUrlValue, {
      method: 'PATCH',
      body: formData,
      headers: headers
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.text()
    })
    .then(html => {
      this.templatePreviewTarget.innerHTML = html
      this.showNotification('Template updated successfully!', 'success')
    })
    .catch(error => {
      console.error('Error updating template:', error)
      this.showNotification('Failed to update template', 'error')
    })
  }

  updateLanguage(languageCode) {
    console.log('Updating language to:', languageCode)
    
    // Update hidden field
    const languageField = this.formTarget.querySelector('#bio_language_code')
    if (languageField) {
      languageField.value = languageCode
    }
    
    // Update template immediately
    this.updateTemplate()
    
    // Show notification
    this.showNotification(`Language changed to ${this.getLanguageName(languageCode)}`, 'success')
  }

  getLanguageName(code) {
    const languages = {
      'en': 'English',
      'hi': 'हिंदी (Hindi)',
      'pa': 'ਪੰਜਾਬੀ (Punjabi)',
      'mr': 'मराठी (Marathi)',
      'te': 'తెలుగు (Telugu)',
      'ta': 'தமிழ் (Tamil)'
    }
    return languages[code] || code
  }

  getTemplateName(templateId) {
    const templates = {
      'classic': 'Classic Traditional',
      'modern': 'Modern Minimalist',
      'elegant': 'Elegant Premium',
      'floral': 'Floral Romantic',
      'minimal': 'Minimal Clean',
      'corporate': 'Corporate Professional',
      'romantic': 'Romantic Hearts',
      'vintage': 'Vintage Classic',
      'artistic': 'Artistic Creative',
      'professional': 'Professional Clean'
    }
    return templates[templateId] || templateId
  }

  addSection() {
    const container = document.getElementById('sections-container')
    const sectionIndex = container.children.length
    
    const sectionHtml = `
      <div class="section-container bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            <input type="text" name="bio[sections_attributes][${sectionIndex}][name]" 
                   class="font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                   placeholder="Section Name" value="New Section" required>
            <input type="hidden" name="bio[sections_attributes][${sectionIndex}][position]" value="${sectionIndex + 1}">
          </h3>
          <div class="flex space-x-2">
            <button type="button" data-action="click->bio-form#addField" 
                    class="text-green-600 hover:text-green-800 p-1 rounded">
              <i class="fas fa-plus text-sm"></i>
            </button>
          </div>
        </div>
        <div class="fields-container space-y-3">
        </div>
      </div>
    `
    
    container.insertAdjacentHTML('beforeend', sectionHtml)
    this.showNotification('New section added!', 'success')
  }

  addField(event) {
    const section = event.target.closest('.section-container')
    const fieldsContainer = section.querySelector('.fields-container')
    const fieldIndex = fieldsContainer.children.length
    const sectionIndex = Array.from(document.querySelectorAll('.section-container')).indexOf(section)
    
    const fieldHtml = `
      <div class="field-container flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Field Name</label>
          <input type="text" name="bio[sections_attributes][${sectionIndex}][fields_attributes][${fieldIndex}][label]" 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                 placeholder="Enter field name" value="New Field" required>
          <input type="hidden" name="bio[sections_attributes][${sectionIndex}][fields_attributes][${fieldIndex}][position]" value="${fieldIndex + 1}">
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Your Answer</label>
          <textarea name="bio[sections_attributes][${sectionIndex}][fields_attributes][${fieldIndex}][value]" 
                    rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Enter your details"></textarea>
        </div>
        <button type="button" data-action="click->bio-form#removeField" 
                class="text-red-500 hover:text-red-700 p-1 rounded self-start mt-6">
          <i class="fas fa-trash text-sm"></i>
        </button>
      </div>
    `
    
    fieldsContainer.insertAdjacentHTML('beforeend', fieldHtml)
    this.showNotification('New field added!', 'success')
  }

  removeField(event) {
    event.target.closest('.field-container').remove()
    this.showNotification('Field removed!', 'info')
  }

  downloadPDF() {
    const bioId = this.getBioId()
    window.open(`/bios/${bioId}/download_pdf.pdf`, '_blank')
    this.showNotification('PDF download started!', 'success')
  }

  downloadImage() {
    const bioId = this.getBioId()
    window.open(`/bios/${bioId}/download_image`, '_blank')
    this.showNotification('Image download started!', 'success')
  }

  showQRCode() {
    const bioId = this.getBioId()
    window.open(`/bios/${bioId}/qr_code`, '_blank')
    this.showNotification('QR Code opened!', 'success')
  }

  copyShareLink() {
    const bioId = this.getBioId()
    fetch(`/bios/${bioId}/share_link`)
      .then(response => response.json())
      .then(data => {
        navigator.clipboard.writeText(data.public_url)
        this.showNotification('Share link copied to clipboard!', 'success')
      })
      .catch(error => {
        console.error('Error copying share link:', error)
        this.showNotification('Failed to copy share link', 'error')
      })
  }

  resetForm() {
    if (confirm('Are you sure you want to reset the form? This will clear all your data.')) {
      this.formTarget.reset()
      this.showNotification('Form reset successfully!', 'info')
    }
  }

  getBioId() {
    const urlParts = window.location.pathname.split('/')
    return urlParts[urlParts.length - 1]
  }

  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification')
    existingNotifications.forEach(notification => notification.remove())
    
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
      warning: 'bg-yellow-500'
    }
    
    const notification = document.createElement('div')
    notification.className = `notification fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full`
    notification.textContent = message
    
    document.body.appendChild(notification)
    
    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full')
    }, 100)
    
    // Animate out and remove
    setTimeout(() => {
      notification.classList.add('translate-x-full')
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 3000)
  }

  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
} 