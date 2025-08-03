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
    // Auto-save on input changes
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
    
    fetch(this.updateUrlValue, {
      method: 'PATCH',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'text/html'
      }
    })
    .then(response => response.text())
    .then(html => {
      if (this.hasPreviewTarget) {
        this.previewTarget.innerHTML = html
      }
    })
    .catch(error => {
      console.error('Error updating preview:', error)
    })
  }

  updateLanguage(languageCode) {
    // Update hidden field
    const languageField = this.formTarget.querySelector('#bio_language_code')
    if (languageField) {
      languageField.value = languageCode
    }
    
    // Update preview
    this.updatePreview()
  }

  addField(event) {
    const button = event.currentTarget
    const section = button.closest('.section-container')
    const fieldsContainer = section.querySelector('.fields-container')
    const fieldIndex = fieldsContainer.children.length
    const sectionIndex = Array.from(document.querySelectorAll('.section-container')).indexOf(section)
    
    const fieldHtml = `
      <div class="field-container flex items-center space-x-3" data-field-id="new-${fieldIndex}">
        <div class="flex-1">
          <input type="text" name="bio[sections_attributes][${sectionIndex}][fields_attributes][${fieldIndex}][label]" 
                 class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                 placeholder="Field Label">
        </div>
        <div class="flex-1">
          <textarea name="bio[sections_attributes][${sectionIndex}][fields_attributes][${fieldIndex}][value]" 
                    rows="1" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Field Value"></textarea>
        </div>
        <button type="button" data-action="click->bio-form#removeField" class="text-red-600 hover:text-red-800">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `
    
    fieldsContainer.insertAdjacentHTML('beforeend', fieldHtml)
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
      <div class="section-container border border-gray-200 rounded-lg p-4" data-section-id="new-${sectionIndex}">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            <input type="text" name="bio[sections_attributes][${sectionIndex}][name]" 
                   class="font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-2 py-1"
                   placeholder="Section Name" value="New Section">
          </h3>
          <div class="flex items-center space-x-2">
            <button type="button" data-action="click->bio-form#addField" class="text-green-600 hover:text-green-800">
              <i class="fas fa-plus"></i>
            </button>
            <button type="button" data-action="click->bio-form#removeSection" class="text-red-600 hover:text-red-800">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="fields-container space-y-3">
        </div>
      </div>
    `
    
    container.insertAdjacentHTML('beforeend', sectionHtml)
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
      <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">QR Code for Editing</h3>
          <img src="${qrUrl}" alt="QR Code" class="mx-auto mb-4">
          <p class="text-sm text-gray-600 mb-4">Scan this QR code to edit your biodata later</p>
          <button onclick="this.closest('.fixed').remove()" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
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
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 ${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`
    notification.textContent = message
    
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.remove()
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