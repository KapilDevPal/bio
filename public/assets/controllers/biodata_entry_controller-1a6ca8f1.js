import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["photoInput", "photoPreview", "photoData", "personalFields", "familyFields", "contactFields", "preferencesFields"]

  connect() {
    // Initialize the controller
  }

  triggerPhotoUpload() {
    this.photoInputTarget.click()
  }

  handlePhotoUpload(event) {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const photoData = e.target.result
        this.photoPreviewTarget.innerHTML = `<img src="${photoData}" class="w-full h-full object-cover rounded-full">`
        this.photoDataTarget.value = photoData
      }
      reader.readAsDataURL(file)
    }
  }

  addField(event) {
    const section = event.currentTarget.dataset.section
    const fieldsContainer = this[`${section}FieldsTarget`]
    
    const fieldHtml = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Field Label</label>
          <input type="text" name="biodata[${section}][custom_fields][][label]" placeholder="Enter field label"
                 class="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
          <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Field Value</label>
          <div class="flex space-x-2">
            <input type="text" name="biodata[${section}][custom_fields][][value]" placeholder="Enter field value"
                   class="flex-1 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <button type="button" data-action="click->biodata-entry#removeField" 
                    class="text-red-500 hover:text-red-700 p-2 rounded transition-colors">
              <i class="fas fa-trash text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    `
    
    fieldsContainer.insertAdjacentHTML('beforeend', fieldHtml)
  }

  removeField(event) {
    const fieldContainer = event.currentTarget.closest('.grid')
    if (fieldContainer) {
      fieldContainer.remove()
    }
  }
} 