var express = require('express');
var router = express.Router();
var Product = require('../lib/product');
var Service = require('../lib/service');
var User = require('../lib/user');

router.post('/login', function(req, res){
     var username = req.body.login;
     var password = req.body.password;

     User.findOne({login : username, passWord : password}, function(err, user){
          if(err){
               return res.send("Ocorreu um erro");
          }

          if(!user){
               return res.send("Usuário e Senha inválidos");
          }

          return res.send("Seja bem vindo");
     });
     //Checando no BD
});

router.post('/loginAdmin', function(req, res){
     var username = req.body.login;
     var password = req.body.password;

     User.findOne({login : username, passWord : password, isAdmin : true}, function(err, user){
          if(err){
               return res.send("Ocorreu um erro");
          }

          if(!user){
               return res.send("Usuário e Senha inválidos");
          }

          return res.send("Seja bem vindo administrador");
     });
     //Checando no BD
});

router.get('/products', function(req, res){
     Product.find({}, function(err, foundData){
          if(err){
               console.log();
               return res.status(500).send();
          }

          res.send(foundData);
     });
});

router.get('/services', function(req, res){
     Service.find({}, function(err, foundData){
          if(err){
               console.log();
               return res.status(500).send();
          }

          res.send(foundData);
     });
});

router.get('/users', function(req, res){
     User.find({}, function(err, foundData){
          if(err){
               console.log();
               return res.status(500).send();
          }

          res.send(foundData);
     });
});

module.exports = router;
