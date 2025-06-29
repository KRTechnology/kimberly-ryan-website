"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  User,
  Tag,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Event } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

interface EventImagesProps {
  event: Event;
}

export default function EventImages({ event }: EventImagesProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format category for display
  const formatCategory = (category: string) => {
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get cover image or first image
  const getCoverImage = () => {
    return event.coverImage || event.images[0];
  };

  // Handle lightbox navigation
  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0
          ? event.images.length - 1
          : selectedImageIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === event.images.length - 1
          ? 0
          : selectedImageIndex + 1
      );
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sunset-50 to-amberwood-50 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/about/gallery"
              className="inline-flex items-center gap-2 text-sunset-600 hover:text-sunset-700 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Gallery</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Category */}
              {event.category && (
                <span className="inline-block text-sm font-semibold text-sunset-600 bg-sunset-100 px-3 py-1 rounded-full">
                  {formatCategory(event.category)}
                </span>
              )}

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold font-plex text-slate-600 leading-tight">
                {event.name}
              </h1>

              {/* Description */}
              {event.description && (
                <p className="text-lg text-slate-500 leading-relaxed">
                  {event.description}
                </p>
              )}

              {/* Event Details */}
              <div className="space-y-3">
                {event.eventDate && (
                  <div className="flex items-center gap-3 text-slate-500">
                    <Calendar size={18} className="text-sunset-500" />
                    <span>{formatDate(event.eventDate)}</span>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-center gap-3 text-slate-500">
                    <MapPin size={18} className="text-sunset-500" />
                    <span>{event.location}</span>
                  </div>
                )}

                {event.attendees && (
                  <div className="flex items-center gap-3 text-slate-500">
                    <Users size={18} className="text-sunset-500" />
                    <span>{event.attendees} attendees</span>
                  </div>
                )}

                {event.organizer && (
                  <div className="flex items-center gap-3 text-slate-500">
                    <User size={18} className="text-sunset-500" />
                    <span>Organized by {event.organizer}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={16} className="text-sunset-500" />
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm text-slate-500 bg-white px-2 py-1 rounded border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Image Count */}
              <div className="text-sm text-slate-500">
                {event.images.length}{" "}
                {event.images.length === 1 ? "photo" : "photos"}
              </div>
            </motion.div>

            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={urlFor(getCoverImage()).width(600).height(450).url()}
                  alt={getCoverImage().alt || event.name}
                  fill
                  className="object-cover"
                  priority
                />
                {event.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-sunset-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Featured Event
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Images Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {event.images.map((image, index) => (
              <motion.div
                key={image._key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImageIndex(index)}
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300">
                  <Image
                    src={urlFor(image).width(400).height(400).url()}
                    alt={image.alt || `${event.name} - Image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                  {/* Caption overlay */}
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-medium">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X size={32} />
            </button>

            {/* Navigation Buttons */}
            {event.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <ChevronLeft size={48} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <ChevronRight size={48} />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={urlFor(event.images[selectedImageIndex])
                  .width(1200)
                  .height(800)
                  .url()}
                alt={
                  event.images[selectedImageIndex].alt ||
                  `${event.name} - Image ${selectedImageIndex + 1}`
                }
                fill
                className="object-contain"
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  {event.images[selectedImageIndex].caption && (
                    <p className="font-medium mb-2">
                      {event.images[selectedImageIndex].caption}
                    </p>
                  )}
                  <p className="text-sm text-gray-300">
                    {selectedImageIndex + 1} of {event.images.length}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
