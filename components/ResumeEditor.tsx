"use client";

import React, { useState, useEffect } from "react";
import { 
  User, Mail, Phone, Briefcase, GraduationCap, 
  Plus, Trash2, Download, Code, Globe, StickyNote,
  Github, Linkedin, ExternalLink, Rocket, MapPin
} from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- Interfaces ---
interface Experience { id: string; company: string; role: string; years: string; }
interface Education { id: string; school: string; degree: string; years: string; }
interface SkillGroup { id: string; title: string; list: string; }
interface Language { id: string; name: string; level: string; }
interface Project { id: string; name: string; description: string; tools: string; link: string; }

const ResumeBuilder = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Basic Info State
  const [name, setName] = useState("ABDULLAH JAVED");
  const [role, setRole] = useState("Senior Full-Stack Developer");
  const [email, setEmail] = useState("abdullah@example.com");
  const [phone, setPhone] = useState("+92 300 1234567");
  const [address, setAddress] = useState("Lahore, Pakistan");
  const [github, setGithub] = useState("github.com/abdullahjaved");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/abdullahjaved");
  const [portfolio, setPortfolio] = useState("abdullah.dev");

  // Dynamic Content State
  const [summary, setSummary] = useState("Creative developer specializing in premium MERN stack applications.");
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([{ id: "1", title: "Frontend", list: "Next.js 15, React, Tailwind, Framer Motion" }]);
  const [experiences, setExperiences] = useState<Experience[]>([{ id: "1", company: "Tech Solutions", role: "Frontend Lead", years: "2023 - Present" }]);
  const [projects, setProjects] = useState<Project[]>([{ id: "1", name: "Lex Pro AI", description: "Legal AI assistant.", tools: "Next.js, OpenAI", link: "lexpro.ai" }]);
  const [education, setEducation] = useState<Education[]>([{ id: "1", school: "University of Engineering", degree: "BS Computer Science", years: "2022 - 2026" }]);
  const [languages, setLanguages] = useState<Language[]>([{ id: "1", name: "English", level: "Professional" }]);
  const [premiumNote, setPremiumNote] = useState("Ready for high-end web development challenges.");

  // Helper for PDF text wrapping
  const wrapText = (text: string, maxWidth: number, font: any, fontSize: number) => {
    if (!text) return [];
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';
    words.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (font.widthOfTextAtSize(testLine, fontSize) <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });
    lines.push(currentLine);
    return lines;
  };

  const generateResume = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const margin = 50;
      const maxWidth = 495;
      
      // Dynamic Height Calculation
      let h = 190; 
      h += wrapText(summary, maxWidth, font, 10).length * 15 + 30;
      skillGroups.forEach(sg => h += wrapText(sg.list, maxWidth - 90, font, 10).length * 15 + 10); h += 30;
      experiences.forEach(() => h += 50); h += 30;
      projects.forEach(p => h += wrapText(p.description, maxWidth, font, 9).length * 13 + 45); h += 30;
      education.forEach(() => h += 50); h += 30;
      if (languages.some(l => l.name)) h += 50;
      if (premiumNote) h += wrapText(premiumNote, 460, font, 9).length * 14 + 60;

      const finalHeight = Math.max(841.89, h + 100);
      const page = pdfDoc.addPage([595.28, finalHeight]);
      const { width } = page.getSize();

      // Header PDF
      page.drawRectangle({ x: 0, y: finalHeight - 130, width, height: 130, color: rgb(0.05, 0.03, 0.07) });
      page.drawText(name.toUpperCase(), { x: 50, y: finalHeight - 50, size: 24, font: boldFont, color: rgb(1, 1, 1) });
      page.drawText(role.toUpperCase(), { x: 50, y: finalHeight - 72, size: 11, font: boldFont, color: rgb(0.5, 0.3, 0.9) });
      const contact = `${email}  |  ${phone}  |  ${address}`;
      const socials = `GitHub: ${github}  |  LinkedIn: ${linkedin}  |  Web: ${portfolio}`;
      page.drawText(contact, { x: 50, y: finalHeight - 95, size: 9, font, color: rgb(0.85, 0.85, 0.85) });
      page.drawText(socials, { x: 50, y: finalHeight - 110, size: 9, font, color: rgb(0.85, 0.85, 0.85) });

      let currentY = finalHeight - 160;
      const drawSection = (title: string) => {
        currentY -= 10;
        page.drawText(title.toUpperCase(), { x: margin, y: currentY, size: 11, font: boldFont, color: rgb(0.4, 0.2, 0.8) });
        currentY -= 6;
        page.drawLine({ start: { x: margin, y: currentY }, end: { x: width - margin, y: currentY }, thickness: 0.8, color: rgb(0.9, 0.9, 0.9) });
        currentY -= 20;
      };

      drawSection("Profile Summary");
      wrapText(summary, maxWidth, font, 10).forEach(l => { page.drawText(l, { x: margin, y: currentY, size: 10, font }); currentY -= 15; });

      drawSection("Core Skills");
      skillGroups.forEach(sg => {
        page.drawText(`${sg.title}:`, { x: margin, y: currentY, size: 10, font: boldFont });
        wrapText(sg.list, maxWidth - 95, font, 10).forEach(l => { page.drawText(l, { x: margin + 90, y: currentY, size: 10, font }); currentY -= 15; });
      });

      drawSection("Experience");
      experiences.forEach(exp => {
        page.drawText(exp.company, { x: margin, y: currentY, size: 10, font: boldFont });
        page.drawText(exp.years, { x: 460, y: currentY, size: 9, font: boldFont });
        currentY -= 15;
        page.drawText(exp.role, { x: margin, y: currentY, size: 9, font, color: rgb(0.3, 0.3, 0.3) });
        currentY -= 20;
      });

      drawSection("Projects");
      projects.forEach(p => {
        page.drawText(p.name, { x: margin, y: currentY, size: 10, font: boldFont });
        currentY -= 14;
        wrapText(p.description, maxWidth, font, 9).forEach(l => { page.drawText(l, { x: margin, y: currentY, size: 9, font }); currentY -= 12; });
        page.drawText(`Stack: ${p.tools}`, { x: margin, y: currentY, size: 8, font: boldFont, color: rgb(0.4, 0.4, 0.4) });
        currentY -= 20;
      });

      drawSection("Education");
      education.forEach(ed => {
        page.drawText(ed.school, { x: margin, y: currentY, size: 10, font: boldFont });
        page.drawText(ed.years, { x: 460, y: currentY, size: 9, font: boldFont });
        currentY -= 15;
        page.drawText(ed.degree, { x: margin, y: currentY, size: 9, font });
        currentY -= 20;
      });

      if (languages.some(l => l.name)) {
        drawSection("Languages");
        page.drawText(languages.filter(l => l.name).map(l => `${l.name} (${l.level})`).join("  •  "), { x: margin, y: currentY, size: 10, font });
        currentY -= 25;
      }

      if (premiumNote) {
        currentY -= 20;
        const noteLines = wrapText(premiumNote, 460, font, 9);
        const boxH = (noteLines.length * 14) + 25;
        page.drawRectangle({ x: margin, y: currentY - boxH + 12, width: 495, height: boxH, color: rgb(0.96, 0.95, 1) });
        page.drawText("NOTE", { x: margin + 15, y: currentY, size: 8, font: boldFont, color: rgb(0.3, 0.2, 0.5) });
        currentY -= 16;
        noteLines.forEach(l => { page.drawText(l, { x: margin + 15, y: currentY, size: 9, font }); currentY -= 14; });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${name}_Resume.pdf`;
      link.click();
    } catch (e) { console.error(e); }
  };

  if (!mounted) return null;

  return (
    <main className="bg-[#0c070f] min-h-screen text-white antialiased pb-20">
      <Header />
      <section className="pt-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* EDITOR SIDE */}
          <div className="flex-1 space-y-6 lg:max-h-[85vh] lg:overflow-y-auto lg:pr-4 custom-scrollbar">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2 text-purple-400"><User size={18} /> Basic Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Name" value={name} onChange={setName} />
                <InputField label="Role" value={role} onChange={setRole} />
                <InputField label="Email" value={email} onChange={setEmail} />
                <InputField label="Phone" value={phone} onChange={setPhone} />
                <InputField label="GitHub" value={github} onChange={setGithub} />
                <InputField label="LinkedIn" value={linkedin} onChange={setLinkedin} />
                <InputField label="Portfolio" value={portfolio} onChange={setPortfolio} />
                <InputField label="Location" value={address} onChange={setAddress} />
              </div>
              <textarea placeholder="Summary" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-24 outline-none focus:border-purple-500 text-sm" value={summary} onChange={(e) => setSummary(e.target.value)} />
            </div>

            <DynamicSection title="Skills" icon={<Code size={18}/>} items={skillGroups} 
              onAdd={() => setSkillGroups([...skillGroups, {id: Date.now().toString(), title: "", list: ""}])} 
              onRemove={(id:any) => setSkillGroups(skillGroups.filter(x => x.id !== id))} 
              renderInputs={(item:any) => (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input placeholder="Category" className="bg-transparent border-b border-white/10 py-1 text-sm font-bold outline-none" value={item.title} onChange={(e) => setSkillGroups(skillGroups.map(s => s.id === item.id ? {...s, title: e.target.value} : s))} />
                  <input placeholder="List" className="md:col-span-2 bg-transparent border-b border-white/10 py-1 text-sm outline-none" value={item.list} onChange={(e) => setSkillGroups(skillGroups.map(s => s.id === item.id ? {...s, list: e.target.value} : s))} />
                </div>
            )} />

            <DynamicSection title="Projects" icon={<Rocket size={18}/>} items={projects} 
              onAdd={() => setProjects([...projects, {id: Date.now().toString(), name: "", description: "", tools: "", link: ""}])} 
              onRemove={(id:any) => setProjects(projects.filter(x => x.id !== id))} 
              renderInputs={(item:any) => (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Name" className="bg-transparent border-b border-white/10 py-1 text-sm font-bold outline-none" value={item.name} onChange={(e) => setProjects(projects.map(x => x.id === item.id ? {...x, name: e.target.value} : x))} />
                    <input placeholder="Link" className="bg-transparent border-b border-white/10 py-1 text-sm outline-none" value={item.link} onChange={(e) => setProjects(projects.map(x => x.id === item.id ? {...x, link: e.target.value} : x))} />
                  </div>
                  <textarea placeholder="Description" className="w-full bg-transparent border border-white/10 rounded-lg p-2 text-sm outline-none" value={item.description} onChange={(e) => setProjects(projects.map(x => x.id === item.id ? {...x, description: e.target.value} : x))} />
                  <input placeholder="Stack" className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none" value={item.tools} onChange={(e) => setProjects(projects.map(x => x.id === item.id ? {...x, tools: e.target.value} : x))} />
                </div>
            )} />

            <DynamicSection title="Experience" icon={<Briefcase size={18}/>} items={experiences} 
              onAdd={() => setExperiences([...experiences, {id: Date.now().toString(), company: "", role: "", years: ""}])} 
              onRemove={(id:any) => setExperiences(experiences.filter(x => x.id !== id))} 
              renderInputs={(item:any) => (
                <div className="grid grid-cols-3 gap-4">
                  <input placeholder="Company" className="bg-transparent border-b border-white/10 py-1 text-sm font-bold outline-none" value={item.company} onChange={(e) => setExperiences(experiences.map(x => x.id === item.id ? {...x, company: e.target.value} : x))} />
                  <input placeholder="Role" className="bg-transparent border-b border-white/10 py-1 text-sm outline-none" value={item.role} onChange={(e) => setExperiences(experiences.map(x => x.id === item.id ? {...x, role: e.target.value} : x))} />
                  <input placeholder="Years" className="bg-transparent border-b border-white/10 py-1 text-sm outline-none" value={item.years} onChange={(e) => setExperiences(experiences.map(x => x.id === item.id ? {...x, years: e.target.value} : x))} />
                </div>
            )} />

            <DynamicSection title="Education" icon={<GraduationCap size={18}/>} items={education} 
              onAdd={() => setEducation([...education, {id: Date.now().toString(), school: "", degree: "", years: ""}])} 
              onRemove={(id:any) => setEducation(education.filter(x => x.id !== id))} 
              renderInputs={(item:any) => (
                <div className="grid grid-cols-3 gap-4">
                  <input placeholder="School" className="bg-transparent border-b border-white/10 py-1 text-sm font-bold outline-none" value={item.school} onChange={(e) => setEducation(education.map(x => x.id === item.id ? {...x, school: e.target.value} : x))} />
                  <input placeholder="Degree" className="bg-transparent border-b border-white/10 py-1 text-sm outline-none" value={item.degree} onChange={(e) => setEducation(education.map(x => x.id === item.id ? {...x, degree: e.target.value} : x))} />
                  <input placeholder="Years" className="bg-transparent border-b border-white/10 py-1 text-sm outline-none" value={item.years} onChange={(e) => setEducation(education.map(x => x.id === item.id ? {...x, years: e.target.value} : x))} />
                </div>
            )} />

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
               <h3 className="text-lg font-bold flex items-center gap-2 text-purple-400"><Globe size={18} /> Languages</h3>
               {languages.map(l => (
                 <div key={l.id} className="flex gap-4">
                   <input placeholder="Language" className="bg-transparent border-b border-white/10 w-full text-sm outline-none py-1" value={l.name} onChange={(e) => setLanguages(languages.map(x => x.id === l.id ? {...x, name: e.target.value} : x))} />
                   <input placeholder="Fluency" className="bg-transparent border-b border-white/10 w-full text-sm outline-none py-1" value={l.level} onChange={(e) => setLanguages(languages.map(x => x.id === l.id ? {...x, level: e.target.value} : x))} />
                 </div>
               ))}
               <button onClick={() => setLanguages([...languages, {id: Date.now().toString(), name: "", level: ""}])} className="text-[10px] text-purple-500 font-black tracking-widest">+ ADD LANGUAGE</button>
            </div>

            <div className="p-6 rounded-3xl bg-purple-500/10 border border-purple-500/20">
               <h3 className="text-lg font-bold text-purple-400 mb-4">Premium Note</h3>
               <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-purple-500" value={premiumNote} onChange={(e) => setPremiumNote(e.target.value)} />
            </div>

            <button onClick={generateResume} className="w-full py-5 bg-purple-600 rounded-2xl font-black text-lg shadow-xl hover:bg-purple-500 transition-all">Download PDF</button>
          </div>

          {/* LIVE PREVIEW SIDE (UPDATED) */}
          <div className="lg:w-120 sticky top-24 h-fit hidden lg:block">
            <div className="bg-white text-black min-h-175 rounded-2xl shadow-2xl p-8 overflow-hidden">
               {/* Header Preview */}
               <div className="border-b-[4px] border-purple-600 pb-4 mb-5">
                  <h2 className="text-2xl font-black uppercase text-gray-900">{name || "YOUR NAME"}</h2>
                  <p className="text-purple-600 font-bold text-xs mb-3">{role || "Your Profession"}</p>
                  <div className="grid grid-cols-2 gap-1 text-[9px] text-gray-500 font-bold uppercase">
                    <span>{email}</span><span>{phone}</span><span>{github}</span><span>{linkedin}</span>
                  </div>
               </div>

               {/* Live Content Sections */}
               <div className="space-y-5 text-[10px] leading-snug">
                  {summary && (
                    <section>
                      <h4 className="font-black text-purple-700 border-b border-gray-100 pb-1 mb-1 uppercase">Profile</h4>
                      <p className="text-gray-700">{summary}</p>
                    </section>
                  )}
                  {skillGroups.some(s => s.title) && (
                    <section>
                      <h4 className="font-black text-purple-700 border-b border-gray-100 pb-1 mb-1 uppercase">Skills</h4>
                      {skillGroups.map(sg => sg.title && <p key={sg.id}><span className="font-bold">{sg.title}:</span> {sg.list}</p>)}
                    </section>
                  )}
                  {experiences.some(e => e.company) && (
                    <section>
                      <h4 className="font-black text-purple-700 border-b border-gray-100 pb-1 mb-1 uppercase">Experience</h4>
                      {experiences.map(e => e.company && (
                        <div key={e.id} className="mb-2">
                          <div className="flex justify-between font-bold"><span>{e.company}</span><span>{e.years}</span></div>
                          <p className="text-gray-500">{e.role}</p>
                        </div>
                      ))}
                    </section>
                  )}
                  {projects.some(p => p.name) && (
                    <section>
                      <h4 className="font-black text-purple-700 border-b border-gray-100 pb-1 mb-1 uppercase">Projects</h4>
                      {projects.map(p => p.name && (
                        <div key={p.id} className="mb-2">
                          <div className="flex justify-between font-bold"><span>{p.name}</span><span className="text-purple-400 font-normal italic">{p.link}</span></div>
                          <p className="text-gray-600 italic">Stack: {p.tools}</p>
                        </div>
                      ))}
                    </section>
                  )}
                  {education.some(ed => ed.school) && (
                    <section>
                      <h4 className="font-black text-purple-700 border-b border-gray-100 pb-1 mb-1 uppercase">Education</h4>
                      {education.map(ed => ed.school && (
                        <div key={ed.id} className="flex justify-between font-bold"><span>{ed.school} ({ed.degree})</span><span>{ed.years}</span></div>
                      ))}
                    </section>
                  )}
                  {languages.some(l => l.name) && (
                    <section>
                      <h4 className="font-black text-purple-700 border-b border-gray-100 pb-1 mb-1 uppercase">Languages</h4>
                      <p>{languages.filter(l => l.name).map(l => `${l.name} (${l.level})`).join(" • ")}</p>
                    </section>
                  )}
                  {premiumNote && (
                    <div className="mt-4 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-600 text-gray-700 italic text-[9px]">
                      {premiumNote}
                    </div>
                  )}
               </div>
            </div>
            <p className="text-center text-white/20 text-[10px] mt-4 uppercase tracking-widest italic">A4 Real-time Preview</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

const InputField = ({ label, value, onChange }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</label>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-purple-500 transition-all text-sm font-bold" />
  </div>
);

const DynamicSection = ({ title, icon, items, onAdd, onRemove, renderInputs }: any) => (
  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-bold flex items-center gap-2 text-purple-400">{icon} {title}</h3>
      <button onClick={onAdd} className="p-2 bg-purple-600 rounded-full hover:bg-purple-500 transition-all"><Plus size={16} /></button>
    </div>
    {items.map((item: any) => (
      <div key={item.id} className="relative p-5 bg-white/5 rounded-2xl border border-white/5 group">
        <button onClick={() => onRemove(item.id)} className="absolute -top-2 -right-2 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"><Trash2 size={14} /></button>
        {renderInputs(item)}
      </div>
    ))}
  </div>
);

export default ResumeBuilder;