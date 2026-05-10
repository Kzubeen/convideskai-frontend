"use client";
import React from 'react';
import { Check, ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";


export default function FAQ() {
  const faqs = [
    { 
      q: "Is this official WhatsApp integration?", 
      a: "Yes, ConviDesk uses official channels to ensure your business account remains safe and active." 
    },
    { 
      q: "Do I need technical knowledge?", 
      a: "No. If you can use WhatsApp, you can set up ConviDesk. No coding or complex setup is required." 
    },
    { 
      q: "Is my data safe?", 
      a: "Yes. Your business data is encrypted and used only to help you communicate with your customers." 
    },
    { 
      q: "Can I cancel anytime?", 
      a: "Yes. There are no long-term lock-in contracts. You can stop your subscription at any time." 
    },
    { 
      q: "What is the difference between demo and full AI?", 
      a: "The demo shows how it responds to common questions, while the full version connects to your specific business data for real-world sales." 
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#050505] text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/10 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-primary">{faq.q}</h3>
              <p className="text-gray-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}