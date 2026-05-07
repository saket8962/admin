import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Settings,
  Type,
  Layout,
  MousePointerClick,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  PanelRightClose,
  PanelRightOpen
} from "lucide-react";
import { cn } from "../lib/utils";
import api from "../lib/api";
import { API_ENDPOINTS } from "../config/endpoints";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function CreateHeroSlide() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"media" | "content" | "layout" | "actions">("media");
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);

  const [slide, setSlide] = useState({
    title: "",
    highlight: "",
    subtitle: "",
    mediaUrl: "",
    mediaType: "image" as "image" | "video",
    buttonText: "",
    buttonLink: "",
    secondaryButtonText: "",
    secondaryButtonLink: "",
    textPosition: "center",
    theme: "light" as "light" | "dark",
    overlayOpacity: 40,
    isActive: true,
  });

  useEffect(() => {
    if (isEditing) {
      fetchSlide();
    }
  }, [id]);

  const fetchSlide = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.HERO.BASE);
      const found = response.data.data.find((s: any) => s._id === id);
      if (found) setSlide({ ...slide, ...found });
    } catch (error) {
      toast.error("Failed to load slide data");
    }
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post(API_ENDPOINTS.UPLOAD, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = response.data.url;
      const type = file.type.startsWith("video/") ? "video" : "image";
      
      setSlide((prev) => ({ ...prev, mediaUrl: url, mediaType: type }));
      toast.success("Media uploaded successfully");
      setActiveTab("content");
    } catch (error) {
      toast.error("Failed to upload media. Check file size limits.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slide.mediaUrl) {
      toast.error("Background Media is required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing) {
        await api.put(`${API_ENDPOINTS.HERO.BASE}/${id}`, slide);
        toast.success("Slide updated successfully");
      } else {
        await api.post(API_ENDPOINTS.HERO.BASE, slide);
        toast.success("Slide created successfully");
      }
      navigate("/storefront/hero");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to process slide";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 9-Grid Position Mapping
  const getJustifyClass = () => {
    if (slide.textPosition.includes("left")) return "justify-start";
    if (slide.textPosition.includes("right")) return "justify-end";
    return "justify-center";
  };
  const getAlignClass = () => {
    if (slide.textPosition.includes("top")) return "items-start pt-32";
    if (slide.textPosition.includes("bottom")) return "items-end pb-32";
    return "items-center";
  };
  const getTextAlignClass = () => {
    if (slide.textPosition.includes("left")) return "text-left";
    if (slide.textPosition.includes("right")) return "text-right";
    return "text-center";
  };

  // Text Color based on Theme
  const textColor = slide.theme === "dark" ? "text-black" : "text-white";
  const btnPrimaryClass = slide.theme === "dark" 
    ? "bg-black text-white hover:bg-neutral-800" 
    : "bg-white text-black hover:bg-neutral-200";
  const btnSecondaryClass = slide.theme === "dark"
    ? "border-2 border-black text-black hover:bg-black/5"
    : "border-2 border-white text-white hover:bg-white/10";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-[100] bg-neutral-900 overflow-hidden flex font-sans"
    >
      
      {/* 1. FULL SCREEN CANVAS (Preview) */}
      <div className="flex-1 relative h-full w-full bg-[#111] transition-all duration-500">
        
        {/* Top Navbar overlay */}
        <div className="absolute top-0 left-0 w-full p-6 z-40 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-4 pointer-events-auto">
            <button
              onClick={() => navigate("/storefront/hero")}
              className="p-3 bg-black/50 backdrop-blur-md hover:bg-black/70 rounded-full transition-colors border border-white/10"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">Live Visual Builder</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 pointer-events-auto">
            <button
              onClick={() => setIsInspectorOpen(!isInspectorOpen)}
              className="p-3 bg-black/50 backdrop-blur-md hover:bg-black/70 rounded-full transition-colors border border-white/10"
              title="Toggle Inspector"
            >
              {isInspectorOpen ? <PanelRightClose className="w-5 h-5 text-white" /> : <PanelRightOpen className="w-5 h-5 text-white" />}
            </button>
            <button
              onClick={handleFormSubmit}
              disabled={isSubmitting}
              className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save & Publish"}
            </button>
          </div>
        </div>

        {/* Live Slide Preview */}
        <div className="w-full h-full relative">
          {slide.mediaUrl ? (
            slide.mediaType === "video" ? (
              <video src={slide.mediaUrl} autoPlay loop muted playsInline className="object-cover w-full h-full" />
            ) : (
              <img src={slide.mediaUrl} alt="Preview" className="object-cover w-full h-full" />
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center border-4 border-dashed border-white/10 m-12 rounded-3xl w-[calc(100%-6rem)] h-[calc(100%-6rem)]">
              <ImageIcon className="w-16 h-16 text-white/20 mb-4" />
              <p className="text-white/40 font-serif text-3xl italic">Your Canvas is Empty</p>
              <p className="text-white/30 text-sm mt-2">Upload media in the inspector panel to begin.</p>
            </div>
          )}

          {/* Dynamic Overlay */}
          <div 
            className="absolute inset-0 transition-all duration-300 pointer-events-none" 
            style={{ backgroundColor: `rgba(0,0,0,${slide.overlayOpacity / 100})` }}
          />

          {/* Dynamic Content */}
          <div className={cn(
            "absolute inset-0 z-10 px-12 md:px-24 flex pointer-events-none",
            getJustifyClass(),
            getAlignClass()
          )}>
            <div className={cn("max-w-2xl space-y-6 transition-all duration-500", textColor, getTextAlignClass())}>
              {(slide.title || slide.highlight) && (
                <h1 className="text-5xl md:text-7xl font-serif leading-tight">
                  {slide.title}
                  {slide.title && slide.highlight && <br />}
                  <span className="italic">{slide.highlight}</span>
                </h1>
              )}
              {slide.subtitle && (
                <p className="text-lg md:text-xl opacity-90 max-w-md mx-auto">
                  {slide.subtitle}
                </p>
              )}
              
              {(slide.buttonText || slide.secondaryButtonText) && (
                <div className={cn("flex flex-wrap gap-4 mt-6", slide.textPosition.includes("left") ? "justify-start" : slide.textPosition.includes("right") ? "justify-end" : "justify-center")}>
                  {slide.buttonText && (
                    <button className={cn("px-8 py-4 text-sm uppercase font-bold tracking-widest rounded-sm pointer-events-auto", btnPrimaryClass)}>
                      {slide.buttonText}
                    </button>
                  )}
                  {slide.secondaryButtonText && (
                    <button className={cn("px-8 py-4 text-sm uppercase font-bold tracking-widest rounded-sm pointer-events-auto", btnSecondaryClass)}>
                      {slide.secondaryButtonText}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. FLOATING INSPECTOR PANEL */}
      <div 
        className={cn(
          "h-full bg-white border-l border-neutral-200 shadow-2xl flex flex-col z-50 transform transition-all duration-500 ease-in-out",
          isInspectorOpen ? "w-[400px] translate-x-0" : "w-0 translate-x-full overflow-hidden border-none"
        )}
      >
        
        <div className="p-6 border-b border-neutral-200 bg-neutral-50/50 min-w-[400px]">
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Inspector</h2>
          <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mt-1">Configure Slide Properties</p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          
          {/* TAB: MEDIA */}
          <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => setActiveTab(activeTab === "media" ? "content" : "media")}
              className="w-full px-5 py-4 flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold uppercase tracking-widest">Background Media</span>
              </div>
              {activeTab === "media" ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
            </button>
            
            {activeTab === "media" && (
              <div className="p-5 space-y-5 animate-in slide-in-from-top-2 duration-200">
                <div className="border-2 border-dashed border-neutral-200 rounded-xl p-6 text-center hover:border-accent hover:bg-neutral-50 transition-all relative cursor-pointer group">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*,video/mp4"
                    onChange={handleMediaUpload}
                  />
                  {isUploading ? (
                     <Loader2 className="w-8 h-8 animate-spin mx-auto text-accent" />
                  ) : slide.mediaUrl ? (
                    <div className="text-xs font-bold text-emerald-600 flex flex-col items-center gap-2">
                      <CheckCircle2 className="w-8 h-8" /> 
                      <span className="uppercase tracking-widest">Media Uploaded</span>
                      <span className="text-[9px] text-neutral-400 font-normal">Click to replace</span>
                    </div>
                  ) : (
                    <div className="text-xs text-neutral-500 flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <span className="uppercase tracking-widest font-bold text-[10px]">Upload Image or Video</span>
                      <span className="text-[9px] text-neutral-400">Max 50MB (MP4, JPG, PNG)</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-2 border-t border-neutral-100">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Overlay Opacity</label>
                    <span className="text-xs font-mono bg-neutral-100 px-2 py-1 rounded">{slide.overlayOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={slide.overlayOpacity}
                    onChange={(e) => setSlide({ ...slide, overlayOpacity: Number(e.target.value) })}
                    className="w-full accent-black"
                  />
                  <p className="text-[10px] text-neutral-400">Darken the image to make text readable.</p>
                </div>
              </div>
            )}
          </div>

          {/* TAB: CONTENT */}
          <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => setActiveTab(activeTab === "content" ? "layout" : "content")}
              className="w-full px-5 py-4 flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Type className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold uppercase tracking-widest">Typography</span>
              </div>
              {activeTab === "content" ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
            </button>
            
            {activeTab === "content" && (
              <div className="p-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Main Title</label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => setSlide({ ...slide, title: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-black rounded-xl outline-none text-sm transition-all"
                    placeholder="E.g., Sculpting"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Highlight Text (Italic)</label>
                  <input
                    type="text"
                    value={slide.highlight}
                    onChange={(e) => setSlide({ ...slide, highlight: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-black rounded-xl outline-none text-sm transition-all font-serif italic"
                    placeholder="E.g., Light."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Subtitle / Description</label>
                  <textarea
                    rows={4}
                    value={slide.subtitle}
                    onChange={(e) => setSlide({ ...slide, subtitle: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-black rounded-xl outline-none text-sm resize-none transition-all"
                    placeholder="We believe lighting is the jewelry of the home..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* TAB: LAYOUT */}
          <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => setActiveTab(activeTab === "layout" ? "actions" : "layout")}
              className="w-full px-5 py-4 flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Layout className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold uppercase tracking-widest">Layout & Theme</span>
              </div>
              {activeTab === "layout" ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
            </button>
            
            {activeTab === "layout" && (
              <div className="p-5 space-y-6 animate-in slide-in-from-top-2 duration-200">
                
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Text Color Theme</label>
                  <div className="flex gap-2 p-1 bg-neutral-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setSlide({ ...slide, theme: "light" })}
                      className={cn(
                        "flex-1 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex justify-center items-center gap-2 transition-all",
                        slide.theme === "light" ? "bg-white shadow text-black" : "text-neutral-500 hover:text-black"
                      )}
                    >
                      <Sun className="w-4 h-4" /> Light Text
                    </button>
                    <button
                      type="button"
                      onClick={() => setSlide({ ...slide, theme: "dark" })}
                      className={cn(
                        "flex-1 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex justify-center items-center gap-2 transition-all",
                        slide.theme === "dark" ? "bg-black shadow text-white" : "text-neutral-500 hover:text-black"
                      )}
                    >
                      <Moon className="w-4 h-4" /> Dark Text
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Canvas Position</label>
                  <div className="grid grid-cols-3 gap-2 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                    {(['top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right']).map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => setSlide({ ...slide, textPosition: pos as any })}
                        className={cn(
                          "aspect-video rounded-md border-2 transition-all flex items-center justify-center group",
                          slide.textPosition === pos 
                            ? "border-black bg-black/5" 
                            : "border-neutral-200 bg-white hover:border-neutral-400"
                        )}
                        title={pos.replace('-', ' ')}
                      >
                         <div className={cn(
                           "w-3 h-2 rounded-[2px]",
                           slide.textPosition === pos ? "bg-black" : "bg-neutral-300 group-hover:bg-neutral-400"
                         )} />
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-neutral-400 text-center">Select where the text block anchors on the screen.</p>
                </div>
              </div>
            )}
          </div>

          {/* TAB: ACTIONS */}
          <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => setActiveTab(activeTab === "actions" ? "media" : "actions")}
              className="w-full px-5 py-4 flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MousePointerClick className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold uppercase tracking-widest">Call to Action</span>
              </div>
              {activeTab === "actions" ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
            </button>
            
            {activeTab === "actions" && (
              <div className="p-5 space-y-6 animate-in slide-in-from-top-2 duration-200">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-100 pb-2">Primary Button</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Button Text</label>
                      <input
                        type="text"
                        value={slide.buttonText}
                        onChange={(e) => setSlide({ ...slide, buttonText: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-black rounded-xl outline-none text-sm transition-all"
                        placeholder="e.g. Shop Now"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Destination Link</label>
                      <input
                        type="text"
                        value={slide.buttonLink}
                        onChange={(e) => setSlide({ ...slide, buttonLink: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-black rounded-xl outline-none text-sm transition-all font-mono"
                        placeholder="/shop"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-100 pb-2">Secondary Button</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Button Text (Optional)</label>
                      <input
                        type="text"
                        value={slide.secondaryButtonText || ""}
                        onChange={(e) => setSlide({ ...slide, secondaryButtonText: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-black rounded-xl outline-none text-sm transition-all"
                        placeholder="e.g. Learn More"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Destination Link</label>
                      <input
                        type="text"
                        value={slide.secondaryButtonLink || ""}
                        onChange={(e) => setSlide({ ...slide, secondaryButtonLink: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-black rounded-xl outline-none text-sm transition-all font-mono"
                        placeholder="/about"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
