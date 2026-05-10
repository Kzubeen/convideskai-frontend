"use client";
import React from 'react';
import { Target, Clock, Users, Zap } from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    { icon: <Target className="text-primary" />, title: "Precision Targeting", desc: "Reach customers who actually want to buy." },
    { icon: <Clock className="text-primary" />, title: "Save 10+ Hours/Week", desc: "Let AI handle the repetitive chatting for you." },
    { icon: <Users className="text-primary" />, title: "Lead Organization", desc: "All your leads stored in one simple dashboard." },
    { icon: <Zap className="text-primary" />, title: "Instant Scaling", desc: "Grow from 10 to 1000+ chats without adding staff." }
  ];

  return (
    <section className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-16">Why Businesses Trust ConviDesk</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition">
              <div className="mb-4">{b.icon}</div>
              <h3 className="font-bold text-white mb-2">{b.title}</h3>
              <p className="text-sm text-gray-400">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}