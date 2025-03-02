interface ChatBoxProps {
    messages: {
        comment: string;
        nickname: string;
        profilePictureUrl: string | null;
    }[];
}

export default function ChatBox({ messages }: ChatBoxProps) {
    return (
        <>
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
        </>
    );
}