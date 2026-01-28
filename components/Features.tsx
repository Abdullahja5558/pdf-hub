"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, Cpu, Award, Lock } from "lucide-react";

const features = [
  {
    title: "Ultra-Fast Processing",
    description: "Generate complex PDFs in milliseconds. Our client-side engine ensures zero waiting time.",
    icon: <Zap className="text-yellow-400" />,
    color: "from-yellow-500/20 to-transparent",
  },
  {
    title: "Bank-Grade Security",
    description: "Your files never touch our servers. All processing happens locally in your browser for total privacy.",
    icon: <ShieldCheck className="text-green-400" />,
    color: "from-green-500/20 to-transparent",
  },
  {
    title: "Vector Quality",
    description: "Our 'Ultra' engine ensures every PDF is export-ready with 4K typography and sharp graphics.",
    icon: <Award className="text-purple-400" />,
    color: "from-purple-500/20 to-transparent",
  },
  {
    title: "No Account Needed",
    description: "Skip the sign-up. Access all premium tools immediately without sharing your email.",
    icon: <Lock className="text-blue-400" />,
    color: "from-blue-500/20 to-transparent",
  },
  {
    title: "AI-Powered Parsing",
    description: "Smart detection for headings, lists, and tables. Your text looks professional automatically.",
    icon: <Cpu className="text-pink-400" />,
    color: "from-pink-500/20 to-transparent",
  },
  {
    title: "Universal Access",
    description: "Fully responsive. Create, merge, or split PDFs on your phone, tablet, or desktop seamlessly.",
    icon: <Globe className="text-cyan-400" />,
    color: "from-cyan-500/20 to-transparent",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-[#0c070f] relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-indigo-600/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-purple-500 font-bold tracking-[0.2em] uppercase text-xs"
          >
            The Gold Standard
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mt-4"
          >
            Why Professionals Choose <span className="text-purple-500">PDFHUB</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 rounded-4xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
            >
          
              <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-purple-500/50 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;