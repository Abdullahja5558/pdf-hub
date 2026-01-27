"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Users, ShieldCheck, Zap, Star } from "lucide-react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// --- PDF STYLING ---
const styles = StyleSheet.create({
  page: { padding: 50, backgroundColor: "#ffffff" },
  mainHeading: { fontSize: 26, marginBottom: 15, color: "#7c3aed", fontWeight: "bold", textTransform: "uppercase" },
  subHeading: { fontSize: 16, marginTop: 15, marginBottom: 8, color: "#1a1a1a", fontWeight: "bold", borderBottom: 0.5, borderBottomColor: "#eee", paddingBottom: 2 },
  normalText: { fontSize: 12, lineHeight: 1.6, color: "#333333", marginBottom: 10 },
  listItem: { flexDirection: 'row', marginBottom: 5, paddingLeft: 10 },
  bullet: { width: 15, fontSize: 14, color: "#7c3aed" },
  listText: { fontSize: 12, color: "#333333" },
  footer: { position: "absolute", bottom: 30, left: 50, right: 50, fontSize: 10, borderTop: 1, borderTopColor: "#eee", paddingTop: 10, color: "#999", textAlign: "center" }
});

// --- AUTO-FORMATTER LOGIC ---
const SmartPDFContent = ({ text }: { text: string }) => {
  const lines = text.split('\n').filter(line => line.trim() !== "");
  
  return (
    <View>
      {lines.map((line, index) => {
        const trimmedLine = line.trim();

        // 1. Pehli line hamesha Main Heading hogi
        if (index === 0) {
          return <Text key={index} style={styles.mainHeading}>{trimmedLine}</Text>;
        }

        // 2. Agar line choti hai (headings jaisi), to isay Bold Sub-heading bana do
        if (trimmedLine.length < 40 && !trimmedLine.endsWith('.') && !trimmedLine.includes(':')) {
          return <Text key={index} style={styles.subHeading}>{trimmedLine}</Text>;
        }

        // 3. Agar line points jaisi hai ya short sentence hai, to Bullet/Dot laga do
        if (trimmedLine.length < 100 && (trimmedLine.startsWith('*') || trimmedLine.length < 50)) {
          return (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>{trimmedLine.replace(/^[*-]\s*/, '')}</Text>
            </View>
          );
        }

        // 4. Default Normal Paragraph
        return <Text key={index} style={styles.normalText}>{trimmedLine}</Text>;
      })}
    </View>
  );
};

const MyPDF = ({ content }: { content: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <SmartPDFContent text={content || "No content provided."} />
      <Text style={styles.footer}>Produced by Ultra PDF Generator - Professional Quality</Text>
    </Page>
  </Document>
);

const Hero = () => {
  const [text, setText] = useState("");

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#0c070f] min-h-screen flex flex-col items-center"
    id="/">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-purple-600/10 blur-[120px] rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
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
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-4xl shadow-2xl mb-16"
        >
          <div className="space-y-4">
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type anything... I will automatically add headings and dots for you!"
              className="w-full h-48 bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none text-left"
            />
            
            <PDFDownloadLink
              document={<MyPDF content={text} />}
              fileName="Ultra_Document.pdf"
              className="w-full"
            >
              {/* @ts-ignore */}
              {({ loading }) => (
                <button className="w-full py-4 px-6 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                  {loading ? "Processing..." : <><Download size={20} /> Download Ultra PDF</>}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        </motion.div>

        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          Experience the next generation of PDF creation. High-resolution typography, 
          automatic formatting, and instant downloads.
        </p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-12 py-8 border-t border-white/10 w-full"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white tracking-tight">10M+</span>
            <span className="text-gray-500 text-sm flex items-center gap-1">
               <Users size={16} className="text-purple-500" /> Active Users
            </span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white tracking-tight">Vector</span>
            <span className="text-gray-500 text-sm flex items-center gap-1">
               <Zap size={16} className="text-purple-500" /> Max Quality
            </span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white tracking-tight">Free</span>
            <span className="text-gray-500 text-sm flex items-center gap-1">
               <ShieldCheck size={16} className="text-purple-500" /> No Limits
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;