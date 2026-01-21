import React, { useState } from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const CloudinaryImage = ({ 
  publicId, 
  width = 500, 
  height = 500,
  className = "",
  alt = "Image",
  isProfile = false,
  folderType = "profiles",
  onUpload = null
}) => {
  const [uploading, setUploading] = useState(false);
  const [imageId, setImageId] = useState(publicId);
  const [error, setError] = useState(null);

  const cld = new Cloudinary({ 
    cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } 
  });
  
  const img = cld
    .image(imageId)
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(width).height(height));

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'designratio-products');
    formData.append('folder', `designratio-products/${folderType}`);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Upload failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      
      setImageId(data.public_id);
      if (onUpload) onUpload(data.secure_url);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={isProfile ? "relative w-32 mx-auto" : "relative"}>
      {imageId ? (
        <AdvancedImage 
          cldImg={img} 
          alt={alt}
          className={className || (isProfile ? "mt-10 w-full rounded-full border" : "")}
        />
      ) : (
        <div className={className || (isProfile ? "mt-10 w-full rounded-full border bg-gray-200 flex items-center justify-center" : "")}>
          <p className="text-center py-10 text-gray-500">No image</p>
        </div>
      )}
      
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
      
      {isProfile && (
        <label className={`absolute bottom-1 right-1 bg-white border p-1 rounded-full shadow hover:bg-amber-800 hover:text-white cursor-pointer transition ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {uploading ? '‚è≥' : 'Ì≥∑'}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default CloudinaryImage;
