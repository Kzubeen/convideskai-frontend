'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart2, CheckCircle2, XCircle, ArrowLeft, Lock, Loader2, Globe,
  Search, Plus, Pencil, Trash2, Calendar, Clock, Send, Sparkles, Smile, Phone
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function BroadcastMessages() {
  const router = useRouter();

  // Logic States
  const [loading, setLoading] = useState(true);
  const [planType, setPlanType] = useState('trial');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [isCreating, setIsCreating] = useState(false);

  // Form States
  const [audience, setAudience] = useState<'all' | 'active' | '7days' | 'custom'>('all');
  const [customNumbers, setCustomNumbers] = useState('');
  const [messageType, setMessageType] = useState('text');
  const [message, setMessage] = useState('');
  const [scheduleType, setScheduleType] = useState<'now' | 'later'>('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  // Broadcast data states
  const [broadcasts, setBroadcasts] = useState([
    {
      id: 1,
      name: 'Diwali Offer Launch',
      message: 'Get flat 20% off on all items! Use code DIWALI20. Valid till...',
      audience: 'All Users',
      status: 'Sent',
      date: '2026-05-01 14:30',
    },
    {
      id: 2,
      name: 'Order Confirmation Update',
      message: 'Hi {{name}}, your order #12345 has been successfully shipped...',
      audience: 'Custom Numbers',
      status: 'Scheduled',
      date: '2026-05-05 10:00',
    },
    {
      id: 3,
      name: 'Feedback Survey',
      message: 'Help us improve by sharing your recent purchase experience.',
      audience: 'All Users',
      status: 'Draft',
      date: '2026-04-28 17:00',
    }
  ]);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;
        
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('plan_type')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          if (data) {
            setPlanType(data.plan_type || 'trial');
          }
        }
      } catch (error) {
        console.error("Error fetching subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, []);

  const handleEdit = (broadcast: any) => {
    alert(`Edit feature coming soon for: ${broadcast.name}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Kya aap sach mein is campaign ko delete karna chahte hain?")) {
      setBroadcasts((prev) => prev.filter(b => b.id !== id));
    }
  };

  const handleCreateBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const newBroadcast = {
      id: broadcasts.length + 1,
      name: `Broadcast ${broadcasts.length + 1}`,
      message: message,
      audience: audience === 'all' ? 'All Users' : 'Custom Numbers',
      status: scheduleType === 'now' ? 'Sent' : 'Scheduled',
      date: scheduleType === 'now' 
        ? new Date().toLocaleString() 
        : `${scheduleDate} ${scheduleTime}`,
    };

    setBroadcasts([newBroadcast, ...broadcasts]);
    setIsCreating(false);
    
    // Reset form
    setMessage('');
    setAudience('all');
    setCustomNumbers('');
    setScheduleType('now');
    setCharacterCount(0);
  };

  const insertVariable = (variable: string) => {
    const updatedMessage = message + variable;
    setMessage(updatedMessage);
    setCharacterCount(updatedMessage.length);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        <Loader2 className="animate-spin w-8 h-8 text-[#00E676]" />
      </div>
    );
  }

  const isTrial = planType?.toLowerCase() === 'trial';

  // Filter functionality
  const filteredBroadcasts = broadcasts.filter((bc) => {
    const matchesSearch = bc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bc.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || bc.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans">
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#1f1f1f] bg-[#111111] flex justify-between items-center shadow-sm">
        <div>
          <button 
            onClick={() => isCreating ? setIsCreating(false) : router.back()}
            className="flex items-center text-xs text-gray-500 hover:text-white mb-2 gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" /> {isCreating ? 'Back to Campaigns' : 'Back to Dashboard'}
          </button>
          <h1 className="text-2xl font-bold text-white tracking-tight">Broadcast Messages</h1>
          <p className="text-xs text-gray-500 mt-0.5">Send personalized messages to multiple users at once.</p>
        </div>
        {!isCreating && (
          <button 
            className="bg-[#00E676] hover:bg-[#00b050] text-black px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition shadow-sm"
            onClick={() => {
              if (isTrial) {
                alert("Upgrade your plan to create broadcasts!");
              } else {
                setIsCreating(true);
              }
            }}
          >
            <Plus className="w-4 h-4 text-black" /> Create Broadcast
          </button>
        )}
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Main Content: Conditional rendering between table view and create view */}
        {isCreating ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: Create Broadcast Steps/Form */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Card 1: Audience Selection */}
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-4">1. Select Audience</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'all', label: 'All Users', icon: <Globe className="w-4 h-4 text-[#00E676]" /> },
                    { id: 'active', label: 'Active Users', icon: <CheckCircle2 className="w-4 h-4 text-blue-400" /> },
                    { id: '7days', label: 'Last 7 Days', icon: <Calendar className="w-4 h-4 text-yellow-500" /> },
                    { id: 'custom', label: 'Custom Numbers', icon: <Phone className="w-4 h-4 text-purple-400" /> },
                  ].map((audOpt) => (
                    <label 
                      key={audOpt.id}
                      className={`p-4 border rounded-xl flex flex-col justify-between cursor-pointer transition ${
                        audience === audOpt.id 
                        ? 'border-[#00E676] bg-[#1f1f1f] ring-1 ring-[#00E676]' 
                        : 'border-[#1f1f1f] hover:bg-[#1a1a1a] bg-[#0a0a0a]'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-4">
                        {audOpt.icon}
                        <input 
                          type="radio" 
                          name="audience" 
                          checked={audience === audOpt.id} 
                          onChange={() => setAudience(audOpt.id as any)} 
                          className="text-[#00E676] focus:ring-[#00E676] bg-[#111111]" 
                        />
                      </div>
                      <span className="text-xs font-semibold text-white">{audOpt.label}</span>
                    </label>
                  ))}
                </div>

                {audience === 'custom' && (
                  <div className="mt-4">
                    <textarea 
                      className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl p-3 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#00E676]"
                      rows={3}
                      placeholder="e.g. +91 9876543210, +91 8765432109"
                      value={customNumbers}
                      onChange={(e) => setCustomNumbers(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Card 2: Message Type */}
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-4">2. Message Type</label>
                <div className="flex gap-3">
                  {['Text Message', 'Image', 'Template'].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setMessageType(type.toLowerCase())}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-medium transition ${
                        messageType === type.toLowerCase() 
                        ? 'bg-white border-white text-black' 
                        : 'bg-[#0a0a0a] border-[#1f1f1f] text-gray-400 hover:bg-[#1a1a1a]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card 3: Write Message */}
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[340px]">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">3. Write Message</label>
                    <span className="text-xs text-gray-500">{characterCount}/1000</span>
                  </div>
                  
                  {/* Personalization Options */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => insertVariable('{{name}}')}
                      className="text-[10px] font-mono px-2 py-1 bg-[#1a1a1a] hover:bg-[#222] border border-[#1f1f1f] text-gray-400 rounded-lg flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-yellow-500" />
                      {'{name}'}
                    </button>
                    <button
                      type="button"
                      onClick={() => insertVariable('{{phone}}')}
                      className="text-[10px] font-mono px-2 py-1 bg-[#1a1a1a] hover:bg-[#222] border border-[#1f1f1f] text-gray-400 rounded-lg flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-purple-500" />
                      {'{phone}'}
                    </button>
                  </div>

                  <textarea
                    className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl p-4 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#00E676] resize-none"
                    rows={6}
                    placeholder="Type your broadcast message..."
                    value={message}
                    maxLength={1000}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setCharacterCount(e.target.value.length);
                    }}
                  />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#1f1f1f] mt-4">
                  <button type="button" className="text-gray-500 hover:text-white transition">
                    <Smile className="w-5 h-5" />
                  </button>

                  <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="px-4 py-2.5 border border-[#1f1f1f] rounded-xl text-xs text-gray-400 bg-[#0a0a0a] hover:bg-[#1a1a1a] transition"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      onClick={handleCreateBroadcast}
                      className="px-5 py-2.5 bg-[#00E676] hover:bg-[#00b050] text-black font-semibold rounded-xl text-xs flex items-center gap-2 transition"
                    >
                      <Send className="w-4 h-4 text-black font-bold" /> Send Broadcast
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 4: Schedule Option */}
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-4">4. Schedule Options</label>
                <div className="flex gap-6 items-center">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-400">
                    <input 
                      type="radio" 
                      name="schedule" 
                      checked={scheduleType === 'now'} 
                      onChange={() => setScheduleType('now')} 
                      className="text-[#00E676] focus:ring-[#00E676]" 
                    />
                    Send Now
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-400">
                    <input 
                      type="radio" 
                      name="schedule" 
                      checked={scheduleType === 'later'} 
                      onChange={() => setScheduleType('later')} 
                      className="text-[#00E676] focus:ring-[#00E676]" 
                    />
                    Schedule for later
                  </label>
                </div>

                {scheduleType === 'later' && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Date</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Calendar className="w-4 h-4 text-gray-500" />
                        </span>
                        <input 
                          type="date" 
                          className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl pl-9 pr-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#00E676]"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Time</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Clock className="w-4 h-4 text-gray-500" />
                        </span>
                        <input 
                          type="time" 
                          className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl pl-9 pr-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#00E676]"
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Live Preview Panel (Right Side Sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-[#111111] p-6 rounded-2xl border border-[#1f1f1f] shadow-sm sticky top-8">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-6">WhatsApp Preview</span>
                
                <div className="bg-[#0b141a] p-4 rounded-2xl border border-[#1f2c34] h-[460px] flex flex-col justify-between shadow-inner relative overflow-hidden">
                  {/* WhatsApp top bar in phone */}
                  <div className="flex items-center gap-3 pb-3 border-b border-[#2a3942]">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white">U</div>
                    <div>
                      <p className="text-xs font-semibold text-white">John Doe</p>
                      <p className="text-[10px] text-[#8696a0]">online</p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto py-4">
                    <div className="bg-[#005c4b] p-3.5 rounded-xl relative shadow-sm max-w-[85%] ml-auto text-white">
                      <p className="text-sm break-words whitespace-pre-wrap leading-relaxed">
                        {message && message.trim() !== '' ? (
                          message
                        ) : (
                          <span className="italic text-[#8696a0]">No message written yet...</span>
                        )}
                      </p>

                      <div className="flex items-center justify-end gap-1 text-[10px] text-[#8696a0] mt-2 select-none">
                        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#53bdeb"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 7 17l-5-5" />
                          <path d="m22 10-7.5 7.5L13 16" />
                        </svg>
                      </div>

                      <div className="absolute top-0 right-[-8px] w-0 h-0 border-t-[8px] border-t-[#005c4b] border-r-[8px] border-r-transparent"></div>
                    </div>
                  </div>

                  {/* WhatsApp bottom input placeholder */}
                  <div className="bg-[#111b21] p-2 rounded-xl flex items-center justify-between text-xs text-gray-500">
                    <span>Type a message...</span>
                    <span>😊</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Table View Section */
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col justify-between h-36 shadow-sm">
                <div className="flex justify-between items-start">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <span className="text-xs text-gray-500 font-medium">Total</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-0.5 tracking-tight">2,482</div>
                  <div className="text-xs text-gray-500">Broadcast Sent</div>
                </div>
              </div>
              
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col justify-between h-36 shadow-sm">
                <div className="flex justify-between items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-xs text-green-400 font-medium">94.2%</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-0.5 tracking-tight">2,338</div>
                  <div className="text-xs text-gray-500">Delivered</div>
                </div>
              </div>
              
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col justify-between h-36 shadow-sm">
                <div className="flex justify-between items-start">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-xs text-red-400 font-medium">5.8%</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-0.5 tracking-tight">144</div>
                  <div className="text-xs text-gray-500">Failed</div>
                </div>
              </div>
              
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col justify-between h-36 shadow-sm">
                <div className="flex justify-between items-start">
                  <BarChart2 className="w-5 h-5 text-yellow-500" />
                  <span className="text-xs text-gray-500 font-medium">Avg</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-0.5 tracking-tight">48.5%</div>
                  <div className="text-xs text-gray-500">Open Rate</div>
                </div>
              </div>
            </div>

            {/* Trial Check and Main Table Area */}
            {isTrial ? (
              <div className="flex justify-center items-center min-h-[360px] border border-[#1f1f1f] rounded-2xl bg-[#111111] shadow-sm">
                <div className="text-center max-w-md px-4">
                  <div className="w-16 h-16 mx-auto mb-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center">
                    <Lock className="w-8 h-8 text-amber-500" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-1">Upgrade to Unlock Features</h2>
                  <p className="text-sm text-gray-500 mb-6">
                    Broadcast feature is available for paid plans. Your current plan: 
                    <span className="text-amber-500 font-bold uppercase"> {planType}</span>
                  </p>
                  <button 
                    onClick={() => router.push('/pricing')}
                    className="w-full bg-white hover:bg-gray-200 text-black font-semibold py-3 px-6 rounded-xl transition duration-200"
                  >
                    View Pricing
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  {/* Search Bar */}
                  <div className="relative w-72">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="w-4 h-4 text-gray-500" />
                    </span>
                    <input 
                      type="text" 
                      placeholder="Search campaigns..." 
                      className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-300 w-full focus:outline-none focus:border-[#00E676]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Status Tabs */}
                  <div className="flex bg-[#0a0a0a] border border-[#1f1f1f] p-1 rounded-xl">
                    {['All', 'Sent', 'Scheduled', 'Draft'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          activeTab === tab
                            ? 'bg-[#1f1f1f] text-white shadow-sm'
                            : 'text-gray-500 hover:text-white'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table View */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#1f1f1f] text-gray-500 text-xs uppercase tracking-wider">
                        <th className="py-4 px-4 font-medium">Campaign Name</th>
                        <th className="py-4 px-4 font-medium">Message Preview</th>
                        <th className="py-4 px-4 font-medium">Audience</th>
                        <th className="py-4 px-4 font-medium">Status</th>
                        <th className="py-4 px-4 font-medium">Date & Time</th>
                        <th className="py-4 px-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f1f1f] text-sm text-gray-400">
                      {filteredBroadcasts.length > 0 ? (
                        filteredBroadcasts.map((bc) => (
                          <tr key={bc.id} className="hover:bg-[#1a1a1a]/50 transition-colors">
                            <td className="py-5 px-4 font-semibold text-white">{bc.name}</td>
                            <td className="py-5 px-4 max-w-xs truncate">{bc.message}</td>
                            <td className="py-5 px-4">
                              <span className="px-2.5 py-1 text-xs rounded-lg bg-[#1a1a1a] text-gray-300 border border-[#1f1f1f] font-medium">
                                {bc.audience}
                              </span>
                            </td>
                            <td className="py-5 px-4">
                              <span 
                                className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${
                                  bc.status === 'Sent' 
                                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                    : bc.status === 'Scheduled' 
                                    ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' 
                                    : 'bg-gray-500/10 border-gray-500/20 text-gray-400'
                                }`}
                              >
                                {bc.status}
                              </span>
                            </td>
                            <td className="py-5 px-4">{bc.date}</td>
                            <td className="py-5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(bc)}
                                  className="p-2 rounded-xl bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-[#1f1f1f] text-gray-500 hover:text-white transition shadow-sm"
                                  title="Edit"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(bc.id)}
                                  className="p-2 rounded-xl bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-[#1f1f1f] text-red-400 hover:text-red-300 transition shadow-sm"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-600">
                            No campaigns found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}