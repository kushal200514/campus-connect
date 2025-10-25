// src/utils.js

export const createPageUrl = (page) => {
  // Simple navigation helper
  if (page.includes('?')) {
    const [pageName, params] = page.split('?')
    return `/${pageName.toLowerCase()}?${params}`
  }
  return `/${page.toLowerCase()}`
}
