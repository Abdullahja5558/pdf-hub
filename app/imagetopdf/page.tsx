"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileCheck, Image as ImageIcon, Trash2, ArrowRight } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageHowItWorks from "@/components/ImageHowItWorks";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

export default function ImageToPdfPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substring(2, 11),
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
  
      const removed = prev.find(img => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      const pdfDoc = await PDFDocument.create();
      for (const imgFile of images) {
        const arrayBuffer = await imgFile.file.arrayBuffer();
        let image;
        if (imgFile.file.type === "image/png") {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          image = await pdfDoc.embedJpg(arrayBuffer);
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Ultra_Image_Export_${Date.now()}.pdf`;
      link.click();
    } catch (error) {
      console.error("PDF Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="bg-[#0c070f] min-h-screen text-white">
      {/* 1. Header is included here */}
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Section Heading */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-4"
            >
              <ImageIcon size={14} /> IMAGE TO PDF CONVERTER
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Premium <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">Visual Export</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Upload multiple images and convert them into a single, high-definition PDF document instantly.
            </p>
          </div>

          {/* 2. Drag & Drop Zone */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => fileInputRef.current?.click()}
            className="relative border-2 border-dashed border-white/10 bg-white/5 rounded-[40px] p-16 text-center cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-b from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
            />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-purple-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform">
                <Upload className="text-purple-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Drop your images here</h3>
              <p className="text-gray-500">Supports High-Resolution PNG, JPG & WebP</p>
            </div>
          </motion.div>

          {/* 3. Image Grid / Preview */}
          <AnimatePresence>
            {images.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-12 p-8 bg-white/5 border border-white/10 rounded-4xl"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    Selected Files <span className="px-2 py-0.5 bg-purple-600 rounded-md text-xs">{images.length}</span>
                  </h3>
                  <button 
                    onClick={() => setImages([])}
                    className="text-xs text-gray-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={14} /> Clear All
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((img) => (
                    <motion.div 
                      layout
                      key={img.id}
                      className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40 group"
                    >
                      <img src={img.preview} alt="preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                          className="p-2 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-all"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* 4. The Action Button */}
                <div className="mt-10 pt-8 border-t border-white/10 flex justify-center">
                  <button
                    onClick={generatePdf}
                    disabled={isGenerating}
                    className="group relative px-12 py-5 bg-purple-600 rounded-2xl text-white font-black flex items-center gap-3 overflow-hidden transition-all hover:bg-purple-500 active:scale-95 disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    {isGenerating ? (
                      "Generating Ultra PDF..."
                    ) : (
                      <> <FileCheck size={24} /> Export to PDF <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <ImageHowItWorks />
      <Footer />
    </main>
  );
}