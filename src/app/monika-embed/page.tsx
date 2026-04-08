'use client';

import { useEffect } from 'react';
import ChatWidget from '@/components/ChatWidget';

export default function EmbedPage() {
  useEffect(() => {
    document.body.classList.add('embed-mode');
    document.body.style.backgroundColor = 'transparent';
    return () => {
      document.body.classList.remove('embed-mode');
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-transparent overflow-hidden flex items-end justify-end pointer-events-none">
      <div className="pointer-events-auto">
        <ChatWidget isEmbed={true} />
      </div>
    </div>
  );
}