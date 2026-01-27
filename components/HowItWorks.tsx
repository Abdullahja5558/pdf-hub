"use client";

import React from "react";
import { motion } from "framer-motion";
import { Type, Sparkles, FileCheck, MousePointer2 } from "lucide-react";

const steps = [
  {
    title: "Draft Content",
    desc: "Input your text with simple formatting codes for headings and lists.",
    icon: <Type size={28} />,
    color: "#a855f7", // Purple
  },
  {
    title: "AI Styling",
    desc: "Our engine applies premium typography and vector-perfect spacing.",
    icon: <Sparkles size={28} />,
    color: "#ec4899", // Pink
  },
  {
    title: "Instant Export",
    desc: "Your Ultra-HD PDF is ready for download in a single click.",
    icon: <FileCheck size={28} />,
    color: "#3b82f6", // Blue
  },
];

const HowItWorks = () => {
  return (
    <section className="py-32 bg-[#0c070f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            How it <span className="text-purple-500 underline decoration-purple-500/30 underline-offset-8">Works</span>
          </motion.h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A seamless journey from raw text to professional documentation.
          </p>
        </div>

        {/* The Steps Container */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          
          {/* THE PREMIUM LINE (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 z-0">
            {/* Background Path (Dotted) */}
            <div className="absolute inset-0 border-t-2 border-dashed border-white/10" />
            
            {/* Animated Glowing Path */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-linear-to-r from-purple-600 via-pink-500 to-blue-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3 }}
              className="group relative z-10 flex flex-col items-center text-center"
            >
              {/* Icon Container with Floating Animation */}
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-24 h-24 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative group-hover:border-purple-500/50 group-hover:bg-white/10 transition-all duration-500 shadow-2xl"
              >
                <div className="text-white group-hover:text-purple-400 transition-colors">
                  {step.icon}
                </div>
                
                {/* Number Overlay */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#0c070f] border border-white/10 rounded-full flex items-center justify-center text-xs font-black text-purple-500 group-hover:border-purple-500">
                  0{index + 1}
                </div>
              </motion.div>

              {/* Text Content */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all">
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Extra Premium Detail: Bottom Glow */}
        <div className="mt-24 flex justify-center">
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="h-px w-2/3 bg-linear-to-r from-transparent via-purple-500/50 to-transparent"
            />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;