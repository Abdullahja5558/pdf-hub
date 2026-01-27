"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Github, Twitter, Linkedin, Mail, ArrowRight, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: "Text to PDF", href: "/" },
      { name: "Image to PDF", href: "/imagetopdf" },
      { name: "Resume Builder", href: "/resume-builder" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
     
    ],
    Social: [
      { name: "GitHub", href: "https://github.com/Abdullahja5558", icon: <Github size={16} /> },
    ],
  };

  return (
    <footer className="bg-[#0c070f] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-purple-600/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                <FileText size={22} />
              </div>
              <span className="font-bold text-2xl text-white">
                PDF<span className="text-purple-500">HUB</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The world's most powerful browser-based PDF utility. 
              Built for speed, privacy, and ultra-high resolution results.
            </p>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-purple-400 text-sm transition-colors flex items-center gap-2 group"
                    >
                      
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Stay Updated</h4>
            <p className="text-gray-400 text-sm">Join our newsletter for premium tips and updates.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 pr-12 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
              <button className="absolute right-2 top-1.5 w-9 h-9 bg-purple-600 hover:bg-purple-500 rounded-xl flex items-center justify-center text-white transition-all active:scale-90">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs">
            © {currentYear} PDFHUB. Made with <Heart size={12} className="inline text-pink-500 mx-1" /> for a better web.
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">System Status: All Systems Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;