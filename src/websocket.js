import socketio from 'socket.io';
import parseStringAsArray from './util/parseStringAsArray';
import calculateDistance from './util/calculateDistance';

let io;
//vetor que armazena cada conexão feito no servidor pelo soket
const connections = [];

//recebe a conexão do cliente e armazena os dados 
function setupWebsocket(server){
    io = socketio(server);

    io.on('connection', socket => {
        //recebendo os dados que são passados pelo cliente, pelo socket
        const { latitude, logintude, techs } = socket.handshake.query;

        //inserindo os dados da conexão que foi feita pelo cliente no vetor
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });


    });
};

//retorna os clientes que estão no raio de 10km e com as techs
function findConnection(coordinates, techs){
    
    return connections.filter(connection => {
        //compara as coordenadas do dev cadastrado com as dos clientes sockets
        return calculateDistance(coordinates, connection.coordinates) < 10
         && connection.techs.some(item => techs.includes(item))
    });
}

//envia o dev para os clientes 
function sendMenssage(to, menssage, data){
    /*
        to -> é o cliente
        menssage-> é a chave
        data -> os dado do dev
    */

    to.forEach(connection => {
        io.to(connection.id).emit(menssage, data);
    })
}

export {
    setupWebsocket,
    findConnection,
    sendMenssage
};