'use client';

import { useEffect, useState } from 'react';
import ChatWidget from '@/components/ChatWidget';

export default function MonikaClient() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.classList.add('embed-mode');
    document.body.style.backgroundColor = 'transparent';
    return () => {
      document.body.classList.remove('embed-mode');
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'MONIKA_CLOSE') {
        setIsVisible(false);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  if (!isVisible) return null;

  return <ChatWidget isEmbed={true} />;
}