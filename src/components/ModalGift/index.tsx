'use client'

import { Character, drawCharacter } from '@/utils/characterLottery';
import { useEffect, useState } from 'react';

export default function ModalGift({ gift }: { gift?: any }) {
    const [visible, setVisible] = useState(false);
    const [character, setCharacter] = useState<Character | null>(null); // Estado para armazenar o personagem sorteado

    useEffect(() => {
        if (gift) {
            const audio = new Audio('/assets/sounds/magic.mp3'); // Substitua pelo caminho do seu arquivo de áudio
            audio.play(); // Toca o áudio

            setVisible(true);
            const selectedCharacter: Character = drawCharacter(); // Sorteia um personagem
            setCharacter(selectedCharacter); // Armazena o personagem sorteado
            const timer = setTimeout(() => {
                setVisible(false);
            }, 12000);
            return () => clearTimeout(timer);
        }
    }, [gift]);

    if (!visible || !gift) return null; // Não renderiza o modal se não estiver visível ou se gift for indefinido

    return (
        <div className="modal-gift absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="absolute inset-0 flex items-center justify-center max-w-[85%] mx-auto">
                
                <div className="bg-[#413b88] p-6 opacity-90 rounded-3xl border-4 border-[#6f67ca] shadow-lg">
                    <div className="flex flex-col items-center justify-center mb-6">
                        <span className="text-sm text-white text-center">
                            Obrigado <span className="font-bold text-lg animate-color-pulse">{gift.uniqueId ?? "Anônimo"}</span> pelo presente:
                        </span>
                        <span className="text-sm text-white text-center">
                            <span className="font-bold">{gift.giftName}</span>!
                        </span>
                    </div>

                    <div className="border-t border-gray-300 opacity-50 my-4"></div>


                    
                    {character && ( // Exibe o personagem sorteado
                        <div className="text-center flex flex-col items-center gap-4">
                            <h2 className="text-lg text-white font-semibold flex flex-col items-center justify-center ">
                                <span className="text-white font-bold">
                                    {character.name}
                                </span>
                                <span className="text-white font-light">
                                    Livro: {character.bookName}
                                </span>
                            </h2>
                            <img src={character.imgUrl} alt={character.name} className="w-40 h-40 rounded-full border-2 border-white mt-2" />
                            <p className="text-sm text-white mt-2">Parabéns <span className="font-bold text-lg animate-color-pulse">{gift.uniqueId ?? "Anônimo"}</span>, {character.reason}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}