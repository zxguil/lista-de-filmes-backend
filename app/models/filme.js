var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FilmeSchema = new Schema({
    nome: String,
    assistido: Boolean
});

module.exports = mongoose.model('Filme', FilmeSchema);