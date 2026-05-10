'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import { Plus, Loader2 } from 'lucide-react';

interface AddKnowledgeFormProps {
  onAdd: () => void;
}

export default function AddKnowledgeForm({ onAdd }: AddKnowledgeFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validation: Content khali nahi hona chahiye
    if (!content.trim()) {
      return toast.error("Bhai, content likhna zaroori hai!");
    }

    setLoading(true);

    try {
      // 2. Auth Check: Confirm karein ke user logged in hai
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        setLoading(false);
        return toast.error("Session expire ho gayi hai, please login karein.");
      }

      // 3. Database Insert: Ensure column names match your Supabase table
      const { error } = await supabase.from('knowledge_base').insert({
        user_id: user.id, // Direct ID use karein (UUID format)
        title: title.trim() || 'Untitled Entry',
        content: content.trim()
      });

      if (error) {
        // Agar yahan RLS error aata hai toh SQL editor mein policy check karein
        console.error("Supabase Error:", error);
        toast.error(`Error: ${error.message}`);
      } else {
        toast.success("Knowledge base mein entry add ho gayi!");
        
        // Form clear karein
        setTitle('');
        setContent('');
        
        // Parent component ki list refresh karein
        onAdd();
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      toast.error("Kuch technical masla hua hai.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[32px] space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#00E676]/10 flex items-center justify-center">
          <Plus size={18} className="text-[#00E676]" />
        </div>
        <h3 className="text-white font-bold">Add New Knowledge</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-2 mb-1 block">
            Title (Optional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Refund Policy"
            className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-sm focus:border-[#00E676] outline-none transition-all text-white"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-2 mb-1 block">
            Content Details
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe the information for AI training..."
            className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-sm min-h-[120px] focus:border-[#00E676] outline-none transition-all text-white resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#00E676] text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Saving Entry...</span>
            </>
          ) : (
            <>
              <Plus size={20} />
              <span>Add Knowledge Entry</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}