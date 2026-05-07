import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  X,
  AlignLeft,
  AlignCenter,
  AlignRight,
  EyeOff,
  Video,
  GripVertical,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import api from "../lib/api";
import { API_ENDPOINTS } from "../config/endpoints";
import { toast } from "sonner";
import ConfirmModal from "../components/ui/ConfirmModal";

interface HeroSlide {
  _id: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  buttonText: string;
  buttonLink: string;
  textPosition: "left" | "center" | "right";
  isActive: boolean;
  order: number;
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Drag and Drop state
  const [draggedSlideId, setDraggedSlideId] = useState<string | null>(null);
  const [dragOverSlideId, setDragOverSlideId] = useState<string | null>(null);

  const [newSlide, setNewSlide] = useState<Partial<HeroSlide>>({
    title: "",
    highlight: "",
    subtitle: "",
    mediaUrl: "",
    mediaType: "image",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    textPosition: "left",
    isActive: true,
  });

  const fetchSlides = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(API_ENDPOINTS.HERO.BASE);
      setSlides(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch slides:", error);
      toast.error("Failed to load hero slides");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlide.title || !newSlide.mediaUrl) {
      toast.error("Title and Media are required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingSlide) {
        await api.put(
          `${API_ENDPOINTS.HERO.BASE}/${editingSlide._id}`,
          newSlide,
        );
        toast.success("Slide updated successfully");
      } else {
        await api.post(API_ENDPOINTS.HERO.BASE, newSlide);
        toast.success("Slide created successfully");
      }

      fetchSlides();
      resetSidebar();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to process slide";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setNewSlide({ ...slide });
    setIsSidebarOpen(true);
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file); // The backend upload route accepts 'image' for videos too if it's generic

    try {
      const response = await api.post(API_ENDPOINTS.UPLOAD, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = response.data.url;
      const type = file.type.startsWith("video/") ? "video" : "image";

      setNewSlide((prev) => ({ ...prev, mediaUrl: url, mediaType: type }));
      toast.success("Media uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload media");
    } finally {
      setIsUploading(false);
    }
  };

  const resetSidebar = () => {
    setIsSidebarOpen(false);
    setEditingSlide(null);
    setNewSlide({
      title: "",
      highlight: "",
      subtitle: "",
      mediaUrl: "",
      mediaType: "image",
      buttonText: "Shop Now",
      buttonLink: "/shop",
      textPosition: "left",
      isActive: true,
    });
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await api.put(`${API_ENDPOINTS.HERO.BASE}/${id}`, {
        isActive: !currentStatus,
      });
      toast.success(`Slide ${!currentStatus ? "activated" : "deactivated"}`);
      fetchSlides();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedSlideId(id);
    // Required for Firefox
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (id !== dragOverSlideId) {
      setDragOverSlideId(id);
    }
  };

  const handleDrop = async (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOverSlideId(null);

    if (!draggedSlideId || draggedSlideId === targetId) {
      setDraggedSlideId(null);
      return;
    }

    const draggedIndex = slides.findIndex((s) => s._id === draggedSlideId);
    const targetIndex = slides.findIndex((s) => s._id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Reorder array
    const newSlides = [...slides];
    const [draggedItem] = newSlides.splice(draggedIndex, 1);
    newSlides.splice(targetIndex, 0, draggedItem);

    setSlides(newSlides);
    setDraggedSlideId(null);

    try {
      const orderedIds = newSlides.map((s) => s._id);
      await api.post(`${API_ENDPOINTS.HERO.BASE}/reorder`, { orderedIds });
      toast.success("Slides reordered");
    } catch (error) {
      toast.error("Failed to reorder slides");
      fetchSlides(); // Revert on failure
    }
  };

  const handleDragEnd = () => {
    setDraggedSlideId(null);
    setDragOverSlideId(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    const promise = api.delete(`${API_ENDPOINTS.HERO.BASE}/${deleteId}`);

    toast.promise(promise, {
      loading: "Removing slide...",
      success: () => {
        fetchSlides();
        setDeleteId(null);
        return "Slide removed successfully";
      },
      error: "Failed to remove slide",
    });

    try {
      await promise;
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div
        className={cn(
          "space-y-8 animate-in fade-in duration-500 pb-12 transition-all",
          isSidebarOpen ? "pr-[400px] blur-[2px] pointer-events-none" : "",
        )}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-serif">
              Hero Slider Config
            </h1>
            <p className="text-muted text-sm">
              Manage your landing page hero banners and videos.
            </p>
          </div>
          <Link
            to="/storefront/hero/create"
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" /> Add Slide
          </Link>
        </div>

        {/* Slides Table */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden min-h-[400px] flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted p-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : slides.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted p-12">
              <ImageIcon className="w-12 h-12 text-secondary" />
              <p className="font-bold uppercase tracking-widest text-sm">
                No slides configured
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary/40 text-[10px] uppercase tracking-widest text-muted font-bold">
                  <tr>
                    <th className="px-4 py-4 w-10"></th>
                    <th className="px-6 py-4">Media</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Position</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {slides.map((slide) => (
                    <tr
                      key={slide._id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, slide._id)}
                      onDragOver={(e) => handleDragOver(e, slide._id)}
                      onDrop={(e) => handleDrop(e, slide._id)}
                      onDragEnd={handleDragEnd}
                      className={cn(
                        "group transition-all",
                        draggedSlideId === slide._id
                          ? "opacity-50 bg-secondary"
                          : "hover:bg-secondary/10",
                        dragOverSlideId === slide._id
                          ? "border-t-2 border-t-primary"
                          : "",
                      )}
                    >
                      <td className="px-4 py-4 cursor-grab active:cursor-grabbing text-muted hover:text-foreground">
                        <GripVertical className="w-4 h-4" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-20 h-12 bg-secondary rounded-lg overflow-hidden relative border border-border">
                          {slide.mediaType === "video" ? (
                            <Video className="w-5 h-5 absolute inset-0 m-auto text-primary" />
                          ) : (
                            <img
                              src={slide.mediaUrl}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-primary">
                          {slide.title}
                        </p>
                        <p className="text-[10px] text-muted truncate max-w-[200px]">
                          {slide.subtitle}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-muted border border-border px-2 py-1 rounded-md">
                          {slide.textPosition}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            toggleStatus(slide._id, slide.isActive)
                          }
                          className={cn(
                            "flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all",
                            slide.isActive
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              : "bg-amber-50 text-amber-600 border border-amber-100",
                          )}
                        >
                          {slide.isActive ? (
                            <Eye className="w-3 h-3" />
                          ) : (
                            <EyeOff className="w-3 h-3" />
                          )}
                          {slide.isActive ? "Active" : "Hidden"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/storefront/hero/edit/${slide._id}`}
                            className="p-2 hover:bg-white text-muted hover:text-accent rounded-lg border border-transparent transition-all"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteId(slide._id)}
                            className="p-2 hover:bg-white text-muted hover:text-red-500 rounded-lg border border-transparent transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Slide?"
        message="Are you sure you want to permanently delete this hero slide?"
        confirmLabel="Delete"
        isLoading={isDeleting}
      />
    </div>
  );
}
