'use client';

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

export default function Home() {
    const [messages, setMessages] = useState<any[]>([]); // Estado para armazenar as mensagens
    const messagesEndRef = useRef<HTMLDivElement | null>(null); // Referência para o final da lista de mensagens

    useEffect(() => {
        const socket = io('http://localhost:3001'); // Especificar o URL do servidor

        socket.on('chat', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]); // Adicionar nova mensagem ao estado
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // Rolar para a última mensagem
        });

        socket.on('like', (data) => {
            setMessages((prevMessages) => [...prevMessages, { comment: `${data.uniqueId} deu like! 👍`, nickname: data.uniqueId }]); // Adicionar mensagem de like com emoji
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // Rolar para a última mensagem
        });

        socket.on('gift', (data) => {
            setMessages((prevMessages) => [...prevMessages, { comment: `${data.uniqueId} enviou um presente: ${data.giftName}`, nickname: data.uniqueId }]); // Adicionar mensagem de presente
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // Rolar para a última mensagem
        });

        // Desconectar ao desmontar o componente
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-grea">
            <h1 className="text-3xl font-bold mb-6 text-center">Chat ao vivo do TikTok</h1>
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 h-[80vh] overflow-y-auto flex flex-col pb-10">
                <div className="h-full overflow-y-auto flex flex-col pb-10">
                    {messages.map((msg, index) => ( // Renderizar todas as mensagens
                        <div key={index} className='flex flex-row items-start gap-3 mb-4 p-2 border-b border-gray-200'>
                            {msg.profilePictureUrl && ( // Verificar se a imagem de perfil existe
                                <img src={msg.profilePictureUrl} alt={`${msg.nickname}'s profile`} width={40} height={40} className="rounded-full object-cover" />
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