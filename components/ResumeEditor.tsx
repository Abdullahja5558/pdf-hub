"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, 
  Plus, Trash2, Download, Eye, FileText, Sparkles, Code, AlignLeft 
} from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResumeHowItWorks from "@/components/ResumeHowItWorks";

interface Experience { id: string; company: string; role: string; years: string; }
interface Education { id: string; school: string; degree: string; years: string; }

const ResumeBuilder = () => {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+1 234 567 890");
  const [address, setAddress] = useState("New York, USA");
  const [summary, setSummary] = useState("Results-driven Professional with 5+ years of experience in digital transformation. Passionate about building scalable solutions and leading high-performing teams.");
  const [skills, setSkills] = useState("React, Next.js, TypeScript, Node.js, UI/UX Design");
  
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: "1", company: "Tech Corp", role: "Senior Developer", years: "2021 - Present" }
  ]);
  const [education, setEducation] = useState<Education[]>([
    { id: "1", school: "Stanford University", degree: "B.S. Computer Science", years: "2017 - 2021" }
  ]);

  const addExperience = () => setExperiences([...experiences, { id: Date.now().toString(), company: "", role: "", years: "" }]);
  const removeExperience = (id: string) => setExperiences(experiences.filter(exp => exp.id !== id));
  
  const addEducation = () => setEducation([...education, { id: Date.now().toString(), school: "", degree: "", years: "" }]);
  const removeEducation = (id: string) => setEducation(education.filter(ed => ed.id !== id));

  const generateResume = async () => {
  
    if (typeof window === "undefined") return;

    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const page = pdfDoc.addPage([595.28, 841.89]);
      const { width, height } = page.getSize();

      page.drawRectangle({ x: 0, y: height - 100, width, height: 100, color: rgb(0.047, 0.027, 0.059) });

      page.drawText(name.toUpperCase(), { x: 50, y: height - 50, size: 24, font: boldFont, color: rgb(1, 1, 1) });
      page.drawText(`${email} | ${phone} | ${address}`, { x: 50, y: height - 70, size: 10, font, color: rgb(0.8, 0.8, 0.8) });

      let currentY = height - 130;

      page.drawText("PROFESSIONAL SUMMARY", { x: 50, y: currentY, size: 12, font: boldFont, color: rgb(0.5, 0.3, 0.9) });
      currentY -= 15;
      page.drawText(summary, { x: 50, y: currentY, size: 10, font, maxWidth: 500, lineHeight: 14 });
      currentY -= 45;

      page.drawText("CORE SKILLS", { x: 50, y: currentY, size: 12, font: boldFont, color: rgb(0.5, 0.3, 0.9) });
      currentY -= 15;
      page.drawText(skills, { x: 50, y: currentY, size: 10, font, maxWidth: 500 });
      currentY -= 40;

      page.drawText("PROFESSIONAL EXPERIENCE", { x: 50, y: currentY, size: 12, font: boldFont, color: rgb(0.5, 0.3, 0.9) });
      currentY -= 20;
      experiences.forEach(exp => {
        if (currentY < 50) return; // Basic page overflow check
        page.drawText(exp.company || "Company", { x: 50, y: currentY, size: 11, font: boldFont });
        page.drawText(exp.years || "Years", { x: 450, y: currentY, size: 9, font });
        currentY -= 15;
        page.drawText(exp.role || "Role", { x: 50, y: currentY, size: 10, font, color: rgb(0.3, 0.3, 0.3) });
        currentY -= 25;
      });

      currentY -= 10;
      page.drawText("EDUCATION", { x: 50, y: currentY, size: 12, font: boldFont, color: rgb(0.5, 0.3, 0.9) });
      currentY -= 20;
      education.forEach(ed => {
        if (currentY < 50) return;
        page.drawText(ed.school || "School", { x: 50, y: currentY, size: 11, font: boldFont });
        page.drawText(ed.years || "Years", { x: 450, y: currentY, size: 9, font });
        currentY -= 15;
        page.drawText(ed.degree || "Degree", { x: 50, y: currentY, size: 10, font });
        currentY -= 25;
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name.replace(/\s+/g, '_')}_Resume.pdf`;
      link.click();
      
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error("PDF Generation failed:", error);
    }
  };
  if (!mounted) return <div className="min-h-screen bg-[#0c070f]" />;

  return (
    <main className="bg-[#0c070f] min-h-screen text-white">
      <Header />
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          
          <div className="flex-1 space-y-8 max-h-[85vh] overflow-y-auto pr-4 custom-scrollbar">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Sparkles size={24} /></div>
              <h1 className="text-3xl font-black tracking-tight">Resume <span className="text-purple-500">Architect</span></h1>
            </div>

            <div className="p-8 rounded-4xl bg-white/5 border border-white/10 space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2 text-purple-400"><User size={18} /> Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Name" value={name} onChange={setName} />
                <InputField label="Email" value={email} onChange={setEmail} />
                <InputField label="Phone" value={phone} onChange={setPhone} />
                <InputField label="Address" value={address} onChange={setAddress} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><AlignLeft size={14}/> Executive Summary</label>
                <textarea 
                   className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-25 outline-none focus:border-purple-500 transition-all resize-none"
                   value={summary} onChange={(e) => setSummary(e.target.value)}
                />
              </div>
            </div>
            <div className="p-8 rounded-4xl bg-white/5 border border-white/10 space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2 text-purple-400"><Code size={18} /> Core Competencies</h3>
              <InputField label="Skills (Comma separated)" value={skills} onChange={setSkills} />
            </div>

            <DynamicSection 
              title="Experience" icon={<Briefcase size={18}/>} 
              items={experiences} onAdd={addExperience} onRemove={removeExperience}
              renderInputs={(item: any) => (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input placeholder="Company" className="bg-transparent border-b border-white/10 py-2 outline-none focus:border-purple-500 text-sm" value={item.company} onChange={(e) => setExperiences(experiences.map(x => x.id === item.id ? {...x, company: e.target.value} : x))} />
                  <input placeholder="Role" className="bg-transparent border-b border-white/10 py-2 outline-none focus:border-purple-500 text-sm" value={item.role} onChange={(e) => setExperiences(experiences.map(x => x.id === item.id ? {...x, role: e.target.value} : x))} />
                  <input placeholder="Years" className="bg-transparent border-b border-white/10 py-2 outline-none focus:border-purple-500 text-sm" value={item.years} onChange={(e) => setExperiences(experiences.map(x => x.id === item.id ? {...x, years: e.target.value} : x))} />
                </div>
              )}
            />

            <DynamicSection 
              title="Education" icon={<GraduationCap size={18}/>} 
              items={education} onAdd={addEducation} onRemove={removeEducation}
              renderInputs={(item: any) => (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input placeholder="School/Uni" className="bg-transparent border-b border-white/10 py-2 outline-none focus:border-purple-500 text-sm" value={item.school} onChange={(e) => setEducation(education.map(x => x.id === item.id ? {...x, school: e.target.value} : x))} />
                  <input placeholder="Degree" className="bg-transparent border-b border-white/10 py-2 outline-none focus:border-purple-500 text-sm" value={item.degree} onChange={(e) => setEducation(education.map(x => x.id === item.id ? {...x, degree: e.target.value} : x))} />
                  <input placeholder="Years" className="bg-transparent border-b border-white/10 py-2 outline-none focus:border-purple-500 text-sm" value={item.years} onChange={(e) => setEducation(education.map(x => x.id === item.id ? {...x, years: e.target.value} : x))} />
                </div>
              )}
            />

            <button onClick={generateResume} className="w-full py-5 bg-purple-600 rounded-3xl font-black text-xl hover:bg-purple-500 transition-all flex items-center justify-center gap-3 shadow-xl shadow-purple-900/20">
              <Download size={24} /> Export to PDF
            </button>
          </div>

          <div className="lg:w-112.5 sticky top-32 h-fit">
            <div className="mb-4 flex justify-between px-4"><span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><Eye size={14}/> Live Blueprint</span></div>
            <div className="bg-white text-black aspect-[1/1.414] rounded-xl shadow-2xl p-8 overflow-y-auto text-[9px] scale-100 origin-top">
               <div className="border-b-2 border-purple-600 pb-3 mb-4">
                 <h2 className="text-xl font-black uppercase tracking-tighter">{name}</h2>
                 <p className="text-gray-500 font-medium">{email} | {phone} | {address}</p>
               </div>
               
               <div className="space-y-4">
                 <section>
                   <h4 className="font-black text-purple-600 uppercase border-b border-gray-100 mb-1">Summary</h4>
                   <p className="text-gray-700 leading-tight whitespace-pre-wrap">{summary}</p>
                 </section>
                 
                 <section>
                   <h4 className="font-black text-purple-600 uppercase border-b border-gray-100 mb-1">Skills</h4>
                   <p className="text-gray-700">{skills}</p>
                 </section>

                 <section>
                   <h4 className="font-black text-purple-600 uppercase border-b border-gray-100 mb-1">Experience</h4>
                   {experiences.map(exp => (
                     <div key={exp.id} className="mb-2">
                       <div className="flex justify-between font-bold"><span>{exp.company || "Company"}</span><span>{exp.years}</span></div>
                       <p className="italic text-gray-600">{exp.role || "Position"}</p>
                     </div>
                   ))}
                 </section>

                 <section>
                   <h4 className="font-black text-purple-600 uppercase border-b border-gray-100 mb-1">Education</h4>
                   {education.map(ed => (
                     <div key={ed.id} className="mb-2">
                       <div className="flex justify-between font-bold"><span>{ed.school || "Institution"}</span><span>{ed.years}</span></div>
                       <p className="text-gray-600">{ed.degree || "Degree"}</p>
                     </div>
                   ))}
                 </section>
               </div>
            </div>
          </div>

        </div>
      </section>
      <ResumeHowItWorks />
      <Footer />
    </main>
  );
};
const InputField = ({ label, value, onChange }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</label>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-purple-500 transition-all" />
  </div>
);

const DynamicSection = ({ title, icon, items, onAdd, onRemove, renderInputs }: any) => (
  <div className="p-8 rounded-4xl bg-white/5 border border-white/10 space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-bold flex items-center gap-2 text-purple-400">{icon} {title}</h3>
      <button onClick={onAdd} className="p-2 bg-purple-600 rounded-full hover:bg-purple-500 transition-all"><Plus size={16} /></button>
    </div>
    {items.map((item: any) => (
      <div key={item.id} className="relative p-6 bg-white/5 rounded-2xl border border-white/5 group mb-4 last:mb-0">
        <button onClick={() => onRemove(item.id)} className="absolute -top-2 -right-2 p-2 bg-red-500/10 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-lg"><Trash2 size={14} /></button>
        {renderInputs(item)}
      </div>
    ))}
  </div>
);

export default ResumeBuilder;