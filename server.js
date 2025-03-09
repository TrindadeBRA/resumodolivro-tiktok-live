const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');
const { WebcastPushConnection } = require('tiktok-live-connector');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        handle(req, res);
    });

    const io = new Server(server, {
        cors: {
            origin: "*", // Permitir conexões de qualquer origem
            methods: ["GET", "POST"]
        }
    });

    // Substitua "nome_do_usuario" pelo nome de usuário real do TikTok
    const tiktokUsername = "torvintv";
    const tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

    // Conectar à transmissão ao vivo
    const connectToTikTok = () => {
        tiktokLiveConnection
            .connect()
            .then((state) => {
                console.info(`Conectado à sala ${state.roomId}`);
            })
            .catch((err) => {
                console.error('Falha ao conectar', err);
                // Tentar reconectar após um erro
                console.log('Tentando reconectar em 5 segundos...');
                setTimeout(connectToTikTok, 5000);
            });
    };

    // Chamar a função de conexão
    connectToTikTok();

    // Registrar eventos de chat no console
    tiktokLiveConnection.on('chat', (data) => {
        // Opcional: Emitir os dados para o cliente via Socket.IO
        io.emit('chat', data);
    });

    // Adicionar ouvintes para outros eventos da biblioteca
    tiktokLiveConnection.on('like', (data) => {
        io.emit('like', data); // Emitir evento de like
    });

    tiktokLiveConnection.on('gift', data => {
        // Log para entender o que está acontecendo
        console.log(`Recebido presente: ${data.giftName}, de: ${data.uniqueId}, quantidade: ${data.repeatCount}`);
    
        // Verifica se o presente é do tipo 1 e se não é o final do streak
        if (data.giftType === 1 && !data.repeatEnd) {
            // Streak em andamento => mostrar apenas temporariamente
            console.log(`${data.uniqueId} está enviando o presente ${data.giftName} x${data.repeatCount}`);
        } else {
            // Streak terminado ou presente não streakable => processar o presente com a contagem final
            console.log(`${data.uniqueId} enviou o presente ${data.giftName} x${data.repeatCount}`);
            io.emit('gift', data); // Emitir evento de presente
        }
    });

    // Iniciar o servidor na porta 3000
    server.listen(3001, (err) => {
        if (err) throw err;
        console.log('> Pronto em http://localhost:3001');
    });
});