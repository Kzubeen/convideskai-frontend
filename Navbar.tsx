"use client";
import React from 'react';
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#0a0a0a] border-b border-white/5 py-5 px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Aapka Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          {/* Logo image public folder se load ho rahi hai */}
          <img 
            src="/logo.png" 
            alt="ConviDesk Logo" 
            className="w-auto h-10 object-contain" 
          />
        </Link>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link 
            href="/auth/signup" 
            className="bg-primary text-black font-bold px-6 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(0,230,118,0.4)] transition-all active:scale-95 text-sm"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}