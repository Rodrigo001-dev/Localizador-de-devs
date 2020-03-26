const axios = require('axios');
const Dev = require('../models/Dev');
const parseStirngAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

// O controller geralmente tem 5 funções: index: mostrar uma lista, show: mostrar um unico desenvolvedor, store: criar, update: alterar, destroy: deletar

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {   // request: requisição, response: resposta, async: quer dizer que a função pode demorar para responder
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username }); // Mesmo você declarando a mesma varialvel duas ou mais vezes, utilizando o let é possível
         
        if (!dev) {
            const apiresponse = await axios.get(`https://api.github.com/users/${github_username}`); // O await vai aguardar finalizar e então continuar com o restante do código
    
            const { name = login, avatar_url, bio } = apiresponse.data; // Response.data: são os dados da minha resposta 
        
            const techsArray = parseStirngAsArray(techs);
        
            const location = {
               type: 'Point',
               coordinates: [longitude, latitude],
            }
        
        
            dev = await Dev.create({
               github_username,
               name,
               avatar_url,
               bio,
               techs: techsArray,
               location,
            });

            // Filtrar as conexões que estão há no máximo 10km de distância 
            // e que o novo dev tenha  pelo menos uma das tecnologias filtradas

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            );

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
    
        return response.json(dev);
    },

    async update() {

    },

    async destroy() {
        
    },
};