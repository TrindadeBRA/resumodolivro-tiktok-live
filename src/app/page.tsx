'use client';

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { getGiftEmoji } from './utils';
import Image from 'next/image';
import LikeHeader from '@/components/LikeHeader';
import ChatBox from '@/components/ChatBox';
import LogoHeader from '@/components/LogoHeader';

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [likes, setLikes] = useState<number>(0);
  const [lastLiker, setLastLiker] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Função para rolar para o final do chat
  const scrollToBottom = () => {
    // Verificar explicitamente se a referência existe
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      // Definir um pequeno atraso para garantir que o DOM foi atualizado
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 10);
    }
  };

  useEffect(() => {
    // Rolar para o final sempre que as mensagens mudarem
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('chat', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    socket.on('like', (data) => {
      setLikes(prevLikes => prevLikes + 1);
      setLastLiker(data.uniqueId);
    });

    socket.on('gift', (data) => {
      const emoji = getGiftEmoji(data.giftName);
      setMessages(prevMessages => [
        ...prevMessages, 
        { 
          comment: `${data.uniqueId} enviou um presente: ${emoji}`, 
          nickname: data.uniqueId,
          profilePictureUrl: null
        }
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[url('/assets/images/background.png')] bg-cover bg-center">
      <LogoHeader />
      <LikeHeader likes={likes} lastLiker={lastLiker} />
      <div 
        ref={chatContainerRef}
        className="w-full max-w-md bg-white rounded-lg shadow-lg h-[75vh] overflow-y-auto"
      >
        <div className="flex flex-col bg-gray-100 rounded-lg shadow-inner p-4">
          <ChatBox messages={messages} />
        </div>
      </div>
    </div>
  );
}