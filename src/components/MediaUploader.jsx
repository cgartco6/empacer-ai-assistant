import React, { useState } from 'react';
import { Camera, Upload, Image as ImageIcon, X } from 'lucide-react';

export default function MediaUploader({ onPhotoCaptured }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        if (onPhotoCaptured) onPhotoCaptured(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPhoto = () => {
    setPreview(null);
    if (onPhotoCaptured) onPhotoCaptured(null);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-300">
        <span className="font-semibold flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-lime-400" /> Attach Product / Service Photo
        </span>
        {preview && (
          <button onClick={clearPhoto} className="text-rose-400 hover:text-rose-300">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {preview ? (
        <div className="relative rounded-lg overflow-hidden border border-slate-800 max-h-48">
          <img src={preview} alt="Product Upload Preview" className="w-full object-cover" />
        </div>
      ) : (
        <label className="border-2 border-dashed border-slate-800 hover:border-lime-400/50 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition">
          <Upload className="w-6 h-6 text-slate-500" />
          <span className="text-[11px] text-slate-400">Tap to upload product photo or snap camera</span>
          <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
        </label>
      )}
    </div>
  );
}
