'use client';
import { Trash2, Edit3 } from 'lucide-react';

interface Entry {
  id: string;
  title: string;
  content: string;
}

export default function KnowledgeCard({ entry, onDelete, onEdit }: { 
  entry: Entry, 
  onDelete: (id: string) => void, 
  onEdit: (entry: Entry) => void 
}) {
  return (
    <div className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl hover:border-white/10 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-white font-bold text-sm truncate">{entry.title || "Untitled Entry"}</h4>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(entry)} className="p-1.5 text-zinc-400 hover:text-blue-400">
            <Edit3 size={16} />
          </button>
          <button onClick={() => onDelete(entry.id)} className="p-1.5 text-zinc-400 hover:text-red-500">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed">
        {entry.content}
      </p>
    </div>
  );
}