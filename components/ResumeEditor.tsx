"use client";

import React, { useState, useEffect } from "react";
import { 
  User, Mail, Phone, Briefcase, GraduationCap, 
  Plus, Trash2, Download, Code, Globe, StickyNote 
} from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Experience { id: string; company: string; role: string; years: string; }
interface Education { id: string; school: string; degree: string; years: string; }
interface SkillGroup { id: string; title: string; list: string; }
interface Language { id: string; name: string; level: string; }

const ResumeBuilder = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [name, setName] = useState("JOHN DOE");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+1 234 567 890");
  const [address, setAddress] = useState("New York, USA");
  const [summary, setSummary] = useState("Passionate professional dedicated to building high-quality solutions with modern technologies.");
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([{ id: "1", title: "Web Dev", list: "React, Next.js, Node.js, Tailwind CSS" }]);
  const [languages, setLanguages] = useState<Language[]>([{ id: "1", name: "English", level: "Fluent" }]);
  const [experiences, setExperiences] = useState<Experience[]>([{ id: "1", company: "Tech Solutions", role: "Senior Developer", years: "2023 - 2024" }]);
  const [education, setEducation] = useState<Education[]>([{ id: "1", school: "University of Science", degree: "Bachelor in CS", years: "2018 - 2022" }]);
  const [premiumNote, setPremiumNote] = useState("This is a premium professional note for extra details.");

  const wrapText = (text: string, maxWidth: number, font: any, fontSize: number) => {
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

      // --- 1. HEIGHT CALCULATION ---
      const margin = 50;
      const maxWidth = 495;
      let estimatedHeight = 150; // Header height

      // Calculate Summary Height
      estimatedHeight += wrapText(summary, maxWidth, font, 10).length * 15 + 40;
      // Skills Height
      skillGroups.forEach(sg => {
        const titleWidth = boldFont.widthOfTextAtSize(`${sg.title}: `, 10);
        estimatedHeight += wrapText(sg.list, maxWidth - titleWidth, font, 10).length * 15 + 10;
      });
      estimatedHeight += 40; // Section header
      // Experience Height
      estimatedHeight += experiences.length * 55 + 40;
      // Education Height
      estimatedHeight += education.length * 55 + 40;
      // Languages Height
      if (languages.some(l => l.name)) estimatedHeight += 60;
      // Note Height
      if (premiumNote) {
        estimatedHeight += wrapText(premiumNote, 460, font, 9).length * 14 + 80;
      }
      // Add bottom padding
      estimatedHeight += 40;

      // Ensure minimum A4 height (841.89) but allow it to grow
      const finalHeight = Math.max(841.89, estimatedHeight);
      const page = pdfDoc.addPage([595.28, finalHeight]);
      const { width } = page.getSize();
      
      // --- 2. DRAWING ---
      // Black Header
      page.drawRectangle({ x: 0, y: finalHeight - 100, width, height: 100, color: rgb(0.05, 0.03, 0.06) });
      page.drawText(name.toUpperCase(), { x: 50, y: finalHeight - 55, size: 24, font: boldFont, color: rgb(1, 1, 1) });
      page.drawText(`${email}  |  ${phone}  |  ${address}`, { x: 50, y: finalHeight - 78, size: 10, font, color: rgb(0.85, 0.85, 0.85) });

      let currentY = finalHeight - 135;

      const drawSectionHeader = (title: string) => {
        currentY -= 20;
        page.drawText(title.toUpperCase(), { x: margin, y: currentY, size: 12, font: boldFont, color: rgb(0.5, 0.3, 0.9) });
        currentY -= 8;
        page.drawLine({ start: { x: margin, y: currentY }, end: { x: width - margin, y: currentY }, thickness: 0.8, color: rgb(0.9, 0.9, 0.9) });
        currentY -= 20;
      };

      drawSectionHeader("Professional Summary");
      wrapText(summary, maxWidth, font, 10).forEach(l => { 
        page.drawText(l, { x: margin, y: currentY, size: 10, font }); 
        currentY -= 15; 
      });

      currentY -= 10;
      drawSectionHeader("Core Expertise");
      skillGroups.forEach(sg => {
        const titleText = `${sg.title}: `;
        const titleWidth = boldFont.widthOfTextAtSize(titleText, 10);
        page.drawText(titleText, { x: margin, y: currentY, size: 10, font: boldFont });
        wrapText(sg.list, maxWidth - titleWidth - 5, font, 10).forEach(line => {
          page.drawText(line, { x: margin + titleWidth + 2, y: currentY, size: 10, font });
          currentY -= 15;
        });
      });

      currentY -= 10;
      drawSectionHeader("Work Experience");
      experiences.forEach(exp => {
        page.drawText(exp.company, { x: margin, y: currentY, size: 11, font: boldFont });
        page.drawText(exp.years, { x: 450, y: currentY, size: 10, font: boldFont });
        currentY -= 15;
        page.drawText(exp.role, { x: margin, y: currentY, size: 10, font, color: rgb(0.3, 0.3, 0.3) });
        currentY -= 22;
      });

      currentY -= 10;
      drawSectionHeader("Education");
      education.forEach(ed => {
        page.drawText(ed.school, { x: margin, y: currentY, size: 11, font: boldFont });
        page.drawText(ed.years, { x: 450, y: currentY, size: 10, font: boldFont });
        currentY -= 15;
        page.drawText(ed.degree, { x: margin, y: currentY, size: 10, font });
        currentY -= 22;
      });

      if (languages.some(l => l.name)) {
        currentY -= 10;
        drawSectionHeader("Languages");
        const lStr = languages.filter(l => l.name).map(l => `${l.name} (${l.level})`).join("  •  ");
        page.drawText(lStr, { x: margin, y: currentY, size: 10, font });
        currentY -= 15;
      }

      if (premiumNote) {
        currentY -= 40;
        const nLines = wrapText(premiumNote, 460, font, 9);
        const boxH = (nLines.length * 14) + 25;
        page.drawRectangle({ x: margin, y: currentY - boxH + 12, width: 500, height: boxH, color: rgb(0.96, 0.94, 1) });
        page.drawRectangle({ x: margin, y: currentY - boxH + 12, width: 4, height: boxH, color: rgb(0.5, 0.3, 0.9) });
        page.drawText("PROFESSIONAL NOTE", { x: margin + 15, y: currentY, size: 9, font: boldFont, color: rgb(0.3, 0.2, 0.5) });
        currentY -= 18;
        nLines.forEach(line => { page.drawText(line, { x: margin + 15, y: currentY, size: 9, font }); currentY -= 14; });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${name}_Premium_Resume.pdf`;
      link.click();
    } catch (e) { console.error(e); }
  };

  if (!mounted) return null;

  return (
    <main className="bg-[#0c070f] min-h-screen text-white antialiased">
      <Header />
      <section className="pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Editor */}
          <div className="flex-1 space-y-8 lg:max-h-[85vh] lg:overflow-y-auto lg:pr-4 custom-scrollbar">
            <div className="p-8 rounded-4xl bg-white/5 border border-white/10 space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2 text-purple-400"><User size={18} /> Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Name" value={name} onChange={setName} />
                <InputField label="Email" value={email} onChange={setEmail} />
                <InputField label="Phone" value={phone} onChange={setPhone} />
                <InputField label="Location" value={address} onChange={setAddress} />
              </div>
              <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-24 outline-none focus:border-purple-500 text-sm" value={summary} onChange={(e) => setSummary(e.target.value)} />
            </div>

            <DynamicSection title="Skills" icon={<Code size={18}/>} items={skillGroups} 
              onAdd={() => setSkillGroups([...skillGroups, {id: Date.now().toString(), title: "", list: ""}])} 
              onRemove={(id:any) => setSkillGroups(skillGroups.filter(x => x.id !== id))} 
              renderInputs={(item:any) => (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input placeholder="Title" className="bg-transparent border-b border-white/10 py-1 text-sm font-bold outline-none" value={item.title} onChange={(e) => setSkillGroups(skillGroups.map(s => s.id === item.id ? {...s, title: e.target.value} : s))} />
                  <input placeholder="Skills" className="md:col-span-2 bg-transparent border-b border-white/10 py-1 text-sm outline-none" value={item.list} onChange={(e) => setSkillGroups(skillGroups.map(s => s.id === item.id ? {...s, list: e.target.value} : s))} />
                </div>
            )} />

            <DynamicSection title="Experience" icon={<Briefcase size={18}/>} items={experiences} 
              onAdd={() => setExperiences([...experiences, {id: Date.now().toString(), company: "", role: "", years: ""}])} 
              onRemove={(id:any) => setExperiences(experiences.filter(x => x.id !== id))} 
              renderInputs={(item:any) => (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input placeholder="Company" className="bg-transparent border-b border-white/10 py-1 text-sm font-bold outline-none" value={item.company} onChange={(e) => setExperiences(experiences.map(x => x.id === item.id ? {...x, company: e.target.value} : x))} />
                  <input placeholder="Role" className="bg-transparent border-b border-white/10 py-1 text-sm outline-none" value={item.role} onChange={(e) => setExperiences(experiences.map(x => x.id === item.id ? {...x, role: e.target.value} : x))} />
                  <input placeholder="Years" className="bg-transparent border-b border-white/10 py-1 text-sm font-bold outline-none" value={item.years} onChange={(e) => setExperiences(experiences.map(x => x.id === item.id ? {...x, years: e.target.value} : x))} />
                </div>
            )} />

            <DynamicSection title="Education" icon={<GraduationCap size={18}/>} items={education} 
              onAdd={() => setEducation([...education, {id: Date.now().toString(), school: "", degree: "", years: ""}])} 
              onRemove={(id:any) => setEducation(education.filter(x => x.id !== id))} 
              renderInputs={(item:any) => (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input placeholder="School" className="bg-transparent border-b border-white/10 py-1 text-sm font-bold outline-none" value={item.school} onChange={(e) => setEducation(education.map(x => x.id === item.id ? {...x, school: e.target.value} : x))} />
                  <input placeholder="Degree" className="bg-transparent border-b border-white/10 py-1 text-sm outline-none" value={item.degree} onChange={(e) => setEducation(education.map(x => x.id === item.id ? {...x, degree: e.target.value} : x))} />
                  <input placeholder="Years" className="bg-transparent border-b border-white/10 py-1 text-sm font-bold outline-none" value={item.years} onChange={(e) => setEducation(education.map(x => x.id === item.id ? {...x, years: e.target.value} : x))} />
                </div>
            )} />

            <div className="p-8 rounded-4xl bg-white/5 border border-white/10 space-y-4">
               <h3 className="text-lg font-bold flex items-center gap-2 text-purple-400"><Globe size={18} /> Languages</h3>
               {languages.map(l => (
                 <div key={l.id} className="flex gap-4">
                   <input placeholder="Language" className="bg-transparent border-b border-white/10 w-full text-sm outline-none" value={l.name} onChange={(e) => setLanguages(languages.map(x => x.id === l.id ? {...x, name: e.target.value} : x))} />
                   <input placeholder="Level" className="bg-transparent border-b border-white/10 w-full text-sm outline-none" value={l.level} onChange={(e) => setLanguages(languages.map(x => x.id === l.id ? {...x, level: e.target.value} : x))} />
                 </div>
               ))}
               <button onClick={() => setLanguages([...languages, {id: Date.now().toString(), name: "", level: ""}])} className="text-xs text-purple-500 font-bold">+ ADD LANGUAGE</button>
            </div>

            <div className="p-8 rounded-4xl bg-purple-500/10 border border-purple-500/20 space-y-4">
               <h3 className="text-lg font-bold flex items-center gap-2 text-purple-400"><StickyNote size={18} /> Premium Note</h3>
               <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-20 outline-none focus:border-purple-500 text-sm" value={premiumNote} onChange={(e) => setPremiumNote(e.target.value)} />
            </div>

            <button onClick={generateResume} className="w-full py-6 bg-purple-600 rounded-3xl font-black text-xl hover:bg-purple-500 shadow-2xl transition-all flex items-center justify-center gap-3">
              <Download size={28} /> Export Premium PDF
            </button>
          </div>

          {/* Right Column: Premium Live Preview */}
          <div className="lg:w-[450px] sticky top-32 h-fit hidden lg:block">
            <div className="bg-white text-black min-h-[600px] rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] p-10 overflow-hidden antialiased">
               <div className="border-b-[6px] border-purple-600 pb-4 mb-6">
                  <h2 className="text-3xl font-black uppercase text-gray-900 leading-none">{name || "NAME"}</h2>
                  <p className="text-gray-500 font-bold text-[9px] mt-2 tracking-widest uppercase">{email}  |  {phone}</p>
               </div>
               <div className="space-y-6 text-[11px] font-medium leading-relaxed">
                  <section>
                    <h4 className="font-black text-purple-600 border-b border-gray-100 pb-1 mb-2 uppercase text-xs">Summary</h4>
                    <p className="text-gray-800">{summary}</p>
                  </section>
                  <section>
                    <h4 className="font-black text-purple-600 border-b border-gray-100 pb-1 mb-2 uppercase text-xs">Skills</h4>
                    {skillGroups.map(sg => sg.title && (
                      <p key={sg.id} className="mb-1 text-gray-800"><span className="font-black">{sg.title}:</span> {sg.list}</p>
                    ))}
                  </section>
                  <section>
                    <h4 className="font-black text-purple-600 border-b border-gray-100 pb-1 mb-2 uppercase text-xs">Experience</h4>
                    {experiences.map(exp => exp.company && (
                      <div key={exp.id} className="mb-3">
                        <div className="flex justify-between font-black text-gray-900 text-[12px]"><span>{exp.company}</span><span>{exp.years}</span></div>
                        <p className="italic text-gray-600">{exp.role}</p>
                      </div>
                    ))}
                  </section>
                  <section>
                    <h4 className="font-black text-purple-600 border-b border-gray-100 pb-1 mb-2 uppercase text-xs">Education</h4>
                    {education.map(ed => ed.school && (
                      <div key={ed.id} className="mb-3">
                        <div className="flex justify-between font-black text-gray-900 text-[12px]"><span>{ed.school}</span><span>{ed.years}</span></div>
                        <p className="text-gray-700">{ed.degree}</p>
                      </div>
                    ))}
                  </section>
                  {languages.some(l => l.name) && (
                    <section>
                      <h4 className="font-black text-purple-600 border-b border-gray-100 pb-1 mb-2 uppercase text-xs">Languages</h4>
                      <p className="font-bold text-gray-800">{languages.filter(l => l.name).map(l => `${l.name} (${l.level})`).join("  •  ")}</p>
                    </section>
                  )}
                  {premiumNote && (
                    <div className="mt-8 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600 text-gray-700">
                      <span className="font-black text-purple-700 block mb-1 uppercase text-[9px]">Note</span>
                      {premiumNote}
                    </div>
                  )}
               </div>
            </div>
            <p className="text-center text-white/20 text-[10px] mt-4 tracking-widest uppercase">Premium Live Preview</p>
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
  <div className="p-8 rounded-4xl bg-white/5 border border-white/10 space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-bold flex items-center gap-2 text-purple-400">{icon} {title}</h3>
      <button onClick={onAdd} className="p-2 bg-purple-600 rounded-full hover:bg-purple-500 transition-all"><Plus size={16} /></button>
    </div>
    {items.map((item: any) => (
      <div key={item.id} className="relative p-6 bg-white/5 rounded-2xl border border-white/5 group mb-4">
        <button onClick={() => onRemove(item.id)} className="absolute -top-2 -right-2 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"><Trash2 size={14} /></button>
        {renderInputs(item)}
      </div>
    ))}
  </div>
);

export default ResumeBuilder;