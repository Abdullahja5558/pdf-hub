"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileStack, 
  Scissors, 
  Upload, 
  X, 
  GripVertical, 
  Download, 
  Plus,
  Trash2,
  FileText,
  Merge
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import MergeHowItWorks from "@/components/MergeHowItWorks";

interface PDFFile {
  id: string;
  file: File;
  name: string;
  size: string;
}

const PDFMergeSplit = () => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<"merge" | "split">("merge");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const mergePDFs = async () => {
    if (files.length < 2) return alert("Please upload at least 2 PDFs to merge.");
    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const fileObj of files) {
        const arrayBuffer = await fileObj.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const pdfBytes = await mergedPdf.save();
      downloadFile(pdfBytes, "Merged_Document.pdf");
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const splitPDF = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const fileObj = files[0]; 
      const arrayBuffer = await fileObj.file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      
      const newPdf = await PDFDocument.create();
      const [firstPage] = await newPdf.copyPages(pdf, [0]);
      newPdf.addPage(firstPage);
      
      const pdfBytes = await newPdf.save();
      downloadFile(pdfBytes, `Split_Page_1_${fileObj.name}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (bytes: Uint8Array, fileName: string) => {
    const blob = new Blob([bytes as any], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <main className="bg-[#0c070f] min-h-screen text-white">
      <Header />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Manage Your <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500">Structure</span>
            </h1>
            
            {/* Mode Switcher */}
            <div className="flex justify-center mt-8">
              <div className="bg-white/5 p-1 rounded-2xl border border-white/10 flex items-center">
                <button 
                  onClick={() => setMode("merge")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === "merge" ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20" : "text-gray-400 hover:text-white"}`}
                >
                  <FileStack size={18} /> Merge
                </button>
                <button 
                  onClick={() => setMode("split")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === "split" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-gray-400 hover:text-white"}`}
                >
                  <Scissors size={18} /> Split
                </button>
              </div>
            </div>
          </div>

          {/* Upload Area */}
          <motion.div 
            whileHover={{ scale: 1.005 }}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/10 bg-white/5 rounded-[40px] p-16 text-center cursor-pointer hover:border-purple-500/50 transition-all group"
          >
            <input type="file" multiple accept=".pdf" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/20 transition-all">
              <Plus className="text-purple-400" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Click to Upload PDFs</h3>
            <p className="text-gray-500 text-sm">Select multiple files to combine or one to divide.</p>
          </motion.div>

          {/* File List */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 space-y-3"
              >
                {files.map((file, index) => (
                  <motion.div 
                    layout
                    key={file.id}
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/8 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-200">{file.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{file.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <GripVertical size={18} className="text-gray-700 cursor-grab" />
                      <button 
                        onClick={() => removeFile(file.id)}
                        className="p-2 hover:bg-red-500/20 text-gray-500 hover:text-red-500 rounded-xl transition-all"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* Processing Button */}
                <div className="pt-10 flex justify-center">
                  <button
                    onClick={mode === "merge" ? mergePDFs : splitPDF}
                    disabled={isProcessing}
                    className={`px-12 py-4 rounded-2xl text-white font-black flex items-center gap-3 shadow-2xl transition-all active:scale-95 disabled:opacity-50
                      ${mode === "merge" ? "bg-purple-600 hover:bg-purple-500" : "bg-blue-600 hover:bg-blue-50"}
                    `}
                  >
                    {isProcessing ? "Processing..." : (
                      <>
                        <Download size={20} /> 
                        {mode === "merge" ? `Merge ${files.length} Files` : "Split Document"}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <MergeHowItWorks />

      <Footer />
    </main>
  );
};

export default PDFMergeSplit;