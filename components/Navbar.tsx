"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FileText, Image as ImageIcon, Scissors, User, ChevronRight } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  // Optimized Scroll animations with will-change for performance
  const width = useTransform(scrollY, [0, 100], ["100%", "92%"]);
  const maxWidth = useTransform(scrollY, [0, 100], ["1280px", "1100px"]);
  const height = useTransform(scrollY, [0, 100], ["80px", "68px"]);
  const y = useTransform(scrollY, [0, 100], [0, 12]);
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(12, 7, 15, 0.7)", "rgba(20, 15, 25, 0.95)"]
  );

  const links = [
    { name: "Text → PDF", href: "/", icon: <FileText size={18} /> },
    { name: "Image → PDF", href: "/imagetopdf", icon: <ImageIcon size={18} /> },
    { name: "Merge/Split", href: "/pdf-merge", icon: <Scissors size={18} /> },
    { name: "Resume", href: "/resume-builder", icon: <User size={18} /> },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-100 flex justify-center px-4 sm:px-6 pointer-events-none">
        <motion.header
          style={{ 
            width, 
            maxWidth, 
            height, 
            y, 
            backgroundColor, 
            backdropFilter: "blur(20px)",
            willChange: "transform, width, height" // Optimization
          }}
          className="pointer-events-auto mt-4 flex items-center justify-between px-6 md:px-10 
                     border border-white/10 rounded-[28px] 
                     shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-shadow duration-300"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group relative z-110">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-linear-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/30"
            >
              <FileText size={22} />
            </motion.div>
            <span className="font-bold text-xl md:text-2xl text-white tracking-tighter">
              PDF<span className="text-purple-500">HUB</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-300 hover:text-white transition-all relative overflow-hidden rounded-full"
              >
                <span className="text-purple-400 group-hover:scale-110 transition-transform">{link.icon}</span>
                {link.name}
                <motion.div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-6">
            <Link
              href="/about"
              className="hidden lg:flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-purple-400 transition-colors uppercase tracking-widest"
            >
              About
            </Link>

            {/* Premium Hamburger Toggle (Animates to X) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-110 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none xl:hidden"
              aria-label="Toggle Menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8, backgroundColor: "#a855f7" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
                className="w-7 h-0.5 rounded-full block origin-center transition-colors"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                className="w-7 h-0.5 bg-purple-500 rounded-full block"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8, backgroundColor: "#a855f7" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
                className="w-7 h-0.5 rounded-full block origin-center transition-colors"
              />
            </button>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-105 bg-[#0c070f]/90 xl:hidden flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-2 max-w-md mx-auto w-full">
              <p className="text-purple-500 text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-70">Main Menu</p>
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-5 border-b border-white/5 group active:scale-[0.98] transition-transform"
                  >
                    <div className="flex items-center gap-5">
                      <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-lg shadow-purple-500/0 group-hover:shadow-purple-500/20">
                        {link.icon}
                      </div>
                      <span className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {link.name}
                      </span>
                    </div>
                    <ChevronRight className="text-gray-600 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 pt-8 border-t border-white/5 flex gap-8"
              >
                <Link href="/about" onClick={() => setIsOpen(false)} className="text-gray-400 text-sm font-semibold hover:text-purple-400 uppercase tracking-wider">
                  About Us
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="text-gray-400 text-sm font-semibold hover:text-purple-400 uppercase tracking-wider">
                  Contact
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;