"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Loader2, Plus, Trash2, Image as ImageIcon, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [hobbies, setHobbies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingHobby, setEditingHobby] = useState<any | null>(null);
  const [activeUploadHobbyId, setActiveUploadHobbyId] = useState<string | null>(null);
  
  // Cropper state
  const [upImg, setUpImg] = useState<any>();
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25
  });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (isAuthenticated) fetchHobbies();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123")) {
      setIsAuthenticated(true);
    } else {
      setError("Incorrect password");
    }
  };

  const fetchHobbies = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("hobbies").select("*, hobby_images(*)");
    if (error) {
      console.error(error);
      setError("Failed to fetch hobbies");
    } else {
      setHobbies(data || []);
    }
    setLoading(false);
  };

  const handleCreateHobby = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const id = formData.get("id") as string;
    
    const newHobby = {
      id: id || formData.get("title")?.toString().toLowerCase().replace(/\s+/g, '-'),
      title: formData.get("title"),
      short_desc: formData.get("short_desc"),
      icon: formData.get("icon") || "Activity",
      color: formData.get("color") || "from-blue-500/20 to-cyan-500/20",
      cover_image: formData.get("cover_image") || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
      detail_text: formData.get("detail_text"),
    };

    const { error } = await supabase.from("hobbies").upsert([newHobby]);
    if (error) {
      alert("Error saving hobby: " + error.message);
    } else {
      setEditingHobby(null);
      fetchHobbies();
    }
  };

  const handleDeleteHobby = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hobby?")) return;
    await supabase.from("hobbies").delete().eq("id", id);
    fetchHobbies();
  };

  const handleDeleteImage = async (imageId: string) => {
    await supabase.from("hobby_images").delete().eq("id", imageId);
    fetchHobbies();
  };

  // Image Cropping & Uploading Logic
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>, hobbyId: string) => {
    if (e.target.files && e.target.files.length > 0) {
      setActiveUploadHobbyId(hobbyId);
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const uploadCroppedImage = async (hobbyId: string) => {
    if (!completedCrop || !imgRef.current) return;
    setUploadingImage(true);

    try {
      const canvas = document.createElement("canvas");
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      const pixelRatio = window.devicePixelRatio || 1;

      // Set canvas size to match the original high-res dimensions of the cropped area
      canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio);
      canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.scale(pixelRatio, pixelRatio);
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY
      );

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const fileName = `${hobbyId}-${Date.now()}.jpg`;
        
        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("hobbies")
          .upload(fileName, blob, { contentType: 'image/jpeg' });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage.from("hobbies").getPublicUrl(fileName);

        // Save to Database
        const { error: dbError } = await supabase.from("hobby_images").insert([
          { hobby_id: hobbyId, image_url: publicUrl }
        ]);

        if (dbError) throw dbError;

        // Reset cropper and refresh
        setUpImg(null);
        setCompletedCrop(null);
        setActiveUploadHobbyId(null);
        fetchHobbies();
      }, 'image/jpeg', 0.9);

    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0a]">
        <div className="bg-[#111] p-8 rounded-2xl border border-white/10 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter Admin Password"
              className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="bg-white text-black font-medium p-3 rounded-lg hover:bg-gray-200">
              Login
            </button>
            <p className="text-xs text-white/40 text-center mt-2">
              (Set NEXT_PUBLIC_ADMIN_PASSWORD in your .env.local)
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-sans overflow-y-auto pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold">Hobbies Admin</h1>
            <p className="text-white/60 mt-2">Manage your hobbies and infinite image galleries.</p>
          </div>
          <button 
            onClick={() => setEditingHobby({})}
            className="bg-white text-black px-6 py-3 rounded-full font-medium flex items-center gap-2"
          >
            <Plus size={18} /> New Hobby
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8" /></div>
        ) : (
          <div className="flex flex-col gap-8">
            {hobbies.map((hobby) => (
              <div key={hobby.id} className="bg-[#111] border border-white/10 rounded-[2rem] p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      {hobby.title} <span className="text-sm font-normal text-white/40 px-3 py-1 bg-white/5 rounded-full">{hobby.id}</span>
                    </h2>
                    <p className="text-white/60 mt-2 max-w-2xl">{hobby.short_desc}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingHobby(hobby)} className="text-sm px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20">Edit</button>
                    <button onClick={() => handleDeleteHobby(hobby.id)} className="text-sm px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">Delete</button>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-8">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2"><ImageIcon size={18} /> Gallery Images</h3>
                  
                  {/* Image Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                    {hobby.hobby_images?.map((img: any) => (
                      <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden group border border-white/10">
                        <Image src={img.image_url} alt="Gallery item" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                        <button 
                          onClick={() => handleDeleteImage(img.id)}
                          className="absolute top-2 right-2 p-2 bg-red-500 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Upload New Image to this Hobby */}
                  <div className="bg-black/30 p-6 rounded-xl border border-white/5">
                    <h4 className="font-medium mb-4">Add New Image</h4>
                    <input type="file" accept="image/*" onChange={(e) => onSelectFile(e, hobby.id)} className="mb-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
                    
                    {upImg && activeUploadHobbyId === hobby.id && (
                      <div className="mt-4 flex flex-col items-start gap-4">
                        <p className="text-sm text-white/60">Crop your image (Free Aspect Ratio):</p>
                        <ReactCrop
                          crop={crop}
                          onChange={(c) => setCrop(c)}
                          onComplete={(c) => setCompletedCrop(c)}
                          className="max-h-[400px] rounded-lg overflow-hidden border border-white/20"
                        >
                          <img ref={imgRef} src={upImg} alt="Upload" className="max-h-[400px]" style={{ width: "auto" }} />
                        </ReactCrop>
                        <div className="flex gap-4">
                          <button 
                            onClick={() => uploadCroppedImage(hobby.id)}
                            disabled={uploadingImage}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                          >
                            {uploadingImage ? <Loader2 className="animate-spin w-4 h-4" /> : 'Upload Cropped Image'}
                          </button>
                          <button onClick={() => { setUpImg(null); setActiveUploadHobbyId(null); }} className="px-6 py-2 rounded-lg hover:bg-white/10">Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {hobbies.length === 0 && (
              <div className="text-center py-20 text-white/50 bg-[#111] rounded-[2rem] border border-white/10">
                No hobbies found. Create one to get started!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      {editingHobby && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-[#111] p-8 rounded-3xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">{editingHobby.id ? 'Edit Hobby' : 'Create New Hobby'}</h2>
            <form onSubmit={handleCreateHobby} className="flex flex-col gap-4">
              {editingHobby.id && <input type="hidden" name="id" value={editingHobby.id} />}
              
              <div>
                <label className="block text-sm text-white/60 mb-2">Title</label>
                <input required type="text" name="title" defaultValue={editingHobby.title} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none" />
              </div>
              
              <div>
                <label className="block text-sm text-white/60 mb-2">Short Description</label>
                <input required type="text" name="short_desc" defaultValue={editingHobby.short_desc} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Detailed Text</label>
                <textarea required name="detail_text" rows={4} defaultValue={editingHobby.detail_text} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Icon Name (Lucide)</label>
                  <input type="text" name="icon" defaultValue={editingHobby.icon || "Activity"} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Gradient Colors</label>
                  <input type="text" name="color" defaultValue={editingHobby.color || "from-blue-500/20 to-cyan-500/20"} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Cover Image URL (Background)</label>
                <input required type="url" name="cover_image" defaultValue={editingHobby.cover_image} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none" />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={() => setEditingHobby(null)} className="px-6 py-3 rounded-lg hover:bg-white/10">Cancel</button>
                <button type="submit" className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200">Save Hobby</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
