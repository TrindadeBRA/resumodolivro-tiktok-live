'use client';

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { getGiftEmoji } from './utils';
import Image from 'next/image';
import LikeHeader from '@/components/LikeHeader';
import ChatBox from '@/components/ChatBox';
import LogoHeader from '@/components/LogoHeader';
import ModalInfo from '@/components/ModalInfo';
import ModalGift from '@/components/ModalGift';

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [likes, setLikes] = useState<number>(0);
  const [lastLiker, setLastLiker] = useState<string>('');
  const [giftQueue, setGiftQueue] = useState<any[]>([]);
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
      
      // Adiciona o presente à fila com um ID único e o nome do presente
      setGiftQueue(prevQueue => {
        const newGift = {
          ...data,
          id: Date.now(), // Adiciona um ID único baseado no timestamp
          timestamp: new Date().toISOString(),
          giftName: data.giftName // Adiciona o nome do presente
        };
        return [...prevQueue, newGift];
      });

    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Adicione este useEffect para remover o presente da fila após exibição
  useEffect(() => {
    if (giftQueue.length > 0) {
      const timer = setTimeout(() => {
        setGiftQueue(prevQueue => prevQueue.slice(1));
      }, 5000); // Aumenta o tempo para 5 segundos
      
      return () => clearTimeout(timer);
    }
  }, [giftQueue]);

  const currentGift = giftQueue[0];

  useEffect(() => {
    if (currentGift) {
        // Se houver um presente atual, faça log dele
        console.log('Presente atual:', currentGift);
    }
  }, [currentGift]); // Adiciona um efeito para monitorar mudanças no presente atual

  return (
    <div className="flex flex-col min-h-screen p-4 bg-[url('/assets/images/background.png')] bg-cover bg-center relative">
      <ModalInfo />
      <LogoHeader />
      <div className="flex flex-row justify-end w-full"> 
        <LikeHeader likes={likes} lastLiker={lastLiker} />
      </div>
      <div 
        ref={chatContainerRef}
        className="w-full max-w-md bg-white rounded-lg shadow-lg h-[70vh] overflow-y-auto mt-10"
      >
        <div className="flex flex-col bg-gray-100 rounded-lg shadow-inner p-4">
          <ChatBox messages={messages} />
        </div>
      </div>
      <ModalGift gift={currentGift} />
    </div>
  );
}