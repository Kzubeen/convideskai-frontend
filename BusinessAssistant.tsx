"use client";
import React, { useState } from 'react';

// Yeh function aapke business logic ko handle karega
const getAssistantResponse = (input: string, details: any) => {
  const msg = input.toLowerCase();
  const { name, services, price, hours, city } = details;

  if (msg.includes('price')) return `At ${name}, our services start at ${price}. Which specific service are you interested in so I can provide more details?`;
  if (msg.includes('service')) return `${name} offers: ${services}. Which of these would you like to know more about?`;
  if (msg.includes('time') || msg.includes('hour')) return `${name} is open during: ${hours}. Would you like to schedule an appointment?`;
  if (msg.includes('location') || msg.includes('where')) return `${name} is located in ${city}. Shall I provide the map direction for you?`;
  if (msg.includes('book') || msg.includes('admission')) return `I can certainly help you with that at ${name}. Could you please provide your name and contact number to proceed?`;
  
  return `Welcome to ${name}. How may I assist you today? We specialize in ${services}.`;
};

export default function BusinessAssistant({ businessData }: { businessData: any }) {
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    const botReply = { sender: 'bot', text: getAssistantResponse(input, businessData) };
    setMessages([...messages, userMsg, botReply]);
    setInput('');
  };

  return (
    <div className="bg-[#121212] p-6 rounded-3xl border border-white/10 w-full max-w-lg mx-auto">
      <div className="h-64 overflow-y-auto space-y-4 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded-xl text-sm ${m.sender === 'bot' ? 'bg-[#00E676]/10 text-white w-4/5' : 'bg-white/10 text-white w-4/5 ml-auto'}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-white outline-none"
          placeholder="Ask anything..."
        />
        <button onClick={handleSend} className="bg-[#00E676] px-6 rounded-xl font-bold">Send</button>
      </div>
    </div>
  );
}