import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["sectionsContainer", "section", "fieldsContainer"]

  connect() {
    console.log("Biodata form controller connected")
  }

  addSection(event) {
    event.preventDefault()
    const sectionsContainer = this.sectionsContainerTarget
    const sectionIndex = this.sectionTargets.length
    
    const sectionHtml = `
      <div class="section-container border border-gray-200 rounded-lg p-4 mb-4" data-biodata-form-target="section">
        <div class="flex items-center justify-between mb-4">
          <div class="flex-1 mr-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Section Name</label>
            <input type="text" name="biodatum[biodata_sections_attributes][${sectionIndex}][name]" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
          </div>
          <div class="flex items-center space-x-2">
            <button type="button" class="add-field-btn bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors" data-action="click->biodata-form#addField">
              <i class="fas fa-plus mr-1"></i>
              Add Field
            </button>
            <button type="button" class="remove-section-btn bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors" data-action="click->biodata-form#removeSection">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="fields-container space-y-3" data-biodata-form-target="fieldsContainer">
        </div>
      </div>
    `
    
    sectionsContainer.insertAdjacentHTML('beforeend', sectionHtml)
  }

  removeSection(event) {
    event.preventDefault()
    const section = event.target.closest('[data-biodata-form-target="section"]')
    if (section) {
      section.remove()
      this.updateFieldIndices()
    }
  }

  addField(event) {
    event.preventDefault()
    const section = event.target.closest('[data-biodata-form-target="section"]')
    if (section) {
      const fieldsContainer = section.querySelector('[data-biodata-form-target="fieldsContainer"]')
      const sectionIndex = this.sectionTargets.indexOf(section)
      const fieldIndex = fieldsContainer.children.length
      
      const fieldHtml = `
        <div class="field-container flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Field Label</label>
            <input type="text" name="biodatum[biodata_sections_attributes][${sectionIndex}][biodata_fields_attributes][${fieldIndex}][label]" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Field Value</label>
            <input type="text" name="biodatum[biodata_sections_attributes][${sectionIndex}][biodata_fields_attributes][${fieldIndex}][value]" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
          </div>
          <div class="w-32">
            <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select name="biodatum[biodata_sections_attributes][${sectionIndex}][biodata_fields_attributes][${fieldIndex}][field_type]" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
              <option value="text">Text</option>
              <option value="textarea">Textarea</option>
              <option value="date">Date</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="number">Number</option>
            </select>
          </div>
          <div class="flex items-end">
            <button type="button" class="remove-field-btn bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors" data-action="click->biodata-form#removeField">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `
      
      fieldsContainer.insertAdjacentHTML('beforeend', fieldHtml)
    }
  }

  removeField(event) {
    event.preventDefault()
    const field = event.target.closest('.field-container')
    if (field) {
      field.remove()
      this.updateFieldIndices()
    }
  }

  updateFieldIndices() {
    // Update field indices after removal to maintain proper form structure
    this.sectionTargets.forEach((section, sectionIndex) => {
      const fieldsContainer = section.querySelector('[data-biodata-form-target="fieldsContainer"]')
      const fields = fieldsContainer.querySelectorAll('.field-container')
      
      fields.forEach((field, fieldIndex) => {
        const inputs = field.querySelectorAll('input, select')
        inputs.forEach(input => {
          const name = input.getAttribute('name')
          if (name) {
            const newName = name.replace(
              /biodatum\[biodata_sections_attributes\]\[\d+\]\[biodata_fields_attributes\]\[\d+\]/,
              `biodatum[biodata_sections_attributes][${sectionIndex}][biodata_fields_attributes][${fieldIndex}]`
            )
            input.setAttribute('name', newName)
          }
        })
      })
    })
  }
} 