// src/components/upload/PhotoUpload.js
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, X, Image as ImageIcon } from "lucide-react";
import { UploadFile } from "@/integrations/Core";

export default function PhotoUpload({ onPhotoUploaded, currentPhoto }) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentPhoto || null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target.result);
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      onPhotoUploaded(file_url);
    } catch (error) {
      console.error("Upload failed:", error);
      setPreviewUrl(null);
    }
    setIsUploading(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const clearPhoto = () => {
    setPreviewUrl(null);
    onPhotoUploaded(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />

      {previewUrl ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative">
            <div className="aspect-[4/3] bg-slate-100">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-3 right-3 rounded-full shadow-lg"
              onClick={clearPhoto}
            >
              <X className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">
                Add Photo
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Take a clear photo of the item to help with identification
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl"
              >
                <Upload className="w-4 h-4" />
                Upload Photo
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.capture = "environment";
                  input.onchange = (e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  };
                  input.click();
                }}
                disabled={isUploading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl"
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </Button>
            </div>
            {isUploading && (
              <p className="text-sm text-blue-600 font-medium">
                Uploading photo...
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
