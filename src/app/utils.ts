export function getGiftEmoji(giftName: string): string {
    giftName = giftName.toLowerCase();
    const giftEmojis: { [key: string]: string } = {
        "rose": "🌹",               
        "coffe": "☕",            
        "appetizers": "🍽️",       
        "april": "📅",            
        "tiktok": "🎵",           
        "cap": "🧢",              
        "nevalyashka doll": "🎎", 
        "heart": "❤️",           
        "diamond": "💎",        
        "crown": "👑"
    };
    return giftEmojis[giftName] || '🎁'; // Retorna um emoji padrão se o presente não estiver na lista
} 