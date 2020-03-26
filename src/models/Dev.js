// Models são as representações de entidades dentro da nossa aplicação
// entidades são informações que queremos armazenar dentro do banco de dados

const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');


const DevSchema = new mongoose.Schema({
   name: String,
   github_username: String,
   bio: String,
   avatar_url: String,
   techs: [String], // [String]: várias Strings
   location: {
      type: PointSchema,
      indexes: '2dsphere'
   }
});

module.exports = mongoose.model('Dev', DevSchema);