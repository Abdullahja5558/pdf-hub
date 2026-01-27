"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Upload, LayoutGrid, Zap, FileDown } from "lucide-react";

const steps = [
  {
    title: "Batch Upload",
    desc: "Drop your high-resolution images. Our engine handles RAW, PNG, and JPG instantly.",
    icon: <Upload size={24} />,
    color: "#a855f7",
  },
  {
    title: "Smart Layout",
    desc: "Automatic page scaling. Every image is perfectly fitted into its own vector-clean PDF page.",
    icon: <LayoutGrid size={24} />,
    color: "#ec4899",
  },
  {
    title: "Ultra Compression",
    desc: "Premium algorithms reduce file size by up to 80% while keeping 4K clarity intact.",
    icon: <Zap size={24} />,
    color: "#3b82f6",
  },
  {
    title: "Final Export",
    desc: "Your optimized, multi-page PDF is ready for high-speed download.",
    icon: <FileDown size={24} />,
    color: "#10b981",
  },
];

const ImageHowItWorks = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // This creates the "drawing" effect of the line
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-32 bg-[#0c070f] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative">
        
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            The <span className="text-purple-500">Ultra</span> Process
          </h2>
          <p className="text-gray-500 mt-4">Simple. Fast. Professional.</p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          
          {/* THE GLOWING VERTICAL LINE */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/5 -translate-x-1/2">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 bg-linear-to-b from-purple-600 via-pink-500 to-blue-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]"
            />
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`relative flex items-center justify-between w-full ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Text Content */}
                <div className="w-full md:w-[42%] ml-16 md:ml-0">
                  <div className={`p-8 rounded-4xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all group`}>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Center Icon (Sitting on the line) */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0c070f] border-2 border-white/10 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,1)]">
                   <div className="text-white">
                     {React.cloneElement(step.icon as React.ReactElement)}
                   </div>
                   
                   {/* Orbiting Ring (Premium Detail) */}
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className="absolute -inset-1 border border-dashed border-purple-500/30 rounded-full"
                   />
                </div>

                {/* Empty Space for layout balance */}
                <div className="hidden md:block w-[42%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageHowItWorks;