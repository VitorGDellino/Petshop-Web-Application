//Adciona admin
var async = require('async');
var Pet = require('./lib/pet');
var User = require('./lib/user');
var Product = require('./lib/product');
var Service = require('./lib/service');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/petshop');

function product(name, photo, descricao, preco, qtd_estoque, qtd_vendida, cb){
     newproduct =  new Product();
     newproduct.name = name;
     newproduct.photo = photo;
     newproduct.descricao = descricao;
     newproduct.preco = preco;
     newproduct.qtd_estoque = qtd_estoque;
     newproduct.qtd_vendida = qtd_vendida;

     newproduct.save(function(err, savedproduct){
          if(err){
               console.log("Erro ao inserir");
               cb(null, savedproduct)
               return;
          }

          console.log("Inserido com sucesso " + savedproduct.name);
          cb(null, savedproduct);
     });
}

function user(login, password, photo, name, email, tel, address, isAdmin, cb){
     var newuser = new User();

     newuser.login = login;
     newuser.password = password;
     newuser.photo = photo;
     newuser.name = name;
     newuser.email = email;
     newuser.tel = tel;
     newuser.address = address;
     newuser.isAdmin = isAdmin

     newuser.save(function(err, saveduser){
          if(err){
               console.log("Erro ao inserir");
               cb(null, saveduser);
               return;
          }

          console.log("Inserido com sucesso " + saveduser.name);
          cb(null, saveduser);

     });
}

function service(name, login, photo, descricao, preco, hora, date, reserva, cb){
     var newservice = new Service();

     newservice.name = name;
     newservice.login = login;
     newservice.photo = photo;
     newservice.descricao = descricao;
     newservice.preco = preco;
     newservice.hora = hora;
     newservice.date = date;
     newservice.reserva = reserva;

     newservice.save(function(err, savedservice){
          if(err){
               console.log("Erro ao inserir");
               cb(null, savedservice);
               return;
          }

          console.log("Inserido com sucesso " + savedservice.name);
          cb(null, newservice);
     });
}

function pet(login, petname, petphoto, race, age, cb){
     var newpet = new Pet();

     newpet.login = login;
     newpet.petName = petname;
     newpet.petPhoto = petphoto;
     newpet.race = race;
     newpet.age = age;

     newpet.save(function(err, savedpet){
          if(err){
               console.log("Erro ao inserir");
               cb(null, savedpet);
               return;
          }

          console.log("Inserido com sucesso " + savedpet.petName);
          cb(null, savedpet);
     });
}

function createProduct(cb) {
    async.series([
        function(callback) {
          product("Ração", "", "Ração para cachorro", 50.99, 88, 0, callback);
        },
        function(callback) {
          product("Coleira", "", "Coleira para animais", 12.99, 20, 0, callback);
        }
        ],
        // optional callback
        cb);
}

function createUser(cb){
     async.series([
          function(callback){
               user("vitor", "123", "", "Vitor", "vitor@usp.br", 38070477, "Av 5", true, callback);
          },

          function(callback){
               user("jorge", "123", "", "Jorge", "jorge@usp.br", 38070577, "Av 4", true, callback);
          },

          function(callback){
               user("raul", "123", "", "Raul", "raul@usp.br", 38070677, "Av 3", false, callback);
          }
          ], cb);
}

function createService(cb){
     async.series([
          function(callback){
               service("Banho", "none", "", "Lavagem de animais", 39.99, 2, "2018-07-05", "none", callback);
          },

          function(callback){
               service("Tosa", "none", "", "Tosa de animais", 39.99, 4, "2018-07-05", "none", callback);
          },

          function(callback){
               service("Banho", "none", "", "Lavagem de animais", 39.99, 2, "2018-07-04", "none", callback);
          }
          ], cb);
}

function createPet(cb){
     async.series([
          function(callback){
               pet("vitor", "lilica", "", "Vira-lata", 2, callback);
          },

          function(callback){
               pet("jorge", "yuki", "", "Vira-lata", 3, callback);
          },

          function(callback){
               pet("jorge", "gumer", "", "Vira-lata", 4, callback);
          }
          ], cb);
}


async.series([
    createProduct,
    createUser,
    createService,
    createPet
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        //console.log('BOOKInstances: '+bookinstances);

    }
    // All done, disconnect from database
    mongoose.connection.close();
});
