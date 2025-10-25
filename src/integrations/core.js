// src/integrations/Core.js
export async function UploadFile({ file }) {
  console.log('Mock file upload:', file.name);
  
  // Create a temporary URL for the uploaded file
  return {
    file_url: URL.createObjectURL(file)
  };
}
