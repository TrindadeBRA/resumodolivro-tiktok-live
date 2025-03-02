'use client'

import { useEffect, useState } from 'react';

export default function ModalGift({ gift }: { gift: any }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (gift) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [gift]);

    if (!visible) return null; // Não renderiza o modal se não estiver visível

    return (
        <div className="modal-gift absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#413b88] p-4 opacity-80 rounded-2xl border-2 border-[#6f67ca]">
                    <h1 className="text-md leading-5 text-center text-white opacity-100">
                        {gift.uniqueId} enviou um presente!
                    </h1>
                </div>
            </div>
        </div>
    );
}