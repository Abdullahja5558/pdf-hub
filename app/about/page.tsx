"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Zap, Globe, Users, Trophy, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import Footer from "@/components/Footer";

const stats = [
  { label: "Active Users", value: "10M+", icon: <Users size={20} /> },
  { label: "Files Processed", value: "30M+", icon: <Zap size={20} /> },
  { label: "Countries", value: "120+", icon: <Globe size={20} /> },
  { label: "Satisfaction", value: "99.9%", icon: <Trophy size={20} /> },
];

const AboutPage = () => {
  const router = useRouter();

  return (
    <main className="bg-[#0c070f] min-h-screen text-white overflow-hidden">
      

      {/* --- PREMIUM BACK BUTTON --- */}
      <div className="pt-10">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
        onClick={() => router.back()}
        className=" top-28 left-8 z-50 hidden lg:flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-gray-400 hover:text-white hover:border-purple-500/50 transition-all group shadow-2xl"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-black uppercase tracking-[0.2em]">Return</span>
      </motion.button>
      </div>

      {/* Hero Section */}
      <section className=" pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-150 bg-purple-600/10 blur-[130px] rounded-full opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-linear-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black tracking-[0.3em] uppercase mb-10"
          >
            <Star size={12} fill="currentColor" /> PDFHub Legacy
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-black mb-10 tracking-tighter leading-none"
          >
            Power of<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-fuchsia-500 to-indigo-500">PDFHUB</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            PDFHub is a star-rated ecosystem designed for high-velocity teams and 
            creative individuals who refuse to compromise on quality.
          </motion.p>
        </div>
      </section>

      {/* Stats Section with Glassmorphism */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-purple-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-10 rounded-[40px] bg-white/2 border border-white/5 text-center hover:border-purple-500/30 transition-all overflow-hidden"
              >
                <div className="text-purple-500 mb-4 flex justify-center">{stat.icon}</div>
                <h2 className="text-4xl font-black mb-2 tracking-tighter">{stat.value}</h2>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{stat.label}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-40 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
           <div className="relative">
             <div className="absolute -inset-4 bg-linear-to-tr from-purple-600 to-blue-600 rounded-[50px] blur-2xl opacity-10 animate-pulse" />
             <div className="relative aspect-video rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center">
                <Star size={80} className="text-white/10" fill="currentColor" />
             </div>
           </div>
           
           <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black italic">The <span className="text-purple-500 tracking-widest">Star</span> Experience</h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                Our users are at the center of everything. We use 256-bit encryption to ensure 
                that your data remains yours. PDFHub doesn't just process files; it protects 
                your digital legacy with every merge, split, and scan.
              </p>
              <div className="flex gap-4">
                 {[1,2,3,4,5].map(s => <Star key={s} size={18} className="text-purple-500" fill="currentColor" />)}
                 <span className="text-xs font-bold text-gray-600 ml-2 uppercase self-center tracking-widest">Global Trust</span>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;