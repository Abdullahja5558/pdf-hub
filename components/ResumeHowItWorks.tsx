"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  PenTool, 
  Layers, 
  Sparkles, 
  FileCheck 
} from "lucide-react";

const steps = [
  {
    title: "Data Input",
    desc: "Enter your professional milestones through our streamlined, glassmorphic interface designed for clarity.",
    icon: <PenTool size={24} />,
    color: "from-purple-500 to-fuchsia-500"
  },
  {
    title: "Live Rendering",
    desc: "Watch your blueprint evolve in real-time. Our engine renders every character with A4 precision.",
    icon: <Layers size={24} />,
    color: "from-fuchsia-500 to-pink-500"
  },
  {
    title: "AI Optimization",
    desc: "The system balances white space and typography hierarchy to ensure maximum recruiter engagement.",
    icon: <Sparkles size={24} />,
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "Vector Export",
    desc: "Download a high-fidelity PDF that maintains perfect resolution across all devices and printers.",
    icon: <FileCheck size={24} />,
    color: "from-rose-500 to-orange-500"
  },
];

const ResumeHowItWorks = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-32 bg-[#0c070f] relative overflow-hidden">
      {/* Decorative Background Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white"
          >
            The <span className="text-purple-500">Architectural</span> Process
          </motion.h2>
          <p className="text-gray-500 mt-4 font-medium tracking-widest uppercase text-xs">Four Stages of Excellence</p>
        </div>

        <div className="relative">
          {/* Central Glowing Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/5 -translate-x-1/2">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 bg-linear-to-b from-purple-600 via-fuchsia-500 to-orange-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            />
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`relative flex items-center justify-between w-full ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-[42%] ml-20 md:ml-0">
                  <div className="p-8 rounded-[35px] bg-white/3 border border-white/10 backdrop-blur-md hover:border-purple-500/40 transition-all group relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-1 h-full bg-linear-to-b ${step.color} opacity-50`} />
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Animated Icon Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-[#0c070f] border border-white/10 flex items-center justify-center z-10 shadow-2xl overflow-hidden group">
                   <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-50" />
                   <div className="text-purple-400 group-hover:scale-110 group-hover:text-white transition-all duration-500 relative z-10">
                    {step.icon}
                   </div>
                   <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-purple-500/20 rounded-2xl scale-125 border-dashed"
                   />
                </div>

                {/* Empty Spacer for Desktop Layout */}
                <div className="hidden md:block w-[42%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeHowItWorks;