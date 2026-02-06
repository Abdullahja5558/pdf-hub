"use client";

import dynamic from 'next/dynamic';


const ResumeEditor = dynamic(
  () => import('@/components/ResumeEditor'), 
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#0c070f] flex items-center justify-center">
        <div className="text-purple-500 animate-pulse font-black tracking-widest uppercase text-xs">
          Loading Architect...
        </div>
      </div>
    )
  }
);

export default function ResumePage() {
  return <ResumeEditor />;
}