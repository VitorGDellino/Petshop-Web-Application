var mongoose = require('mongoose');

var petSchema = new mongoose.Schema({
     login : {type : String},
     petName : {type : String},
     petPhoto : {type : String, default : ''},
     race : {type : String},
     age : {type : Number}
});

var Pet = mongoose.model('pet', petSchema);
module.exports = Pet;
