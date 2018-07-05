var express = require('express');
var router = express.Router();
var Product = require('../lib/product');
var Service = require('../lib/service');
var User = require('../lib/user');
var Sale = require('../lib/sale');

router.post('/login', function(req, res){
     var username = req.body.login;
     var password = req.body.password;

	 console.log(username);
	 console.log(password);

     User.findOne({login : username, password : password}, function(err, user){
          if(err){
               return res.status(200).send("Ocorreu um erro");
          }

          if(!user){
               return res.status(200).send("Usuário e Senha inválidos");
          }

          return res.status(200).send("ok");
     });
     //Checando no BD
});

router.post('/loginAdmin', function(req, res){
     var username = req.body.login;
     var password = req.body.password;

     User.findOne({login : username, password : password, isAdmin : true}, function(err, user){
          if(err){
               return res.status(200).send("Ocorreu um erro");
          }

          if(!user){
               return res.status(200).send("Usuário e Senha inválidos");
          }

          return res.status(200).send("ok");
     });
     //Checando no BD
});

router.get('/products', function(req, res){
     Product.find({}, function(err, foundData){
          if(err){
               console.log();
               return res.status(500).send();
          }

          if(!foundData){
               return res.status(404).send();
          }

          return res.send(foundData);
     });
});

router.get('/products/:id', function(req, res){
     var id = req.params.id;

     Product.find({_id : id}, function(err, foundProduct){
          if(err){
               return res.status(500).send("erro");
          }

          if(!foundProduct){
               return res.status(404).send("erro");
          }

          return res.send(foundProduct);
     });
});

router.get('/services', function(req, res){
     Service.find({}, function(err, foundData){
          if(err){
               return res.status(500).send();
          }

          if(!foundData){
               return res.status(404).status;
          }

          res.send(foundData);
     });
});

router.get('/servicesById/:id', function(req, res){
     var id = req.params.id;
	 Service.find({_id : id}, function(err, foundService){
          if(err){
               return res.status(500).send("erro");
          }

          if(!foundService){
               return res.status(404).send("erro");
          }

          return res.send(foundService);
     });
});

router.get('/services/:date', function(req, res){
     var date = req.params.date;
     // console.log("ta aqui "+date);
     Service.find({date : date}, function(err, foundService){
          if(err){
               return res.status(500).send();
          }

          if(!foundService){
               return res.status(404).send();
          }

          return res.send(foundService);
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


router.put('/updateStock', function(req, res){
     var id = req.body.id;
     var qtd = req.body.qtd;

     Product.findOne({_id : id}, function(err, foundProduct){
          if(err){
               return res.status(500).send();
          }

          if(!foundProduct){
               return res.status(404).send();
          }

          foundProduct.qtd_estoque -= qtd;
          foundProduct.qtd_vendida +=qtd;

          foundProduct.save(function(err, updatedProduct){
               if(err){
                    return res.status(500).send();
               }

               return res.send("OK");
          });
     });
});

router.get('/productAvailable/:id/:qtd', function(req, res){
     var id = req.params.id;
     var qtd = req.params.qtd;
     Product.findOne({_id : id}, function(err, foundProduct){
          if(err){
               return res.status(500).send();
          }

          if(!foundProduct){
               return res.status(404).send();
          }

          var qtd_estoque = foundProduct.qtd_estoque


          if(qtd_estoque - qtd < 0){
               return res.send("Não há essa quantidade de produtos no estoque");
          }
          // Tive que converter pra String porque int nao funciona, lembrar de converter no client
          return res.send("OK");
     });
});

router.post('/buy', function(req, res){
     var username = req.body.user;
     var itens = req.body.itens;
     var total = req.body.total;

     var newSale = Sale();
     newSale.user = username;
     newSale.itens = itens;
     newSale.total = total;

     newSale.save(function(err, savedSale){
          if(err){
               return res.status(500).send();
          }

          if(!savedSale){
               return res.status(404).send();
          }

          return res.send("Venda efetuada com sucesso");
     });
});

router.get('/sale', function(req, res){
     Sale.find({}, function(err, foundSales){
          if(err){
               return res.status(500).send();
          }

          if(!foundSales){
               return res.status(404).send();
          }

          return res.send(foundSales);
     });
});


module.exports = router;
