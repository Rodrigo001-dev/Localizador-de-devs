const socketio = require('socket.io');
const parseStringAsArry = require('./utils/parseStringAsArray');
const calculeteDistance = require('./utils/calculeteDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server); // Eu passei o server(servidor como parametros)

    io.on('connection', socket =>{
       const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArry(techs),
        });
    }); // Eu estou adicionando um event listen, eu estou ouvindo um evento de connection. Toda vez que um usuario se conectar na minha aplicação via protocolo WebSocket eu vou receber um objeto chamado socket 
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculeteDistance(coordinates, connection.coordinates) <10 // Eu estou comparando as cordenadas do novo dev cadastrado com as cordenadas armazanadas aqui em cada uma das connections de WebSocket
        && connection.techs.some(item => techs.includes(item))
    }) // Eu vou percorrer todas as minhas connections WebSocket e vou realizar um filtro, eu quero filtrtar essas connections
} // O findConnections recebe as cordenadas do no dev cadastrado e as tecnologias e ele vai retornar todas as conexões que estão á 10km das cordenadas e que também estão esperando as devs que trabalham com essa tecnologia  

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });
}