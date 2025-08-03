import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["preview", "form", "languageSelector"]
  static values = { 
    editToken: String,
    updateUrl: String
  }

  connect() {
    console.log("Bio form controller connected")
    this.setupEventListeners()
  }

  setupEventListeners() {
    // Auto-save on input changes with debouncing
    this.element.addEventListener('input', this.debounce(() => {
      this.updatePreview()
    }, 1000))

    // Language selector change
    if (this.hasLanguageSelectorTarget) {
      this.languageSelectorTarget.addEventListener('change', (e) => {
        this.updateLanguage(e.target.value)
      })
    }
  }

  updatePreview() {
    const formData = new FormData(this.formTarget)
    
    // Get CSRF token from meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
    
    const headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'text/html'
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
      if (this.hasPreviewTarget) {
        this.previewTarget.innerHTML = html
        this.showNotification('Preview updated successfully!', 'success')
      }
    })
    .catch(error => {
      console.error('Error updating preview:', error)
      this.showNotification('Failed to update preview', 'error')
    })
  }

  updateLanguage(languageCode) {
    console.log('Updating language to:', languageCode)
    
    // Update hidden field
    const languageField = this.formTarget.querySelector('#bio_language_code')
    if (languageField) {
      languageField.value = languageCode
    }
    
    // Update preview immediately
    this.updatePreview()
    
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

  addField(event) {
    const button = event.currentTarget
    const section = button.closest('.section-container')
    const fieldsContainer = section.querySelector('.fields-container')
    const fieldIndex = fieldsContainer.children.length
    const sectionIndex = Array.from(document.querySelectorAll('.section-container')).indexOf(section)
    
    const fieldHtml = `
      <div class="field-container flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200" data-field-id="new-${fieldIndex}">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Field Label</label>
          <input type="text" name="bio[sections_attributes][${sectionIndex}][fields_attributes][${fieldIndex}][label]" 
                 class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                 placeholder="Enter field label">
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Field Value</label>
          <textarea name="bio[sections_attributes][${sectionIndex}][fields_attributes][${fieldIndex}][value]" 
                    rows="2" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
                    placeholder="Enter field value"></textarea>
        </div>
        <button type="button" data-action="click->bio-form#removeField" class="group text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors self-end">
          <i class="fas fa-times text-lg group-hover:scale-110 transition-transform"></i>
        </button>
      </div>
    `
    
    fieldsContainer.insertAdjacentHTML('beforeend', fieldHtml)
    this.updatePreview()
  }

  removeField(event) {
    const button = event.currentTarget
    const field = button.closest('.field-container')
    field.remove()
    this.updatePreview()
  }

  addSection(event) {
    const container = document.getElementById('sections-container')
    const sectionIndex = container.children.length
    
    const sectionHtml = `
      <div class="section-container bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200" data-section-id="new-${sectionIndex}">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg mr-3">
              <i class="fas fa-folder text-white text-sm"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">
              <input type="text" name="bio[sections_attributes][${sectionIndex}][name]" 
                     class="font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1"
                     placeholder="Section Name" value="New Section">
            </h3>
          </div>
          <div class="flex items-center space-x-3">
            <button type="button" data-action="click->bio-form#addField" class="group text-emerald-600 hover:text-emerald-800 p-2 rounded-lg hover:bg-emerald-50 transition-colors">
              <i class="fas fa-plus text-lg group-hover:scale-110 transition-transform"></i>
            </button>
            <button type="button" data-action="click->bio-form#removeSection" class="group text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors">
              <i class="fas fa-trash text-lg group-hover:scale-110 transition-transform"></i>
            </button>
          </div>
        </div>
        <div class="fields-container space-y-4">
        </div>
      </div>
    `
    
    container.insertAdjacentHTML('beforeend', sectionHtml)
    this.updatePreview()
  }

  removeSection(event) {
    const button = event.currentTarget
    const section = button.closest('.section-container')
    section.remove()
    this.updatePreview()
  }

  downloadPDF() {
    const url = `/bios/${this.editTokenValue}/download_pdf.pdf`
    window.open(url, '_blank')
  }

  showQRCode() {
    const editUrl = `${window.location.origin}/e/${this.editTokenValue}`
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(editUrl)}`
    
    // Create modal
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">QR Code for Editing</h3>
          <img src="${qrUrl}" alt="QR Code" class="mx-auto mb-6 rounded-lg shadow-lg">
          <p class="text-gray-600 mb-6">Scan this QR code to edit your biodata later</p>
          <button onclick="this.closest('.fixed').remove()" class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold">
            Close
          </button>
        </div>
      </div>
    `
    
    document.body.appendChild(modal)
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove()
      }
    })
  }

  copyShareLink() {
    const publicUrl = `${window.location.origin}/b/${this.editTokenValue}`
    navigator.clipboard.writeText(publicUrl).then(() => {
      this.showNotification('Public link copied to clipboard!', 'success')
    }).catch(() => {
      this.showNotification('Failed to copy link', 'error')
    })
  }

  resetForm() {
    if (confirm('Are you sure you want to reset the form? This will clear all your changes.')) {
      location.reload()
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-xl text-white z-50 shadow-2xl transform transition-all duration-300 ${
      type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 
      type === 'error' ? 'bg-gradient-to-r from-red-500 to-pink-600' : 
      'bg-gradient-to-r from-blue-500 to-indigo-600'
    }`
    notification.innerHTML = `
      <div class="flex items-center">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-3"></i>
        <span class="font-semibold">${message}</span>
      </div>
    `
    
    document.body.appendChild(notification)
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)'
    }, 100)
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)'
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