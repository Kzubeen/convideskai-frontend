"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            fullName: formData.fullName,
            businessName: formData.businessName,
          },
        },
      });

      if (error) throw error;

      if (data?.user) {
        // Confirmation OFF hai isliye direct redirect
        window.location.href = '/auth/business-info';
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Convidesk AI</h1>
        <p className="text-zinc-500 mt-1 text-xs uppercase tracking-widest">Enterprise Registration</p>
      </div>

      <div className="max-w-lg w-full bg-zinc-900/40 backdrop-blur-2xl p-10 rounded-[40px] border border-white/5 shadow-2xl">
        <h2 className="text-xl font-semibold mb-6">Create Business Account</h2>
        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Full Name</label>
            <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#00E676] transition-all" onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Business Name</label>
            <input type="text" placeholder="Company Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#00E676] transition-all" onChange={(e) => setFormData({...formData, businessName: e.target.value})} required />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Email Address</label>
            <input type="email" placeholder="admin@company.com" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#00E676] transition-all" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Password</label>
            <input type="password" placeholder="Min. 8 characters" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#00E676] transition-all" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </div>
          <button type="submit" disabled={loading} className="md:col-span-2 w-full bg-[#00E676] hover:bg-[#00c864] text-black font-bold py-4 rounded-2xl mt-4 transition-all">
            {loading ? "Processing..." : "Register Now"}
          </button>
        </form>
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm text-zinc-500">
          Already registered? <Link href="/auth/login" className="text-[#00E676] font-semibold hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
}