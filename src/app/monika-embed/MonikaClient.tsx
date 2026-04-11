'use client';

import { useEffect } from 'react';
import ChatWidget from '@/components/ChatWidget';

export default function MonikaClient() {
  useEffect(() => {
    document.body.classList.add('embed-mode');
    document.body.style.backgroundColor = 'transparent';
    return () => {
      document.body.classList.remove('embed-mode');
      document.body.style.backgroundColor = '';
    };
  }, []);

  return <ChatWidget isEmbed={true} />;
}