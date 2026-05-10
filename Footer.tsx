'use client';
import React from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { Mail, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <NextImage src="/logo.png" alt="ConviDesk Logo" fill className="object-contain" />
              </div>
              <span className="text-lg font-bold text-white">
                ConviDesk<span className="text-[#00E676]">AI</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Official WhatsApp Business automation platform. Scale your support with AI.
            </p>
            <div className="flex gap-4">
              <Twitter size={18} className="text-zinc-600 hover:text-[#00E676] cursor-pointer" />
              <Instagram size={18} className="text-zinc-600 hover:text-[#00E676] cursor-pointer" />
              <Linkedin size={18} className="text-zinc-600 hover:text-[#00E676] cursor-pointer" />
            </div>
          </div>

          {/* Solution Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest border-l-2 border-[#00E676] pl-3">Solution</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/auth/login" className="hover:text-white transition-colors">Enterprise Login</Link></li>
            </ul>
          </div>

          {/* Compliance Links (Legal) */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest border-l-2 border-[#00E676] pl-3">Compliance</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-medium">
              <li><Link href="/legal/privacy" className="hover:text-[#00E676] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-[#00E676] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest border-l-2 border-[#00E676] pl-3">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#00E676]" />
                <a href="mailto:support@convidesk.ai" className="hover:text-white">support@convidesk.ai</a>
              </li>
              <li className="text-[12px] opacity-60">kanpur, Uttar Pradesh, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.3em]">
            © 2026 CONVIDESK AI.
          </p>
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
            <div className="w-2 h-2 bg-[#00E676] rounded-full animate-pulse"></div>
            <span className="text-[9px] text-zinc-400 uppercase font-black">API Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}