import React, { useState, useRef } from "react";
import {
  Upload,
  X,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Download,
} from "lucide-react";

import api from "../../lib/api";

import { API_ENDPOINTS } from "../../config/endpoints";
import { toast } from "sonner";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ImportResult {
  message: string;
  summary: {
    total: number;
    success: number;
    failed: number;
  };
  errors: { row: number; name: string; message: string; originalData: any }[];
}

export default function ImportModal({
  isOpen,
  onClose,
  onSuccess,
}: ImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(
        `${API_ENDPOINTS.PRODUCTS.BASE}/import`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setResult(response.data);
      if (response.data.summary.success > 0) {
        onSuccess();
        toast.success(`Imported ${response.data.summary.success} products!`);
      }
    } catch (error: any) {
      console.error("Import failed:", error);
      toast.error(error.response?.data?.message || "Failed to import products");
    } finally {
      setIsUploading(false);
    }
  };

  const downloadErrorReport = () => {
    if (!result || result.errors.length === 0) return;

    // 1. Get all unique headers from originalData of all errors
    const headers = new Set<string>();
    result.errors.forEach((err) => {
      Object.keys(err.originalData).forEach((key) => headers.add(key));
    });
    const headerArray = Array.from(headers);
    headerArray.push("Error Reason");

    // 2. Generate CSV rows
    const csvRows = [
      headerArray.join(","), // Header row
      ...result.errors.map((err) => {
        const rowData = headerArray.map((header) => {
          if (header === "Error Reason")
            return `"${err.message.replace(/"/g, '""')}"`;
          const val = err.originalData[header] || "";
          return `"${val.toString().replace(/"/g, '""')}"`;
        });
        return rowData.join(",");
      }),
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `import_errors_${new Date().getTime()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetModal = () => {
    setFile(null);
    setResult(null);
    setIsUploading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={resetModal}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        {/* Header */}
        <div className="p-6 border-b border-border flex justify-between items-center bg-secondary/20">
          <div>
            <h2 className="text-xl font-bold font-serif">
              Bulk Product Import
            </h2>
            <p className="text-xs text-muted font-medium mt-1 uppercase tracking-widest">
              Upload Excel or CSV file
            </p>
          </div>
          <button
            onClick={resetModal}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!result ? (
            <>
              {/* Upload Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
                  file
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/40 hover:bg-secondary/50"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".xlsx, .xls, .csv"
                  className="hidden"
                />

                {file ? (
                  <FileText className="w-12 h-12 text-accent" />
                ) : (
                  <Upload className="w-12 h-12 text-muted/40" />
                )}

                <div className="text-center">
                  <p className="text-sm font-bold text-primary">
                    {file ? file.name : "Click to select or drag & drop"}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    Accepts .xlsx, .xls, or .csv up to 10MB
                  </p>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-secondary/30 rounded-xl p-4 border border-border">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                  Import Requirements
                </h4>
                <ul className="text-xs space-y-2 text-muted">
                  <li className="flex gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    Columns must include: <b>Name, Price, Category, Slug</b>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    Invalid rows with empty required fields will be skipped.
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={resetModal}
                  className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-bold uppercase tracking-widest text-muted hover:bg-secondary transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="flex-[2] flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    "Upload and Process"
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Result View */
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border">
                <div
                  className={`p-3 rounded-full ${result.summary.failed > 0 ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"}`}
                >
                  {result.summary.failed > 0 ? (
                    <AlertCircle className="w-6 h-6" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-primary">Import Complete</h3>
                  <p className="text-xs text-muted">
                    {result.summary.success} succeeded, {result.summary.failed}{" "}
                    failed.
                  </p>
                </div>
              </div>

              {result.errors.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                      Issues Found in File
                    </h4>
                    <button
                      onClick={downloadErrorReport}
                      className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-accent hover:underline decoration-accent/30 underline-offset-4"
                    >
                      <Download className="w-3 h-3" />
                      Download Error Report
                    </button>
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                    {result.errors.map((err, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100 text-xs text-red-700"
                      >
                        <span className="font-bold flex-shrink-0 text-[10px] bg-red-200 text-red-800 px-1.5 py-0.5 rounded">
                          Row {err.row}
                        </span>
                        <div>
                          <p className="font-bold truncate max-w-[200px]">
                            {err.name}
                          </p>
                          <p className="text-red-500 mt-0.5 text-[10px]">
                            {err.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted italic text-center">
                    Invalid rows were skipped. Fix the errors above and
                    re-upload if needed.
                  </p>
                </div>
              )}

              <button
                onClick={resetModal}
                className="w-full bg-primary text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all"
              >
                Close and Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
