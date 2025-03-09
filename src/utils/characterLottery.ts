// src/components/characterLottery.ts
export interface Character {
    name: string;
    bookName: string;
    imgUrl: string;
    id: number;
    reason: string;
}

const characters: Character[] = [
    {
        name: "Peter Pan",
        bookName: "Peter Pan",
        imgUrl: "/assets/images/characters/peter-pan.png",
        id: 1,
        reason: "você é o Peter Pan, porque adora aventuras e nunca quer crescer!"
    },
    {
        name: "Alice",
        bookName: "Alice no País das Maravilhas",
        imgUrl: "/assets/images/characters/alice.png",
        id: 2,
        reason: "você é a Alice, porque é curiosa e ama coisas mágicas!"
    },
    {
        name: "Harry Potter",
        bookName: "Harry Potter e a Pedra Filosofal",
        imgUrl: "/assets/images/characters/harry-potter.png",
        id: 3,
        reason: "você é o Harry Potter, porque é valente e acredita em magia!"
    },
    {
        name: "Frodo",
        bookName: "O Senhor dos Anéis",
        imgUrl: "/assets/images/characters/frodo.png",
        id: 4,
        reason: "você é o Frodo, porque é leal e enfrenta desafios com coragem!"
    },
    {
        name: "Sherlock Holmes",
        bookName: "O Cão dos Baskerville",
        imgUrl: "/assets/images/characters/sherlock.png",
        id: 5,
        reason: "você é o Sherlock Holmes, porque é esperto e adora resolver mistérios!"
    },
    {
        name: "Gandalf",
        bookName: "O Senhor dos Anéis",
        imgUrl: "/assets/images/characters/gandalf.png",
        id: 7,
        reason: "você é o Gandalf, porque é sábio e ajuda os amigos!"
    },
    {
        name: "Drácula",
        bookName: "Drácula",
        imgUrl: "/assets/images/characters/dracula.png",
        id: 8,
        reason: "você é o Drácula, porque é misterioso e gosta da noite!"
    },
    {
        name: "Cinderela",
        bookName: "Cinderela",
        imgUrl: "/assets/images/characters/cinderela.png",
        id: 9,
        reason: "você é a Cinderela, porque é gentil e sonha com coisas lindas!"
    },
    {
        name: "Peter Parker",
        bookName: "Homem-Aranha",
        imgUrl: "/assets/images/characters/peterparker.png",
        id: 15,
        reason: "você é o Peter Parker, porque é rápido e protege os amigos!"
    },
    {
        name: "Winnie the Pooh",
        bookName: "Ursinho Pooh",
        imgUrl: "/assets/images/characters/pooh.png",
        id: 17,
        reason: "você é o Winnie the Pooh, porque é fofo e ama um docinho!"
    },
    {
        name: "Simba",
        bookName: "O Rei Leão",
        imgUrl: "/assets/images/characters/simba.png",
        id: 18,
        reason: "você é o Simba, porque é corajoso e quer ser o rei!"
    },
    {
        name: "Gatsby",
        bookName: "O Grande Gatsby",
        imgUrl: "/assets/images/characters/gatsby.png",
        id: 26,
        reason: "você é o Gatsby, porque é sonhador e gosta de festas!"
    },
    {
        name: "Bilbo Baggins",
        bookName: "O Hobbit",
        imgUrl: "/assets/images/characters/bilbo.png",
        id: 27,
        reason: "você é o Bilbo, porque é pequeno, mas tem um coração gigante!"
    },
    {
        name: "Frankenstein",
        bookName: "Frankenstein",
        imgUrl: "/assets/images/characters/frankstein.png",
        id: 30,
        reason: "você é o Frankenstein, porque é único e assusta de brincadeira!"
    }
];

export function drawCharacter(): Character {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}