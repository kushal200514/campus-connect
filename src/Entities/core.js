// src/integrations/Core.js
// Mock implementation for local development

export async function UploadFile({ file }) {
  console.log('Mock file upload:', file.name);
  
  // Return a fake URL for now
  return {
    file_url: URL.createObjectURL(file)
  };
}
