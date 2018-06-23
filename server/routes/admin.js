var express = require('express');
var router = express.Router();
var Product = require('../lib/product');
var Service = require('../lib/service');
var User = require('../lib/user');

router.post('/addUser', function(req, res){
     var login = req.body.login;
     var passWord = req.body.passWord;
     var photo = req.body.photo;
     var name = req.body.name;
     var email = req.body.email;
     var tel = req.body.tel;
     var address = req.body.address;
     var isAdmin = false;

     var newadmin = User();
     newadmin.login = login;
     newadmin.passWord = passWord;
     newadmin.photo = photo;
     newadmin.name = name;
     newadmin.email = email;
     newadmin.tel = tel;
     newadmin.address = address;
     newadmin.isAdmin = isAdmin;

     newadmin.save(function(err, savedadmin){
          if(err){
               return res.status(500).send();
          }

          return res.status(200).send();
     });
});

router.post('/addAdmin', function(req, res){
     var login = req.body.login;
     var passWord = req.body.passWord;
     var photo = req.body.photo;
     var name = req.body.name;
     var email = req.body.email;
     var tel = req.body.tel;
     var address = req.body.address;
     var isAdmin = true;

     var newadmin = User();
     newadmin.login = login;
     newadmin.passWord = passWord;
     newadmin.photo = photo;
     newadmin.name = name;
     newadmin.email = email;
     newadmin.tel = tel;
     newadmin.address = address;
     newadmin.isAdmin = isAdmin;

     newadmin.save(function(err, savedadmin){
          if(err){
               return res.status(500).send();
          }

          return res.status(200).send();
     });

});

router.post('/products', function(req, res){
     var name = req.body.name;
     var photo = req.body.photo;
     var descricao = req.body.descricao;
     var preco = req.body.preco;
     var qtd_estoque = req.body.qtd_estoque;
     var qtd_vendida = req.body.qtd_vendida;

     var newproduct = new Product();
     newproduct.name = name;
     newproduct.photo = photo;
     newproduct.descricao = descricao;
     newproduct.preco = preco;
     newproduct.qtd_estoque = qtd_estoque;
     newproduct.qtd_vendida = qtd_vendida;

     newproduct.save(function(err, savedproduct){
          if(err){
               console.log(err);
               return res.status(500).send();
          }

          return res.status(200).send();
     });
});

router.post('/services', function(req, res){
     var name = req.body.name;
     var photo = req.body.photo;
     var descricao = req.body.descricao;
     var preco = req.body.preco;
     var hora = req.body.hora;
     var date = req.body.date;
     var reserva = req.body.reserva;

     newservice = new Service();
     newservice.name = name;
     newservice.photo = photo;
     newservice.descricao = descricao;
     newservice.preco = preco;
     newservice.hora = hora;
     newservice.date = date;
     newservice.reserva = reserva;

     newservice.save(function(err, savedservice){
          if(err){
               return res.status(500).send();
          }

          return res.status(200).send();
     });
});

router.delete('/product/:id', function(req, res){
     var id = req.params.id;

     Product.findOneAndRemove({_id : id}, function(err, deletedproduct){
          if(err){
               return res.send("Ocorreu um erro");
          }

          if(!deletedproduct){
               return res.send("Produto nao encontrado");
          }

          return res.send("Produto deletado com sucesso");
     });
});

module.exports = router;
