import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft, Image as ImageIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../lib/api";
import { API_ENDPOINTS } from "../config/endpoints";
import { toast } from "sonner";
import { cn } from "../lib/utils";

export default function CreatePromo() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingDesktop, setUploadingDesktop] = useState(false);
  const [uploadingMobile, setUploadingMobile] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    desktopImage: "",
    mobileImage: "",
    linkText: "Shop Now",
    linkUrl: "/shop",
    theme: "light",
    align: "center",
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "desktop" | "mobile") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "desktop") setUploadingDesktop(true);
    else setUploadingMobile(true);

    const data = new FormData();
    data.append("image", file);

    try {
      const response = await api.post(API_ENDPOINTS.UPLOAD, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = response.data.url;
      setFormData((prev) => ({ ...prev, [type === "desktop" ? "desktopImage" : "mobileImage"]: url }));
      toast.success(`${type === "desktop" ? "Desktop" : "Mobile"} image uploaded`);
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      if (type === "desktop") setUploadingDesktop(false);
      else setUploadingMobile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.desktopImage || !formData.mobileImage) {
      toast.error("Title and both images are required");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/promos", formData);
      toast.success("Campaign created successfully!");
      navigate("/storefront/promos");
    } catch (error) {
      toast.error("Failed to create campaign");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/storefront/promos" className="p-2 hover:bg-white rounded-xl transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-serif">Create Campaign</h1>
            <p className="text-muted text-sm">Add a new dynamic slider campaign.</p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm tracking-widest uppercase shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Campaign
        </button>
      </div>

      <form className="bg-white rounded-2xl border border-border shadow-sm p-8 space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Title *</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-secondary/30 border border-border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. Solid Brass" required />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Subtitle</label>
            <input type="text" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full bg-secondary/30 border border-border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. The Eternal Material" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Button Text</label>
            <input type="text" value={formData.linkText} onChange={e => setFormData({...formData, linkText: e.target.value})} className="w-full bg-secondary/30 border border-border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Button Link URL</label>
            <input type="text" value={formData.linkUrl} onChange={e => setFormData({...formData, linkUrl: e.target.value})} className="w-full bg-secondary/30 border border-border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Theme (Text Color)</label>
            <select value={formData.theme} onChange={e => setFormData({...formData, theme: e.target.value as any})} className="w-full bg-secondary/30 border border-border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
              <option value="light">Light (White Text)</option>
              <option value="dark">Dark (Black Text)</option>
            </select>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Text Alignment</label>
            <select value={formData.align} onChange={e => setFormData({...formData, align: e.target.value as any})} className="w-full bg-secondary/30 border border-border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-8">
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted flex justify-between">
              <span>Desktop Image (Wide) *</span>
              {uploadingDesktop && <Loader2 className="w-3 h-3 animate-spin" />}
            </label>
            <div className={cn("relative h-48 border-2 border-dashed rounded-xl flex items-center justify-center overflow-hidden transition-all", formData.desktopImage ? "border-primary/20" : "border-border hover:border-primary/50 bg-secondary/30")}>
              {formData.desktopImage ? (
                <img src={formData.desktopImage} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-muted">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-xs font-bold uppercase">Upload Desktop</span>
                </div>
              )}
              <input type="file" onChange={e => handleUpload(e, "desktop")} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted flex justify-between">
              <span>Mobile Image (Tall) *</span>
              {uploadingMobile && <Loader2 className="w-3 h-3 animate-spin" />}
            </label>
            <div className={cn("relative h-48 w-32 border-2 border-dashed rounded-xl flex items-center justify-center overflow-hidden transition-all", formData.mobileImage ? "border-primary/20" : "border-border hover:border-primary/50 bg-secondary/30")}>
              {formData.mobileImage ? (
                <img src={formData.mobileImage} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-muted">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-[9px] font-bold uppercase text-center leading-tight">Upload<br/>Mobile</span>
                </div>
              )}
              <input type="file" onChange={e => handleUpload(e, "mobile")} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
