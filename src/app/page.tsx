'use client';

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { getGiftEmoji } from './utils'; // Importar a função de utilidade
import Image from 'next/image';

export default function Home() {
    const [messages, setMessages] = useState<any[]>([]); // Estado para armazenar as mensagens
    const [likes, setLikes] = useState<number>(0); // Estado para armazenar o número de likes
    const [lastLiker, setLastLiker] = useState<string>(''); // Estado para armazenar o nome do último usuário que deu like
    const messagesEndRef = useRef<HTMLDivElement | null>(null); // Referência para o final da lista de mensagens

    useEffect(() => {
        const socket = io('http://localhost:3001'); // Especificar o URL do servidor

        socket.on('chat', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]); // Adicionar nova mensagem ao estado
        });

        socket.on('like', (data) => {
            setLikes((prevLikes) => prevLikes + 1); // Incrementar o contador de likes
            setLastLiker(data.uniqueId); // Armazenar o nome do último usuário que deu like
            // ... código existente ...
        });

        socket.on('gift', (data) => {
            const emoji = getGiftEmoji(data.giftName); // Obter emoji correspondente ao presente
            setMessages((prevMessages) => [...prevMessages, { comment: `${data.uniqueId} enviou um presente: ${emoji}`, nickname: data.uniqueId }]); // Adicionar mensagem de presente com emoji
        });

        // Desconectar ao desmontar o componente
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[url('/assets/images/background.png')] bg-cover bg-center">
            <div className='flex flex-row items-center justify-center gap-4'>
                <Image src="/assets/images/logo.png" alt="Logo" width={175} height={175} className='w-[175px] h-auto' />
            </div>
            <div className="text-lg font-semibold my-4 line-clamp-1">
                Likes: {likes} ❤️ - Último like: {lastLiker} {/* Contador de likes com emoji e nome do último usuário */}
            </div>
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 h-[75vh] overflow-y-auto flex flex-col pb-10">
                <div className="h-full overflow-y-scroll flex flex-col bg-gray-100 rounded-lg shadow-inner p-4">
                    {messages.map((msg, index) => ( // Renderizar todas as mensagens
                        <div key={index} className='flex flex-row items-start gap-3 mb-4 p-2 border-b border-gray-200'>
                            {msg.profilePictureUrl && ( // Verificar se a imagem de perfil existe
                                <img src={msg.profilePictureUrl} alt={`${msg.nickname}'s profile`} width={60} height={60} className="rounded-full object-cover" />
                            )}
                            <div>
                                <strong className="text-blue-600">{msg.nickname || 'Usuário'}:</strong>
                                <span className="text-gray-800 block">{msg.comment}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Referência para o final da lista de mensagens */}
                </div>
            </div>
        </div>
    );
}