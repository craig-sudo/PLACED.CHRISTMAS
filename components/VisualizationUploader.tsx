import React, { useState, useRef } from 'react';

export default function VisualizationUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validation: File type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please upload a JPG, PNG, or WebP image');
      return;
    }

    // Validation: File size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setErrorMessage('Image must be under 10MB');
      return;
    }

    // Clear any previous errors
    setErrorMessage(null);
    setUploadSuccess(false);

    // Set file and create preview
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select an image first');
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    // Simulate backend API upload
    setTimeout(() => {
        setIsUploading(false);
        setUploadSuccess(true);
        // Optional: Auto-redirect to consultation booking after 3 seconds
        // setTimeout(() => {
        //   window.location.href = '/booking?mockup=true';
        // }, 3000);
    }, 3000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadSuccess(false);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-brand-dark/30 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl max-w-2xl mx-auto">
      {!uploadSuccess ? (
        <>
          {/* Instructions */}
          <div className="mb-6 text-center">
            <p className="text-white/90 text-xl mb-2">
              Upload a photo of your home's exterior
            </p>
            <p className="text-white/60 text-sm">
              We'll create a custom design mockup during your free consultation
            </p>
          </div>

          {/* File Input Area */}
          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
              id="mockup-upload"
            />
            {!previewUrl ? (
              <label
                htmlFor="mockup-upload"
                className="block cursor-pointer border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-brand-secondary hover:bg-white/5 transition-all"
              >
                <div className="text-6xl mb-4 mx-auto text-white/80">🖼️</div>
                <p className="text-white text-lg font-semibold mb-2">
                  Click to upload your home photo
                </p>
                <p className="text-white/60 text-sm">
                  JPG, PNG, or WebP (Max 10MB)
                </p>
              </label>
            ) : (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview of your home"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl hover:bg-red-700 transition-all"
                  title="Remove image"
                >
                  &times;
                </button>
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center">
              {errorMessage}
            </div>
          )}

          {/* Upload Button */}
          {previewUrl && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full bg-brand-secondary text-brand-primary font-bold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-400 transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-wait"
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                'Upload & Request Mockup'
              )}
            </button>
          )}

          {/* Trust Signal */}
          <div className="mt-6 text-center">
            <p className="text-white/50 text-xs">
              🔒 Your photo is secure and will only be used for your custom design
            </p>
          </div>
        </>
      ) : (
        // Success State
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Upload Successful!
          </h3>
          <p className="text-white/70 mb-6">
            We'll prepare your custom mockup before your consultation.
          </p>
          <p className="text-brand-secondary font-semibold">
            Our team will be in touch shortly!
          </p>
        </div>
      )}
    </div>
  );
}
