var mongoose = require('mongoose');

var saleSchema = new mongoose.Schema({
     user : {type : String},
     itens : {type : String},
     total : {type : String},
});

var Sale = mongoose.model('sales', saleSchema);
module.exports = Sale;
