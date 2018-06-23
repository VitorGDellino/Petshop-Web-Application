var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
     name : {type : String},
     photo : {type : String},
     descricao : {type : String},
     preco : {type : Number},
     hora : {type : Number},
     date : {type : String},
     reserva : {type : String, default : 'none'}
});

var Service = mongoose.model('services', serviceSchema);
module.exports = Service;
