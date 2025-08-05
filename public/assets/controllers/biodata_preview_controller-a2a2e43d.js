import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["preview", "biodataData", "selectedTemplate"]

  connect() {
    this.renderPreview()
  }

  renderPreview() {
    const biodata = JSON.parse(this.biodataDataTarget.textContent)
    const template = this.selectedTemplateTarget.textContent.trim()
    
    let previewHtml = this.getTemplateHeader(template, biodata.photo)
    
    // Render Personal Information
    if (biodata.personal) {
      previewHtml += this.renderSection('Personal Information', biodata.personal, template)
    }
    
    // Render Family Information
    if (biodata.family) {
      previewHtml += this.renderSection('Family Information', biodata.family, template)
    }
    
    // Render Contact Information
    if (biodata.contact) {
      previewHtml += this.renderSection('Contact Information', biodata.contact, template)
    }
    
    // Render Preferences
    if (biodata.preferences) {
      previewHtml += this.renderSection('Partner Preferences', biodata.preferences, template)
    }
    
    previewHtml += this.getTemplateFooter(template)
    
    this.previewTarget.innerHTML = previewHtml
  }

  getTemplateHeader(template, photo) {
    const photoHtml = photo ? 
      `<div class="text-center mb-6">
        <img src="${photo}" class="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg">
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
    
    return templates[template] || templates.classic
  }

  getTemplateFooter(template) {
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
    
    return templates[template] || templates.classic
  }

  renderSection(sectionTitle, data, template) {
    const templates = {
      classic: `
        <div class="section mb-8">
          <h2 class="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">${sectionTitle}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${this.renderFields(data, 'classic')}
          </div>
        </div>
      `,
      modern: `
        <div class="section mb-8">
          <h2 class="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">${sectionTitle}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${this.renderFields(data, 'modern')}
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
            ${this.renderFields(data, 'elegant')}
          </div>
        </div>
      `,
      minimal: `
        <div class="section mb-8">
          <h2 class="text-xl font-light text-gray-900 mb-4 border-b border-gray-200 pb-2">${sectionTitle}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${this.renderFields(data, 'minimal')}
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
            ${this.renderFields(data, 'professional')}
          </div>
        </div>
      `,
      creative: `
        <div class="section bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
          <h2 class="text-xl font-bold text-white mb-4 border-b border-white/30 pb-2">${sectionTitle}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${this.renderFields(data, 'creative')}
          </div>
        </div>
      `
    }
    
    return templates[template] || templates.classic
  }

  renderFields(data, template) {
    let fieldsHtml = ''
    
    Object.entries(data).forEach(([key, value]) => {
      if (value && value.toString().trim()) {
        const fieldTemplates = {
          classic: `
            <div class="field-item bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div class="text-sm font-bold text-blue-600 mb-1 uppercase tracking-wide">${this.formatFieldName(key)}</div>
              <div class="text-gray-800">${value}</div>
            </div>
          `,
          modern: `
            <div class="field-item bg-gray-800 p-4 rounded-lg border border-gray-700">
              <div class="text-sm font-bold text-gray-300 mb-1 uppercase tracking-wide">${this.formatFieldName(key)}</div>
              <div class="text-white">${value}</div>
            </div>
          `,
          elegant: `
            <div class="field-item bg-white/5 rounded-xl p-6 border border-white/10">
              <div class="text-sm font-medium text-purple-200 mb-2 uppercase tracking-wider">${this.formatFieldName(key)}</div>
              <div class="text-white text-lg font-light">${value}</div>
            </div>
          `,
          minimal: `
            <div class="field-item p-4 border-b border-gray-100">
              <div class="text-sm font-medium text-gray-600 mb-1">${this.formatFieldName(key)}</div>
              <div class="text-gray-900 font-light">${value}</div>
            </div>
          `,
          professional: `
            <div class="field-item bg-white p-4 border border-teal-200 rounded shadow-sm">
              <div class="text-sm font-bold text-teal-700 mb-2 uppercase tracking-wide">${this.formatFieldName(key)}</div>
              <div class="text-gray-800 font-medium">${value}</div>
            </div>
          `,
          creative: `
            <div class="field-item bg-white/10 p-4 rounded-lg border border-white/20">
              <div class="text-sm font-bold text-white/80 mb-1 uppercase tracking-wide">${this.formatFieldName(key)}</div>
              <div class="text-white">${value}</div>
            </div>
          `
        }
        
        fieldsHtml += fieldTemplates[template] || fieldTemplates.classic
      }
    })
    
    return fieldsHtml
  }

  formatFieldName(key) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  // Create export-compatible HTML without oklch colors
  createExportHTML() {
    const biodata = JSON.parse(this.biodataDataTarget.textContent)
    const template = this.selectedTemplateTarget.textContent.trim()
    
    // Create a clean version for export
    let exportHtml = this.getExportHeader(template, biodata.photo)
    
    // Render sections with export-compatible colors
    if (biodata.personal) {
      exportHtml += this.getExportSection('Personal Information', biodata.personal, template)
    }
    
    if (biodata.family) {
      exportHtml += this.getExportSection('Family Information', biodata.family, template)
    }
    
    if (biodata.contact) {
      exportHtml += this.getExportSection('Contact Information', biodata.contact, template)
    }
    
    if (biodata.preferences) {
      exportHtml += this.getExportSection('Partner Preferences', biodata.preferences, template)
    }
    
    exportHtml += this.getExportFooter(template)
    
    return exportHtml
  }

  getExportHeader(template, photo) {
    const photoHtml = photo ? 
      `<div style="text-align: center; margin-bottom: 24px;">
        <img src="${photo}" style="width: 128px; height: 128px; border-radius: 50%; margin: 0 auto; object-fit: cover; border: 4px solid #ffffff; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
      </div>` : ''
    
    const templates = {
      classic: `
        <div style="background-color: #ffffff; padding: 32px; max-width: 800px; margin: 0 auto; border: 1px solid #d1d5db; font-family: Arial, sans-serif;">
          ${photoHtml}
          <div style="text-align: center; margin-bottom: 32px; border-bottom: 2px solid #2563eb; padding-bottom: 24px;">
            <h1 style="font-size: 30px; font-weight: bold; color: #111827; margin-bottom: 8px;">Biodata</h1>
            <div style="width: 80px; height: 4px; background-color: #2563eb; margin: 0 auto;"></div>
          </div>
      `,
      modern: `
        <div style="background-color: #111827; color: #ffffff; padding: 32px; max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif;">
          ${photoHtml}
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 8px;">Biodata</h1>
            <div style="width: 128px; height: 4px; background-color: #ffffff; margin: 0 auto;"></div>
          </div>
      `,
      elegant: `
        <div style="background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%); color: #ffffff; padding: 32px; max-width: 800px; margin: 0 auto; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); font-family: Georgia, serif;">
          ${photoHtml}
          <div style="text-align: center; margin-bottom: 48px;">
            <div style="display: inline-block; background: linear-gradient(90deg, #c084fc 0%, #ec4899 100%); color: #ffffff; padding: 24px 48px; border-radius: 50px; margin-bottom: 24px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
              <h1 style="font-size: 36px; margin: 0;">Biodata</h1>
            </div>
            <div style="width: 160px; height: 4px; background: linear-gradient(90deg, #c084fc 0%, #ec4899 100%); margin: 0 auto; border-radius: 2px;"></div>
          </div>
      `,
      minimal: `
        <div style="background-color: #ffffff; padding: 32px; max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif;">
          ${photoHtml}
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 30px; font-weight: 300; color: #111827; margin-bottom: 16px;">Biodata</h1>
            <div style="width: 64px; height: 1px; background-color: #d1d5db; margin: 0 auto;"></div>
          </div>
      `,
      professional: `
        <div style="background-color: #ffffff; padding: 32px; max-width: 800px; margin: 0 auto; border: 1px solid #5eead4; font-family: Arial, sans-serif;">
          ${photoHtml}
          <div style="text-align: center; margin-bottom: 48px; border-bottom: 2px solid #0d9488; padding-bottom: 24px;">
            <h1 style="font-size: 30px; font-weight: bold; color: #111827; margin-bottom: 8px;">Biodata</h1>
            <div style="width: 80px; height: 4px; background-color: #0d9488; margin: 0 auto;"></div>
          </div>
      `,
      creative: `
        <div style="background: linear-gradient(135deg, #fb923c 0%, #ef4444 50%, #9333ea 100%); color: #ffffff; padding: 32px; max-width: 800px; margin: 0 auto; border-radius: 16px; font-family: Arial, sans-serif;">
          ${photoHtml}
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 8px;">Biodata</h1>
            <div style="width: 96px; height: 4px; background-color: #ffffff; margin: 0 auto; border-radius: 2px;"></div>
          </div>
      `
    }
    
    return templates[template] || templates.classic
  }

  getExportFooter(template) {
    const templates = {
      classic: `
          <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 2px solid #2563eb;">
            <p style="color: #4b5563; font-size: 14px;">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `,
      modern: `
          <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #374151;">
            <p style="color: #9ca3af; font-size: 14px;">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `,
      elegant: `
          <div style="text-align: center; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
            <p style="color: #e9d5ff; font-size: 14px; font-weight: 300;">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `,
      minimal: `
          <div style="text-align: center; margin-top: 32px; padding-top: 24px;">
            <p style="color: #6b7280; font-size: 14px;">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `,
      professional: `
          <div style="text-align: center; margin-top: 48px; padding-top: 24px; border-top: 2px solid #0d9488;">
            <p style="color: #4b5563; font-size: 14px; font-weight: 500;">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `,
      creative: `
          <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.3);">
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 14px;">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `
    }
    
    return templates[template] || templates.classic
  }

  getExportSection(sectionTitle, data, template) {
    const templates = {
      classic: `
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: bold; color: #2563eb; margin-bottom: 16px; border-bottom: 1px solid #bfdbfe; padding-bottom: 8px;">${sectionTitle}</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            ${this.getExportFields(data, 'classic')}
          </div>
        </div>
      `,
      modern: `
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: bold; color: #ffffff; margin-bottom: 16px; border-bottom: 1px solid #374151; padding-bottom: 8px;">${sectionTitle}</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            ${this.getExportFields(data, 'modern')}
          </div>
        </div>
      `,
      elegant: `
        <div style="background-color: rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 32px; border: 1px solid rgba(255, 255, 255, 0.2); margin-bottom: 32px;">
          <h2 style="font-size: 24px; font-family: Georgia, serif; color: #e9d5ff; margin-bottom: 32px; display: flex; align-items: center;">
            <div style="width: 12px; height: 12px; background: linear-gradient(90deg, #c084fc 0%, #ec4899 100%); border-radius: 50%; margin-right: 16px;"></div>
            ${sectionTitle}
          </h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            ${this.getExportFields(data, 'elegant')}
          </div>
        </div>
      `,
      minimal: `
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: 300; color: #111827; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">${sectionTitle}</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            ${this.getExportFields(data, 'minimal')}
          </div>
        </div>
      `,
      professional: `
        <div style="background-color: #f0fdfa; padding: 24px; border-left: 4px solid #0d9488; margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: bold; color: #115e59; margin-bottom: 24px; display: flex; align-items: center;">
            <div style="width: 16px; height: 16px; background-color: #0d9488; border-radius: 50%; margin-right: 12px;"></div>
            ${sectionTitle}
          </h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            ${this.getExportFields(data, 'professional')}
          </div>
        </div>
      `,
      creative: `
        <div style="background-color: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 24px; border: 1px solid rgba(255, 255, 255, 0.2); margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: bold; color: #ffffff; margin-bottom: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.3); padding-bottom: 8px;">${sectionTitle}</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            ${this.getExportFields(data, 'creative')}
          </div>
        </div>
      `
    }
    
    return templates[template] || templates.classic
  }

  getExportFields(data, template) {
    let fieldsHtml = ''
    
    Object.entries(data).forEach(([key, value]) => {
      if (value && value.toString().trim()) {
        const fieldTemplates = {
          classic: `
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <div style="font-size: 14px; font-weight: bold; color: #2563eb; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em;">${this.formatFieldName(key)}</div>
              <div style="color: #1f2937;">${value}</div>
            </div>
          `,
          modern: `
            <div style="background-color: #1f2937; padding: 16px; border-radius: 8px; border: 1px solid #374151;">
              <div style="font-size: 14px; font-weight: bold; color: #d1d5db; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em;">${this.formatFieldName(key)}</div>
              <div style="color: #ffffff;">${value}</div>
            </div>
          `,
          elegant: `
            <div style="background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 24px; border: 1px solid rgba(255, 255, 255, 0.1);">
              <div style="font-size: 14px; font-weight: 500; color: #e9d5ff; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;">${this.formatFieldName(key)}</div>
              <div style="color: #ffffff; font-size: 18px; font-weight: 300;">${value}</div>
            </div>
          `,
          minimal: `
            <div style="padding: 16px; border-bottom: 1px solid #f3f4f6;">
              <div style="font-size: 14px; font-weight: 500; color: #4b5563; margin-bottom: 4px;">${this.formatFieldName(key)}</div>
              <div style="color: #111827; font-weight: 300;">${value}</div>
            </div>
          `,
          professional: `
            <div style="background-color: #ffffff; padding: 16px; border: 1px solid #99f6e4; border-radius: 4px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
              <div style="font-size: 14px; font-weight: bold; color: #0f766e; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">${this.formatFieldName(key)}</div>
              <div style="color: #1f2937; font-weight: 500;">${value}</div>
            </div>
          `,
          creative: `
            <div style="background-color: rgba(255, 255, 255, 0.1); padding: 16px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.2);">
              <div style="font-size: 14px; font-weight: bold; color: rgba(255, 255, 255, 0.8); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em;">${this.formatFieldName(key)}</div>
              <div style="color: #ffffff;">${value}</div>
            </div>
          `
        }
        
        fieldsHtml += fieldTemplates[template] || fieldTemplates.classic
      }
    })
    
    return fieldsHtml
  }

  async exportPDF(event) {
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
      tempContainer.innerHTML = this.createExportHTML()
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
        height: tempContainer.scrollHeight,
        logging: false,
        removeContainer: true
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

  async exportImage(event) {
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
      tempContainer.innerHTML = this.createExportHTML()
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
        height: tempContainer.scrollHeight,
        logging: false,
        removeContainer: true
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