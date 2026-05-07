import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, CheckCircle2, Loader2, GripVertical, Eye, EyeOff, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import api from "../lib/api";
import { toast } from "sonner";
import ConfirmModal from "../components/ui/ConfirmModal";

interface PromoSlide {
  _id: string;
  title: string;
  subtitle: string;
  desktopImage: string;
  mobileImage: string;
  linkText: string;
  linkUrl: string;
  theme: "light" | "dark";
  align: "left" | "center" | "right";
  isActive: boolean;
  order: number;
}

export default function Promos() {
  const [slides, setSlides] = useState<PromoSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchSlides = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/promos");
      setSlides(response.data || []);
    } catch (error) {
      console.error("Failed to fetch promos:", error);
      toast.error("Failed to load promotional campaigns");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await api.put(`/promos/${id}`, { isActive: !currentStatus });
      toast.success(`Campaign ${!currentStatus ? "activated" : "deactivated"}`);
      fetchSlides();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await api.delete(`/promos/${deleteId}`);
      toast.success("Campaign deleted successfully");
      fetchSlides();
    } catch (error) {
      toast.error("Failed to delete campaign");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="space-y-8 animate-in fade-in duration-500 pb-12 transition-all">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-serif">Promotional Campaigns</h1>
            <p className="text-muted text-sm">Manage dynamic banners for desktop and mobile.</p>
          </div>
          <Link to="/storefront/promos/create" className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all">
            <Plus className="w-4 h-4" /> Add Campaign
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden min-h-[400px] flex flex-col">
          {isLoading ? (
             <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted p-12">
               <Loader2 className="w-8 h-8 animate-spin text-accent" />
             </div>
          ) : slides.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted p-12">
              <ImageIcon className="w-12 h-12 text-secondary" />
              <p className="font-bold uppercase tracking-widest text-sm">No campaigns configured</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-secondary/40 text-[10px] uppercase tracking-widest text-muted font-bold">
                <tr>
                  <th className="px-6 py-4">Campaign</th>
                  <th className="px-6 py-4">Images</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {slides.map(slide => (
                  <tr key={slide._id} className="hover:bg-secondary/10">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-primary">{slide.title}</p>
                      <p className="text-[10px] text-muted truncate max-w-[200px]">{slide.subtitle}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <img src={slide.desktopImage} className="w-16 h-10 object-cover rounded border" title="Desktop" />
                        <img src={slide.mobileImage} className="w-6 h-10 object-cover rounded border" title="Mobile" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleStatus(slide._id, slide.isActive)} className={cn("flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase", slide.isActive ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")}>
                        {slide.isActive ? <Eye className="w-3 h-3"/> : <EyeOff className="w-3 h-3"/>}
                        {slide.isActive ? "Active" : "Hidden"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button onClick={() => setDeleteId(slide._id)} className="p-2 text-muted hover:text-red-500 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Campaign?" message="Are you sure you want to delete this promotional campaign?" confirmLabel="Delete" isLoading={isDeleting} />
    </div>
  );
}
