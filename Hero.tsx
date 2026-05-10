"use client";
import React from 'react';
import { Check, ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] text-white">
            Turn Every WhatsApp Inquiry <br />
            <span className="text-[#00E676] italic">Into a Confirmed Sale</span>
          </h1>

          <p className="text-gray-400 text-xl mb-8 max-w-lg leading-relaxed">
            ConviDesk automatically handles customer queries, captures leads, and sends follow-ups 24/7. Built specifically for Indian small businesses.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link href="/auth/signup">
              <button className="flex items-center justify-center gap-2 bg-[#00E676] text-black font-black px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-all">
                Start Free Trial <ArrowRight size={20} />
              </button>
            </Link>
            <Link href="/demo-chat">
              <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-all">
                <PlayCircle size={20} /> Try Live Demo
              </button>
            </Link>
          </div>

          {/* Pricing Tags */}
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Text Marketing</p>
              <p className="text-2xl font-black text-white">₹1<span className="text-sm text-[#00E676]">/msg</span></p>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Media Marketing</p>
              <p className="text-2xl font-black text-white">₹2<span className="text-sm text-[#00E676]">/msg</span></p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Visual Proof */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:block relative"
        >
          <div className="p-8 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#00E676]/20 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#00E676] rounded-full animate-pulse" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">System Active: 24/7</p>
                <p className="text-sm text-gray-500">Handling 120+ inquiries/day</p>
               </div>
            {/* Yahan naya text add kiya gaya hai */}
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <p className="text-[11px] text-blue-300 font-medium tracking-wide uppercase">
                Auto-responder Status: Online
              </p>
            </div>
          </div>
      </div>
    </motion.div>

      </div >
    </section >
  );
}