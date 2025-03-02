'use client';

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { getGiftEmoji } from './utils';
import Image from 'next/image';

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
      <div className='flex flex-row items-center justify-center gap-4'>
        <Image src="/assets/images/logo.png" alt="Logo" width={175} height={175} className='w-[175px] h-auto' />
      </div>
      <div className="text-md font-semibold my-4 line-clamp-1">
        Likes: {likes} ❤️ - Último like: {lastLiker}
      </div>
      
      {/* Container principal com referência direta */}
      <div 
        ref={chatContainerRef}
        className="w-full max-w-md bg-white rounded-lg shadow-lg h-[75vh] overflow-y-auto"
      >
        <div className="flex flex-col bg-gray-100 rounded-lg shadow-inner p-4">
          {messages.map((msg, index) => (
            <div key={index} className='flex flex-row items-start gap-3 mb-4 p-2 border-b border-gray-200'>
              {msg.profilePictureUrl && (
                <img 
                  src={msg.profilePictureUrl} 
                  alt={`${msg.nickname}'s profile`} 
                  width={60} 
                  height={60} 
                  className="rounded-full object-cover" 
                />
              )}
              <div>
                <strong className="text-blue-600">{msg.nickname || 'Usuário'}:</strong>
                <span className="text-gray-800 block">{msg.comment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}