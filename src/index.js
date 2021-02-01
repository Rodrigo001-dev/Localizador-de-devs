const express = require('express'); // const = variável constante
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // Esse modulo http é utilizado pelo express por baixo dos panos para fazer com que nossa aplicação usa as aquisições http(métodos Get, Post, Put, Delete), tecnicamente falando esse modulo cria o servidor 

const Routes = require('./Routes');
const { setupWebsocket } = require('./websocket');

const app = express(); // express é uma função
const server = http.Server(app); // A partir desse momento eu tenho o meu servidor http fora do express, então agora eu consigo trabalhar com ele diretamente

setupWebsocket(server);

mongoose.connect('mongodb+srv://yourUser:yourPassword@cluster0-b5zoi.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json()); // o express.json precisa vir antes das rotas, porque o node.js lê os arquivos de forma linear, de cima para baixo 
app.use(Routes);

// Métodos HTTP: GET: receber uma informação, POST: criar uma informação, PUT: editar algum recurso da minha aplicação, DELETE: deletar alguma informação ou recurso

// Tipos de parãmetros:

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Indentificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

//MongoDB (Não-relacional) 


server.listen(3333); // depois do . são os métodos
