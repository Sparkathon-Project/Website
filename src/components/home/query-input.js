"use client";
import { Mic, Send } from 'lucide-react';

export const QueryInput = ({ value, onChange, onSend, isRecording, onMicClick }) => (
  <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-50">
    <div className="bg-white rounded-full shadow-2xl border border-gray-200 py-2 px-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onMicClick}
          className={`p-3 rounded-full transition ${
            isRecording ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>
        <textarea
          className="flex-1 bg-gray-50 p-3 rounded-full resize-none focus:bg-white"
          rows={1}
          placeholder="Ask me anything about products..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
        />
        <button
          disabled={!value.trim()}
          onClick={onSend}
          className={`p-3 rounded-full transition ${
            value.trim()
              ? 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);