import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "sectionsContainer", "section", "sectionTitle", "fieldsContainer", "field", 
    "fieldTitle", "fieldValue", "preview", "templateSelector", "previewToggle", 
    "toggleSlider", "previewStatus", "photoInput", "photoPreview", "previewSection"
  ]

  connect() {
    this.selectedTemplate = 'classic'
    this.livePreviewEnabled = true
    this.profilePhoto = null
    this.updatePreview()
  }

  selectTemplate(event) {
    const template = event.currentTarget.dataset.template
    this.selectedTemplate = template
    
    // Update visual selection
    this.templateSelectorTargets.forEach(selector => {
      selector.classList.remove('border-blue-500', 'bg-blue-50')
      selector.classList.add('border-gray-200', 'hover:border-gray-300')
    })
    
    event.currentTarget.classList.remove('border-gray-200', 'hover:border-gray-300')
    event.currentTarget.classList.add('border-blue-500', 'bg-blue-50')
    
    this.updatePreview()
  }

  togglePreview() {
    this.livePreviewEnabled = !this.livePreviewEnabled
    
    if (this.livePreviewEnabled) {
      this.toggleSliderTarget.classList.add('translate-x-5', 'sm:translate-x-6')
      this.toggleSliderTarget.classList.remove('translate-x-1')
      this.previewStatusTarget.textContent = 'Enabled'
      this.previewStatusTarget.classList.remove('text-red-600')
      this.previewStatusTarget.classList.add('text-green-600')
      this.previewSectionTarget.classList.remove('hidden')
      this.updatePreview()
    } else {
      this.toggleSliderTarget.classList.remove('translate-x-5', 'sm:translate-x-6')
      this.toggleSliderTarget.classList.add('translate-x-1')
      this.previewStatusTarget.textContent = 'Disabled'
      this.previewStatusTarget.classList.remove('text-green-600')
      this.previewStatusTarget.classList.add('text-red-600')
      this.previewSectionTarget.classList.add('hidden')
    }
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
        this.profilePhoto = e.target.result
        this.photoPreviewTarget.innerHTML = `<img src="${this.profilePhoto}" class="w-full h-full object-cover rounded-full">`
        this.updatePreview()
      }
      reader.readAsDataURL(file)
    }
  }

  addSection() {
    const sectionHtml = `
      <div data-biodata-target="section" class="section bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <input type="text" value="New Section" data-biodata-target="sectionTitle" data-action="input->biodata#updatePreview"
                 class="text-base sm:text-lg font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
          <div class="flex space-x-1 sm:space-x-2">
            <button data-action="click->biodata#addField" 
                    class="text-green-600 hover:text-green-800 p-1 sm:p-2 rounded transition-colors">
              <i class="fas fa-plus text-xs sm:text-sm"></i>
            </button>
            <button data-action="click->biodata#removeSection" 
                    class="text-red-500 hover:text-red-700 p-1 sm:p-2 rounded transition-colors">
              <i class="fas fa-trash text-xs sm:text-sm"></i>
            </button>
          </div>
        </div>
        <div data-biodata-target="fieldsContainer" class="space-y-2 sm:space-y-3">
          <div data-biodata-target="field" class="field flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-lg border border-gray-200">
            <div class="flex-1">
              <input type="text" value="Field Title" data-biodata-target="fieldTitle" data-action="input->biodata#updatePreview"
                     class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <input type="text" placeholder="Enter value" data-biodata-target="fieldValue" data-action="input->biodata#updatePreview"
                     class="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <button data-action="click->biodata#removeField" 
                    class="text-red-500 hover:text-red-700 p-1 sm:p-2 rounded self-start mt-5 sm:mt-6 transition-colors">
              <i class="fas fa-trash text-xs sm:text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    `
    
    this.sectionsContainerTarget.insertAdjacentHTML('beforeend', sectionHtml)
    this.updatePreview()
  }

  removeSection(event) {
    const sections = this.sectionTargets
    if (sections.length > 1) {
      const sectionToRemove = event.currentTarget.closest('[data-biodata-target="section"]')
      if (sectionToRemove) {
        sectionToRemove.remove()
        this.updatePreview()
      }
    } else {
      alert('You must have at least one section')
    }
  }

  addField(event) {
    const section = event.currentTarget.closest('[data-biodata-target="section"]')
    if (section) {
      const fieldsContainer = section.querySelector('[data-biodata-target="fieldsContainer"]')
      
      const fieldHtml = `
        <div data-biodata-target="field" class="field flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-lg border border-gray-200">
          <div class="flex-1">
            <input type="text" value="Field Title" data-biodata-target="fieldTitle" data-action="input->biodata#updatePreview"
                   class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <input type="text" placeholder="Enter value" data-biodata-target="fieldValue" data-action="input->biodata#updatePreview"
                   class="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <button data-action="click->biodata#removeField" 
                  class="text-red-500 hover:text-red-700 p-1 sm:p-2 rounded self-start mt-5 sm:mt-6 transition-colors">
            <i class="fas fa-trash text-xs sm:text-sm"></i>
          </button>
        </div>
      `
      
      fieldsContainer.insertAdjacentHTML('beforeend', fieldHtml)
      this.updatePreview()
    }
  }

  removeField(event) {
    const fieldToRemove = event.currentTarget.closest('[data-biodata-target="field"]')
    if (fieldToRemove) {
      const section = fieldToRemove.closest('[data-biodata-target="section"]')
      const fieldsContainer = section.querySelector('[data-biodata-target="fieldsContainer"]')
      const fields = fieldsContainer.querySelectorAll('[data-biodata-target="field"]')
      
      if (fields.length > 1) {
        fieldToRemove.remove()
        this.updatePreview()
      } else {
        alert('You must have at least one field in each section')
      }
    }
  }

  updatePreview() {
    if (!this.livePreviewEnabled) return
    
    const sections = this.sectionTargets
    let previewHtml = this.getTemplateHeader()
    
    sections.forEach(section => {
      const sectionTitle = section.querySelector('[data-biodata-target="sectionTitle"]').value
      const fields = section.querySelectorAll('[data-biodata-target="field"]')
      
      previewHtml += this.renderSection(sectionTitle, fields)
    })
    
    previewHtml += this.getTemplateFooter()
    
    this.previewTarget.innerHTML = previewHtml
  }

  getTemplateHeader() {
    const photoHtml = this.profilePhoto ? 
      `<div class="text-center mb-6">
        <img src="${this.profilePhoto}" class="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg">
      </div>` : ''
    
    const templates = {
      classic: `
        <div class="classic-template bg-white p-8 max-w-4xl mx-auto border border-gray-300">
          ${photoHtml}
          <div class="text-center mb-8 border-b-2 border-blue-600 pb-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Biodata</h1>
            <div class="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
      `,
      modern: `
        <div class="modern-template bg-gray-900 text-white p-8 max-w-4xl mx-auto">
          ${photoHtml}
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold mb-2">Biodata</h1>
            <div class="w-32 h-1 bg-white mx-auto"></div>
          </div>
      `,
      elegant: `
        <div class="elegant-template bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8 max-w-4xl mx-auto rounded-3xl shadow-2xl">
          ${photoHtml}
          <div class="text-center mb-12">
            <div class="inline-block bg-gradient-to-r from-purple-400 to-pink-400 text-white px-12 py-6 rounded-full mb-6 shadow-lg">
              <h1 class="text-4xl font-serif">Biodata</h1>
            </div>
            <div class="w-40 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </div>
      `,
      minimal: `
        <div class="minimal-template bg-white p-8 max-w-4xl mx-auto">
          ${photoHtml}
          <div class="text-center mb-8">
            <h1 class="text-3xl font-light text-gray-900 mb-4">Biodata</h1>
            <div class="w-16 h-px bg-gray-300 mx-auto"></div>
          </div>
      `,
      professional: `
        <div class="professional-template bg-white p-8 max-w-4xl mx-auto border border-teal-300">
          ${photoHtml}
          <div class="text-center mb-12 border-b-2 border-teal-600 pb-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Biodata</h1>
            <div class="w-20 h-1 bg-teal-600 mx-auto"></div>
          </div>
      `,
      creative: `
        <div class="creative-template bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 text-white p-8 max-w-4xl mx-auto rounded-2xl">
          ${photoHtml}
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold mb-2">Biodata</h1>
            <div class="w-24 h-1 bg-white mx-auto rounded-full"></div>
          </div>
      `
    }
    
    return templates[this.selectedTemplate] || templates.classic
  }

  getTemplateFooter() {
    const templates = {
      classic: `
          <div class="text-center mt-8 pt-6 border-t-2 border-blue-600">
            <p class="text-gray-600 text-sm">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `,
      modern: `
          <div class="text-center mt-8 pt-6 border-t border-gray-700">
            <p class="text-gray-400 text-sm">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `,
      elegant: `
          <div class="text-center mt-16 pt-8 border-t border-white/20">
            <p class="text-purple-200 text-sm font-light">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `,
      minimal: `
          <div class="text-center mt-8 pt-6">
            <p class="text-gray-500 text-sm">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `,
      professional: `
          <div class="text-center mt-12 pt-6 border-t-2 border-teal-600">
            <p class="text-gray-600 text-sm font-medium">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `,
      creative: `
          <div class="text-center mt-8 pt-6 border-t border-white/30">
            <p class="text-white/80 text-sm">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `
    }
    
    return templates[this.selectedTemplate] || templates.classic
  }

  renderSection(sectionTitle, fields) {
    const templates = {
      classic: `
        <div class="section mb-8">
          <h2 class="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">${sectionTitle}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${this.renderFields(fields, 'classic')}
          </div>
        </div>
      `,
      modern: `
        <div class="section mb-8">
          <h2 class="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">${sectionTitle}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${this.renderFields(fields, 'modern')}
          </div>
        </div>
      `,
      elegant: `
        <div class="section bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <h2 class="text-2xl font-serif text-purple-200 mb-8 flex items-center">
            <div class="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-4"></div>
            ${sectionTitle}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${this.renderFields(fields, 'elegant')}
          </div>
        </div>
      `,
      minimal: `
        <div class="section mb-8">
          <h2 class="text-xl font-light text-gray-900 mb-4 border-b border-gray-200 pb-2">${sectionTitle}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${this.renderFields(fields, 'minimal')}
          </div>
        </div>
      `,
      professional: `
        <div class="section bg-teal-50 p-6 border-l-4 border-teal-600 mb-8">
          <h2 class="text-xl font-bold text-teal-800 mb-6 flex items-center">
            <div class="w-4 h-4 bg-teal-600 rounded mr-3"></div>
            ${sectionTitle}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${this.renderFields(fields, 'professional')}
          </div>
        </div>
      `,
      creative: `
        <div class="section bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
          <h2 class="text-xl font-bold text-white mb-4 border-b border-white/30 pb-2">${sectionTitle}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${this.renderFields(fields, 'creative')}
          </div>
        </div>
      `
    }
    
    return templates[this.selectedTemplate] || templates.classic
  }

  renderFields(fields, template) {
    let fieldsHtml = ''
    
    fields.forEach(field => {
      const title = field.querySelector('[data-biodata-target="fieldTitle"]').value
      const value = field.querySelector('[data-biodata-target="fieldValue"]').value
      
      if (value.trim()) {
        const fieldTemplates = {
          classic: `
            <div class="field-item bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div class="text-sm font-bold text-blue-600 mb-1 uppercase tracking-wide">${title}</div>
              <div class="text-gray-800">${value}</div>
            </div>
          `,
          modern: `
            <div class="field-item bg-gray-800 p-4 rounded-lg border border-gray-700">
              <div class="text-sm font-bold text-gray-300 mb-1 uppercase tracking-wide">${title}</div>
              <div class="text-white">${value}</div>
            </div>
          `,
          elegant: `
            <div class="field-item bg-white/5 rounded-xl p-6 border border-white/10">
              <div class="text-sm font-medium text-purple-200 mb-2 uppercase tracking-wider">${title}</div>
              <div class="text-white text-lg font-light">${value}</div>
            </div>
          `,
          minimal: `
            <div class="field-item p-4 border-b border-gray-100">
              <div class="text-sm font-medium text-gray-600 mb-1">${title}</div>
              <div class="text-gray-900 font-light">${value}</div>
            </div>
          `,
          professional: `
            <div class="field-item bg-white p-4 border border-teal-200 rounded shadow-sm">
              <div class="text-sm font-bold text-teal-700 mb-2 uppercase tracking-wide">${title}</div>
              <div class="text-gray-800 font-medium">${value}</div>
            </div>
          `,
          creative: `
            <div class="field-item bg-white/10 p-4 rounded-lg border border-white/20">
              <div class="text-sm font-bold text-white/80 mb-1 uppercase tracking-wide">${title}</div>
              <div class="text-white">${value}</div>
            </div>
          `
        }
        
        fieldsHtml += fieldTemplates[template] || fieldTemplates.classic
      }
    })
    
    return fieldsHtml
  }

  async exportPDF() {
    if (!this.livePreviewEnabled) {
      this.updatePreview() // Force update for export
    }
    
    try {
      // Show loading state
      const button = event.currentTarget
      const originalText = button.innerHTML
      button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Generating PDF...'
      button.disabled = true
      
      // Wait a bit for the preview to update
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Create a temporary container for the PDF content
      const tempContainer = document.createElement('div')
      tempContainer.innerHTML = this.previewTarget.innerHTML
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.top = '0'
      tempContainer.style.width = '800px' // Fixed width for PDF
      tempContainer.style.backgroundColor = 'white'
      document.body.appendChild(tempContainer)
      
      // Use html2canvas to capture the content
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: tempContainer.scrollHeight
      })
      
      // Remove temporary container
      document.body.removeChild(tempContainer)
      
      // Create PDF using jsPDF
      const { jsPDF } = window.jspdf
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgData = canvas.toDataURL('image/png')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pdfWidth
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      let heightLeft = imgHeight
      let position = 0
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pdfHeight
      }
      
      // Download the PDF
      pdf.save(`biodata_${new Date().toISOString().slice(0, 10)}.pdf`)
      
    } catch (error) {
      console.error('PDF generation failed:', error)
      alert('PDF generation failed. Please try again.')
    } finally {
      // Restore button state
      const button = event.currentTarget
      button.innerHTML = originalText
      button.disabled = false
    }
  }

  async exportImage() {
    if (!this.livePreviewEnabled) {
      this.updatePreview() // Force update for export
    }
    
    try {
      // Show loading state
      const button = event.currentTarget
      const originalText = button.innerHTML
      button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Generating PNG...'
      button.disabled = true
      
      // Wait a bit for the preview to update
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Create a temporary container for the image content
      const tempContainer = document.createElement('div')
      tempContainer.innerHTML = this.previewTarget.innerHTML
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.top = '0'
      tempContainer.style.width = '800px' // Fixed width for image
      tempContainer.style.backgroundColor = 'white'
      document.body.appendChild(tempContainer)
      
      // Use html2canvas to capture the content
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: tempContainer.scrollHeight
      })
      
      // Remove temporary container
      document.body.removeChild(tempContainer)
      
      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `biodata_${new Date().toISOString().slice(0, 10)}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 'image/png')
      
    } catch (error) {
      console.error('Image generation failed:', error)
      alert('Image generation failed. Please try again.')
    } finally {
      // Restore button state
      const button = event.currentTarget
      button.innerHTML = originalText
      button.disabled = false
    }
  }
} 