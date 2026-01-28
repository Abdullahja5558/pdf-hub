"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Users, ShieldCheck, Zap, Star } from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const Hero = () => {
  const [text, setText] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cleanText = (str: string) => str.replace(/[^\x00-\x7F]/g, "");

  const handleDownload = async () => {
    if (!text.trim()) return;
    setIsGenerating(true);

    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      const setupPage = (doc: PDFDocument) => {
        const p = doc.addPage([595.28, 841.89]);
        const { width, height } = p.getSize();
        
      
        p.drawLine({
          start: { x: 50, y: height - 40 },
          end: { x: width - 50, y: height - 40 },
          thickness: 0.5,
          color: rgb(0.8, 0.8, 0.8),
        });
        
        return p;
      };

      let page = setupPage(pdfDoc);
      const { width, height } = page.getSize();
      let currentY = height - 100;
      const margin = 75; // Luxurious wide margins
      const maxWidth = width - (margin * 2);

      const lines = text.split('\n').filter(l => l.trim() !== "");
      const dateString = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
      });

      lines.forEach((line, index) => {
        const safeLine = cleanText(line.trim());
        if (!safeLine) return;

        const isMainTitle = index === 0;
        const isBullet = safeLine.startsWith('*') || safeLine.startsWith('-') || safeLine.startsWith('•');
        const isSubHeading = !isBullet && (safeLine.length < 50 && (safeLine.endsWith(':') || !safeLine.endsWith('.')));

        if (currentY < 120) {
          page = setupPage(pdfDoc);
          currentY = height - 100;
        }

        if (isMainTitle) {
          // Date Stamp (Top Right)
          page.drawText(dateString, {
            x: width - margin - 80, y: height - 60, size: 8, font: font, color: rgb(0.5, 0.5, 0.5)
          });

          // Main Title - Spaced and Bold
          page.drawText(safeLine.toUpperCase(), {
            x: margin, y: currentY, size: 22, font: boldFont, color: rgb(0, 0, 0),
          });
          currentY -= 15;
          page.drawRectangle({ x: margin, y: currentY, width: 30, height: 2, color: rgb(0, 0, 0) });
          currentY -= 50;
        } 
        else if (isSubHeading) {
          currentY -= 15;
          page.drawText(safeLine, {
            x: margin, y: currentY, size: 12, font: boldFont, color: rgb(0.1, 0.1, 0.1)
          });
          currentY -= 22;
        } 
        else if (isBullet) {
          const bulletContent = safeLine.replace(/^[*-•]\s*/, '');
          // Minimalist Square Bullet
          page.drawRectangle({ x: margin + 2, y: currentY + 4, width: 3, height: 3, color: rgb(0.4, 0.4, 0.4) });
          
          page.drawText(bulletContent, {
            x: margin + 20, y: currentY, size: 10, font: font, color: rgb(0.2, 0.2, 0.2), 
            maxWidth: maxWidth - 20, lineHeight: 16
          });
          const lc = Math.ceil(bulletContent.length / 85);
          currentY -= (lc * 16) + 12;
        } 
        else {
          page.drawText(safeLine, {
            x: margin, y: currentY, size: 10, font: font, color: rgb(0.3, 0.3, 0.3), 
            maxWidth: maxWidth, lineHeight: 17
          });
          const lc = Math.ceil(safeLine.length / 95);
          currentY -= (lc * 17) + 15;
        }
      });

      // Finalize Footer for all pages
      const pages = pdfDoc.getPages();
      pages.forEach((p, i) => {
        p.drawLine({
          start: { x: 50, y: 50 },
          end: { x: width - 50, y: 50 },
          thickness: 0.5,
          color: rgb(0.8, 0.8, 0.8),
        });
        p.drawText(`OFFICIAL DOCUMENT  |  PAGE ${i + 1}`, {
          x: margin, y: 35, size: 7, font: font, color: rgb(0.6, 0.6, 0.6)
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Executive_Ultra_Document.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!mounted) return null;

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#0c070f] min-h-screen flex flex-col items-center" id="/">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-purple-600/10 blur-[120px] rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-6">
            <Star size={14} fill="currentColor" /> 100% FREE & SECURE
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Convert Text to <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">Ultra PDF</span>
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-4xl shadow-2xl mb-16"
        >
          <div className="space-y-4">
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="First line is Title. Short lines are Headings. Use * for Bullets."
              className="w-full h-48 bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none text-left"
            />
            
            <button 
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full py-4 px-6 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? "Processing..." : <><Download size={20} /> Download Ultra PDF</>}
            </button>
          </div>
        </motion.div>

        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          High-resolution Executive Typography. Automatic formatting with frame borders 
          and pagination.
        </p>
        
        <div className="flex flex-wrap justify-center gap-12 py-8 border-t border-white/10 w-full opacity-50">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white tracking-tight">10M+</span>
            <span className="text-gray-500 text-sm flex items-center gap-1"><Users size={16} /> Users</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white tracking-tight">Vector</span>
            <span className="text-gray-500 text-sm flex items-center gap-1"><Zap size={16} /> Quality</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white tracking-tight">Free</span>
            <span className="text-gray-500 text-sm flex items-center gap-1"><ShieldCheck size={16} /> Limits</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;