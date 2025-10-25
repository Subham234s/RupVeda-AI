
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (base64: string) => void;
  uploadedImage: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, uploadedImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="relative w-full h-64 bg-black/10 dark:bg-black/20 border border-slate-300/20 rounded-xl flex items-center justify-center cursor-pointer hover:border-cyan-400 transition-all duration-300 group overflow-hidden"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {uploadedImage ? (
          <img src={uploadedImage} alt="Uploaded preview" className="object-contain h-full w-full" />
        ) : (
          <div className="text-center text-text-secondary p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="font-semibold">Click to upload a photo</p>
            <p className="text-sm">PNG, JPG, or WEBP.</p>
          </div>
        )}
         <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-lg font-bold text-white">{uploadedImage ? 'Change Photo' : 'Select Photo'}</p>
        </div>
      </div>
    </div>
  );
};
