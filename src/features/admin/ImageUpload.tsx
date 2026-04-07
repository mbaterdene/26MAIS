import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setError('');
    setIsUploading(true);

    try {
      // Get signing configuration
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8787';
      const token = localStorage.getItem('auth_token');
      
      // Generate unique public ID
      const publicId = `news-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const signingResponse = await fetch(`${BACKEND_URL}/api/cloudinary/sign-upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folder: 'news',
          publicId: publicId,
        }),
      });

      if (!signingResponse.ok) {
        throw new Error('Failed to get upload authorization');
      }

      const signedData = await signingResponse.json();

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signedData.apiKey);
      formData.append('signature', signedData.signature);
      formData.append('timestamp', signedData.timestamp.toString());
      formData.append('public_id', signedData.publicId);
      formData.append('folder', signedData.folder);

      const uploadUrl = `https://api.cloudinary.com/v1_1/${signedData.cloudName}/image/upload`;
      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }

      const uploadResult = await uploadResponse.json();
      onChange(uploadResult.secure_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700">
        Cover Image <span className="text-gray-500 font-normal">(Optional)</span>
      </label>

      {value ? (
        <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
          <img
            src={value}
            alt="Cover"
            className="w-full h-48 object-cover"
          />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            title="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="block cursor-pointer">
          <div className="relative rounded-xl border-2 border-dashed border-gray-300 hover:border-cardinal-red/50 hover:bg-cardinal-red/5 transition-all p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isUploading}
              className="hidden"
            />
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="animate-spin text-cardinal-red" size={32} />
                <p className="text-sm font-medium text-gray-600">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="text-gray-400" size={32} />
                <div>
                  <p className="text-sm font-medium text-gray-900">Click to upload cover image</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
            )}
          </div>
        </label>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm flex items-center gap-2 border border-red-200">
          <ImageIcon size={16} />
          {error}
        </div>
      )}
    </div>
  );
}
