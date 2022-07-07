var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FilmeSchema = new Schema({
    nome: String,
    assistido: { type: Boolean, default: false }
});
  
FilmeSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Filme', FilmeSchema);