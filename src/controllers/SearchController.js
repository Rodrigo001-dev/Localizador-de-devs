const Dev = require('../models/Dev');
const parseStirngAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStirngAsArray(techs);

        const devs = await Dev.find({
            techs: {
               $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        // Buscar todos os devs num raio de 10Km
        // Filtrar por tecnologias
        return response.json({ devs });
    }
}