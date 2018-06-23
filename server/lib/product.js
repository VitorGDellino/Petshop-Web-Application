var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
     name : {type : String},
     photo : {type : String},
     descricao : {type : String},
     preco : {type : Number},
     qtd_estoque : {type : Number, default : 0},
     qtd_vendida : {type : Number, default : 0}
});

var Stock = mongoose.model('stock', productSchema);
module.exports = Stock;
