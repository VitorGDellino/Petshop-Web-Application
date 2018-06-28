var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
     login : {type : String, unique: true},
     password : {type : String},
     photo : {type : String, default : ''},
     name : {type : String},
     email : {type : String},
     tel : {type : Number},
     address : {type : String},
     isAdmin : {type : Boolean, default : false}
});

var User = mongoose.model('users', userSchema);
module.exports = User;
