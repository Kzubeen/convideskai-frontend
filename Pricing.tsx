"use client";
import React from 'react';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  const plans = {
    monthly: {
      price: 199,
      oldPrice: 499,
      label: "Monthly",
      features: [
        "Unlimited Auto Replies",
        "24/7 Active Bot",
        "Product & Price List",
        "Knowledge Base",
        "Basic Support",
      ],
      marketing: "₹1/message",
      notIncluded: ["Automated Follow-ups", "AI Smart Replies", "Free Onboarding"]
    },
    quarterly: {
      price: 499,
      oldPrice: 1499,
      label: "3-Months",
      features: [
        "Everything in Monthly",
        "Automated Follow-ups",
        "Priority Support",
      ],
      marketing: "₹0.90/message",
      notIncluded: ["AI Smart Replies", "Free Onboarding"]
    },
    annual: {
      price: 1999,
      oldPrice: 4999,
      label: "Annual",
      features: [
        "Everything in Quarterly",
        "AI Smart Replies",
        "Free Onboarding",
        "Dedicated Support",
      ],
      marketing: "₹0.80/message",
      notIncluded: []
    }
  };

  const comparisonFeatures = [
    { name: "Unlimited Auto Replies", monthly: true, quarterly: true, annual: true },
    { name: "Product & Price List", monthly: true, quarterly: true, annual: true },
    { name: "Knowledge Base", monthly: true, quarterly: true, annual: true },
    { name: "Automated Follow-ups", monthly: false, quarterly: true, annual: true },
    { name: "AI Smart Replies", monthly: false, quarterly: false, annual: true },
    { name: "Free Onboarding", monthly: false, quarterly: false, annual: true },
    { name: "Support", monthly: "Basic", quarterly: "Priority", annual: "Dedicated" },
    { name: "Marketing Messages", monthly: "₹1/msg", quarterly: "₹0.90/msg", annual: "₹0.80/msg" },
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-[#050505] text-white">
      <div className="max-w-6xl mx-auto text-center">

        {/* Guarantee Badge */}
        <div className="inline-block bg-[#00E676]/10 border border-[#00E676]/20 text-[#00E676] text-sm font-medium px-6 py-2 rounded-full mb-8">
          7-day money back guarantee — pasand na aaye, pura paisa wapas
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Pricing for <span className="text-[#00E676]">Growing Businesses</span>
        </h2>
        <p className="text-gray-400 text-lg mb-4 max-w-xl mx-auto">
          Unlimited WhatsApp auto-replies — koi message limit nahi, koi hidden charges nahi.
        </p>
        <p className="text-gray-500 text-sm mb-16">
          Sirf marketing messages pe pay karo — auto-reply bilkul free hai
        </p>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-center mb-20">
          {Object.entries(plans).map(([key, data]) => (
            <div
              key={key}
              className={`relative border p-8 rounded-3xl transition-all duration-300 ${
                key === 'annual'
                  ? 'bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border-[#00E676]/40 shadow-[0_0_30px_rgba(0,230,118,0.08)] scale-105'
                  : 'bg-[#0e0e0e] border-white/10 hover:border-white/20'
              }`}
            >
              {key === 'annual' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Best Value
                </div>
              )}

              <h3 className="text-lg font-medium text-gray-400 mb-2">{data.label}</h3>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-gray-600 line-through text-lg mr-2 font-medium">₹{data.oldPrice}</span>
                <span className="text-5xl font-bold text-white">₹{data.price}</span>
              </div>
              <p className="text-gray-500 text-xs mb-6">
                + Marketing: <span className="text-[#00E676]">{data.marketing}</span>
              </p>

              <ul className="space-y-3 mb-4 text-left text-sm text-gray-300">
                {data.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#00E676] flex-shrink-0" /> {feat}
                  </li>
                ))}
                {data.notIncluded.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 opacity-30">
                    <X className="w-4 h-4 text-gray-500 flex-shrink-0" /> {feat}
                  </li>
                ))}
              </ul>

              <Link href="/auth/signup">
                <button className={`w-full font-bold py-4 rounded-xl transition-all mt-4 ${
                  key === 'annual'
                    ? 'bg-[#00E676] text-black hover:bg-[#00c965]'
                    : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]'
                }`}>
                  Select {data.label}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-20 overflow-x-auto">
          <h3 className="text-2xl font-bold mb-8 text-white">Plan Comparison</h3>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Feature</th>
                <th className="py-4 px-4 text-gray-400 font-medium">Monthly</th>
                <th className="py-4 px-4 text-gray-400 font-medium">3-Months</th>
                <th className="py-4 px-4 text-[#00E676] font-medium">Annual</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="text-left py-4 px-4 text-gray-300">{feature.name}</td>
                  {['monthly', 'quarterly', 'annual'].map((plan) => (
                    <td key={plan} className="py-4 px-4 text-center">
                      {typeof feature[plan as keyof typeof feature] === 'boolean' ? (
                        feature[plan as keyof typeof feature] ? (
                          <Check className="w-5 h-5 text-[#00E676] mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-700 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-300">{feature[plan as keyof typeof feature] as string}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
    </section>
  );
}