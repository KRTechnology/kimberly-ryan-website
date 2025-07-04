"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Calendar, Tag, X } from "lucide-react";
import Image from "next/image";
import { Brochure } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/common/dialog";

interface BrochureDownloadModalProps {
  brochures: Brochure[];
  isOpen: boolean;
  onClose: () => void;
}

const BrochureDownloadModal = ({
  brochures,
  isOpen,
  onClose,
}: BrochureDownloadModalProps) => {
  // Handle PDF download for a specific brochure
  const handlePdfDownload = (brochure: Brochure) => {
    if (!brochure?.pdfFile?.asset?.url) {
      alert("Brochure file is not available for download.");
      return;
    }

    const pdfUrl = brochure.pdfFile.asset.url;

    try {
      // Try to open PDF in new tab
      const newWindow = window.open(pdfUrl, "_blank");

      // Fallback: If popup is blocked, try direct download
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        // Create a temporary download link
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download =
          brochure.pdfFile.asset.originalFilename ||
          `${brochure.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}-${brochure.year}-brochure.pdf`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading brochure:", error);
      alert("There was an error downloading the brochure. Please try again.");
    }
  };

  // Format file size
  const formatFileSize = (sizeInMB?: number) => {
    if (!sizeInMB) return "Size not available";
    if (sizeInMB < 1) {
      return `${Math.round(sizeInMB * 1024)} KB`;
    }
    return `${sizeInMB.toFixed(1)} MB`;
  };

  // Format category for display
  const formatCategory = (category: string) => {
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" & ");
  };

  if (!brochures || brochures.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full mx-4 p-0 overflow-hidden bg-white border-0 shadow-2xl max-h-[80vh]">
        <DialogHeader className="sr-only">
          <DialogTitle>Download Training Brochures</DialogTitle>
          <DialogDescription>
            {brochures.length} brochure{brochures.length !== 1 ? "s" : ""} available for download
          </DialogDescription>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative h-full flex flex-col"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-br from-sunset-100 to-sunset-200 p-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-600 font-plex">
                Download Training Brochures
              </h2>
              <p className="text-sm text-slate-500 font-inter mt-1">
                {brochures.length} brochure{brochures.length !== 1 ? "s" : ""}{" "}
                available
              </p>
            </div>
          </div>

          {/* Scrollable Brochure List */}
          <div className="relative">
            <div className="overflow-y-auto p-6 space-y-4 max-h-[400px]">
              {brochures.map((brochure, index) => (
              <motion.div
                key={brochure._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex gap-4 p-4">
                  {/* Brochure Image/Icon */}
                  <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-sunset-50 to-sunset-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {brochure.coverImage ? (
                      <Image
                        src={urlFor(brochure.coverImage)
                          .width(64)
                          .height(64)
                          .url()}
                        alt={brochure.title}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <FileText className="w-6 h-6 text-sunset-300" />
                    )}
                  </div>

                  {/* Brochure Details */}
                  <div className="flex-1 min-w-0">
                    {/* Title and Badges */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-sunset-50 text-sunset-600 rounded-full font-medium">
                          {formatCategory(brochure.category)}
                        </span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">
                          {brochure.year}
                        </span>
                      </div>

                      <h3 className="font-semibold text-slate-700 font-plex leading-tight text-sm">
                        {brochure.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed font-inter line-clamp-2">
                        {brochure.description}
                      </p>
                    </div>

                    {/* File Info */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>PDF</span>
                      </div>

                      {brochure.fileSize && (
                        <div className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          <span>{formatFileSize(brochure.fileSize)}</span>
                        </div>
                      )}

                      {brochure.pageCount && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{brochure.pageCount} pages</span>
                        </div>
                      )}

                      {brochure.tags && brochure.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span>{brochure.tags[0]}</span>
                        </div>
                      )}
                    </div>

                    {/* Download Button */}
                    <motion.button
                      onClick={() => handlePdfDownload(brochure)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-sunset-200 text-white rounded-md hover:bg-sunset-300 transition-colors duration-300 font-medium text-sm shadow-sm hover:shadow-md"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
            {/* Scroll indicator gradient */}
            {brochures.length > 2 && (
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}
          </div>

          {/* Footer */}
          <div className="p-6 pt-0">
            <p className="text-xs text-slate-400 text-center font-inter">
              By downloading, you agree to receive updates about our training
              programs.
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default BrochureDownloadModal;
