"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileStack, LayoutPanelLeft, Wand2, ShieldCheck } from "lucide-react";

const steps = [
  {
    title: "Upload Stack",
    desc: "Select two or more PDF files. Our system securely prepares them for structural merging in real-time.",
    icon: <FileStack size={24} />,
    color: "#a855f7", 
  },
  {
    title: "Organize Flow",
    desc: "Arrange your documents in the exact order you want. Simply drag and drop to set the hierarchy.",
    icon: <LayoutPanelLeft size={24} />,
    color: "#3b82f6", 
  },
  {
    title: "Smart Binding",
    desc: "Our engine cleans metadata and unifies the vector layers to ensure a seamless transition between files.",
    icon: <Wand2 size={24} />,
    color: "#ec4899", 
  },
  {
    title: "Secure Export",
    desc: "Download your unified document. Files are automatically purged from memory after processing.",
    icon: <ShieldCheck size={24} />,
    color: "#10b981", 
  },
];

const MergeHowItWorks = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-32 bg-[#0c070f] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative">
        
        <div className="text-center mb-28">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-purple-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
          >
            Workflow
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            How its <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500">Works?</span>
          </h2>
        </div>

        {/* Steps Container */}
        <div className="relative">
          
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 bg-linear-to-b from-purple-600 via-blue-500 to-emerald-500 shadow-[0_0_20px_rgba(147,51,234,0.6)]"
            />
          </div>

          <div className="space-y-32">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex items-center justify-between w-full ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                <div className="w-full md:w-[40%] ml-20 md:ml-0">
                  <div className="group relative p-8 rounded-[40px] bg-white/3 border border-white/10 backdrop-blur-md hover:bg-white/5 hover:border-purple-500/40 transition-all duration-500">
                    <div className="absolute -top-4 -left-4 text-4xl font-black text-white/5 group-hover:text-purple-500/10 transition-colors">
                      0{index + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Center Animated Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-[#0c070f] border border-white/10 flex items-center justify-center z-10">
                   <div className="text-white relative z-10 group-hover:scale-110 transition-transform">
                     {step.icon}
                   </div>
                   <motion.div 
                     animate={{ 
                       scale: [1, 1.2, 1],
                       opacity: [0.1, 0.3, 0.1]
                     }}
                     transition={{ repeat: Infinity, duration: 3 }}
                     className="absolute inset-0 rounded-2xl bg-purple-500 blur-xl"
                   />
                </div>

                
                <div className="hidden md:block w-[40%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MergeHowItWorks;