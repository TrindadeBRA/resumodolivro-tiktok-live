'use client'

import { Character, drawCharacter } from '@/utils/characterLottery';
import { useEffect, useState } from 'react';

export default function ModalGift({ gift }: { gift?: any }) {
    const [visible, setVisible] = useState(true);
    const [character, setCharacter] = useState<Character | null>(null); // Estado para armazenar o personagem sorteado

    useEffect(() => {
        if (gift) {
            setVisible(true);
            const selectedCharacter: Character = drawCharacter(); // Sorteia um personagem
            setCharacter(selectedCharacter); // Armazena o personagem sorteado
            const timer = setTimeout(() => {
                setVisible(false);
            }, 500000);
            return () => clearTimeout(timer);
        }
    }, [gift]);

    if (!visible) return null; // Não renderiza o modal se não estiver visível

    return (
        <div className="modal-gift absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="absolute inset-0 flex items-center justify-center max-w-[85%] mx-auto">
                <div className="bg-[#413b88] p-6 opacity-90 rounded-3xl border-4 border-[#6f67ca] shadow-lg">
                    {character && ( // Exibe o personagem sorteado
                        <div className="text-center flex flex-col items-center gap-4">
                            <h2 className="text-lg text-white font-semibold flex flex-col items-center justify-center ">
                                <span className="text-white font-bold">
                                    {character.name}
                                </span>
                                <span className="text-white font-light">
                                    do livro: {character.bookName}
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