import { Upload, X, Loader2, Image as ImageIcon, Plus } from 'lucide-react';
import { useRef, useState } from 'react';

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  label?: string;
  max?: number;
}

interface UploadingFile {
  id: string;
  name: string;
  progress: 'uploading' | 'done' | 'error';
  error?: string;
}

async function uploadToCloudinary(
  file: File,
  folder: string
): Promise<string> {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8787';
  const token = localStorage.getItem('auth_token');
  const publicId = `${folder}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const signingResponse = await fetch(`${BACKEND_URL}/api/cloudinary/sign-upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ folder, publicId }),
  });

  if (!signingResponse.ok) throw new Error('Failed to get upload authorization');
  const signedData = await signingResponse.json();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signedData.apiKey);
  formData.append('signature', signedData.signature);
  formData.append('timestamp', signedData.timestamp.toString());
  formData.append('public_id', signedData.publicId);
  formData.append('folder', signedData.folder);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${signedData.cloudName}/image/upload`;
  const uploadResponse = await fetch(uploadUrl, { method: 'POST', body: formData });
  if (!uploadResponse.ok) throw new Error('Failed to upload image');

  const result = await uploadResponse.json();
  return result.secure_url as string;
}

export function MultiImageUpload({
  value,
  onChange,
  folder = 'news',
  label = 'Cover Images',
  max = 10,
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState<UploadingFile[]>([]);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Reset input so re-selecting same files works
    e.target.value = '';

    const remaining = max - value.length;
    if (remaining <= 0) {
      setError(`Maximum ${max} images allowed.`);
      return;
    }

    const filesToUpload = files.slice(0, remaining);
    setError('');

    // Validate
    for (const file of filesToUpload) {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are accepted.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError(`"${file.name}" exceeds 5 MB limit.`);
        return;
      }
    }

    // Create uploading placeholders
    const placeholders: UploadingFile[] = filesToUpload.map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random()}`,
      name: f.name,
      progress: 'uploading',
    }));
    setUploading((prev) => [...prev, ...placeholders]);

    // Upload in parallel
    const results = await Promise.allSettled(
      filesToUpload.map((file) => uploadToCloudinary(file, folder))
    );

    const newUrls: string[] = [];
    const updatedPlaceholders = placeholders.map((p, i) => {
      const result = results[i];
      if (result.status === 'fulfilled') {
        newUrls.push(result.value);
        return { ...p, progress: 'done' as const };
      } else {
        return { ...p, progress: 'error' as const, error: (result.reason as Error).message };
      }
    });

    setUploading((prev) =>
      prev.map((u) => {
        const updated = updatedPlaceholders.find((p) => p.id === u.id);
        return updated ?? u;
      })
    );

    if (newUrls.length > 0) onChange([...value, ...newUrls]);

    // Clear done placeholders after 800ms, keep errors visible briefly
    setTimeout(() => {
      setUploading((prev) => prev.filter((u) => u.progress === 'error'));
      setTimeout(() => setUploading([]), 2000);
    }, 800);
  };

  const removeImage = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return;
    const updated = [...value];
    [updated[from], updated[to]] = [updated[to], updated[from]];
    onChange(updated);
  };

  const canAddMore = value.length < max;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-700">
          {label}
          <span className="ml-2 text-xs font-normal text-gray-400">
            {value.length}/{max} — first image shown as thumbnail
          </span>
        </label>
      </div>

      {/* Thumbnail grid */}
      {(value.length > 0 || uploading.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {value.map((url, i) => (
            <div key={url} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-100 aspect-video">
              <img
                src={url}
                alt={`Image ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay controls */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i - 1)}
                    title="Move left"
                    className="p-1.5 bg-white/80 hover:bg-white text-gray-800 rounded-lg text-xs font-bold"
                  >
                    ←
                  </button>
                )}
                {i < value.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i + 1)}
                    title="Move right"
                    className="p-1.5 bg-white/80 hover:bg-white text-gray-800 rounded-lg text-xs font-bold"
                  >
                    →
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  title="Remove"
                  className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  <X size={14} />
                </button>
              </div>
              {/* Cover badge on first image */}
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 bg-cardinal-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  COVER
                </span>
              )}
            </div>
          ))}

          {/* Uploading placeholders */}
          {uploading.map((u) => (
            <div
              key={u.id}
              className={`relative rounded-xl border aspect-video flex flex-col items-center justify-center gap-1 text-xs font-medium
                ${u.progress === 'error' ? 'border-red-300 bg-red-50 text-red-600' : 'border-gray-200 bg-gray-50 text-gray-500'}`}
            >
              {u.progress === 'uploading' && <Loader2 className="animate-spin text-cardinal-red" size={20} />}
              {u.progress === 'error' && <ImageIcon size={20} />}
              <span className="px-2 text-center truncate w-full text-center">
                {u.progress === 'error' ? u.error || 'Failed' : 'Uploading...'}
              </span>
            </div>
          ))}

          {/* Add more tile */}
          {canAddMore && (
            <label className="cursor-pointer">
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="rounded-xl border-2 border-dashed border-gray-300 hover:border-cardinal-red/50 hover:bg-cardinal-red/5 transition-all aspect-video flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-cardinal-red">
                <Plus size={24} />
                <span className="text-xs font-medium">Add Image</span>
              </div>
            </label>
          )}
        </div>
      )}

      {/* Empty state — full-width dropzone */}
      {value.length === 0 && uploading.length === 0 && (
        <label className="block cursor-pointer">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="rounded-xl border-2 border-dashed border-gray-300 hover:border-cardinal-red/50 hover:bg-cardinal-red/5 transition-all p-8 text-center">
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <Upload size={32} />
              <div>
                <p className="text-sm font-medium text-gray-900">Click to upload images</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5 MB each · max {max} images</p>
              </div>
            </div>
          </div>
        </label>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
          <ImageIcon size={14} />
          {error}
        </p>
      )}
    </div>
  );
}
