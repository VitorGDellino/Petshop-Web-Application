var express = require('express');
var router = express.Router();
var Product = require('../lib/product');
var Service = require('../lib/service');
var User = require('../lib/user');

router.post('/addUser', function(req, res){
     var login = req.body.login;
     var password = req.body.password;
     var photo = req.body.photo;
     var name = req.body.name;
     var email = req.body.email;
     var tel = req.body.tel;
     var address = req.body.address;
     var isAdmin = false;

     var newadmin = User();
     newadmin.login = login;
     newadmin.password = password;
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

          return res.status(200).send("ok");
     });
});

router.post('/addAdmin', function(req, res){
     var login = req.body.login;
     var password = req.body.password;
     var photo = req.body.photo;
     var name = req.body.name;
     var email = req.body.email;
     var tel = req.body.tel;
     var address = req.body.address;
     var isAdmin = true;

     var newadmin = User();
     newadmin.login = login;
     newadmin.password = password;
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

          return res.status(200).send("ok");
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

          return res.status(200).send("ok");
     });
});

router.put('/products/:id', function(req, res){
	var id = req.params.id;
	
	Product.findOne({_id : id}, function(err, foundProduct){
          if(err){
			return res.status(500).send();
		}
		
		if(!foundProduct){
			return res.status(404).send();
		}
		
		if(req.body.name){
			foundProduct.name = req.body.name;
		}
		
		if(req.body.photo){
			foundProduct.photo = req.body.photo; 
		}
		
		if(req.body.descricao){
			foundProduct.descricao = req.body.descricao;
		}
		
		if(req.body.preco){
			foundProduct.preco = req.body.preco;
		}
		
		if(req.body.qtd_estoque){
			foundProduct.qtd_estoque = req.body.qtd_estoque;
		}
		
		if(req.body.qtd_vendida){
			foundProduct.qtd_vendida =req.body.qtd_vendida; 
		}
		
		foundProduct.save( function(err, updateproduct){
			if(err){
				return res.status(500).send();
			}
			
			if(!updateproduct){
				return res.status(404).send();
			}
			
			return res.send("ok");
		});
     });
	
});

router.put('/services/:id', function(req, res){
	var id = req.params.id;
	
	Service.findOne({_id : id}, function(err, foundService){
          if(err){
			return res.status(500).send();
		}
		
		if(!foundService){
			return res.status(404).send();
		}
		
		if(req.body.name){
			foundService.name = req.body.name;
		}
		
		if(req.body.photo){
			foundService.photo = req.body.photo; 
		}
		
		if(req.body.descricao){
			foundService.descricao = req.body.descricao;
		}
		
		if(req.body.preco){
			foundService.preco = req.body.preco;
		}
		
		if(req.body.hora){
			foundService.hora = req.body.hora;
		}
		
		if(req.body.date){
			foundService.date = req.body.date; 
		}
		
		foundService.save( function(err, updateservice){
			if(err){
				return res.status(500).send("erro");
			}
			
			if(!updateservice){
				return res.status(404).send("erro");
			}
			
			return res.send("ok");
		});
     });
	
});

router.post('/services', function(req, res){
     var name = req.body.name;
     var photo = req.body.photo;
     var user = req.body.user;
     var descricao = req.body.descricao;
     var preco = req.body.preco;
     var hora = req.body.hora;
     var date = req.body.date;
     var reserva = req.body.reserva;

     newservice = new Service();
     newservice.name = name;
     newservice.login = user;
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

          return res.status(200).send("ok");
     });
});

router.delete('/products/:id', function(req, res){
     var id = req.params.id;

     Product.findOneAndRemove({_id : id}, function(err, deletedproduct){
          if(err){
               return res.status(500).send("erro");
          }

          if(!deletedproduct){
               return res.status(404).send("erro");
          }

          return res.send("ok");
     });
});

router.delete('/services/:id', function(req, res){
     var id = req.params.id;

     Service.findOneAndRemove({_id : id}, function(err, deletedservice){
          if(err){
               return res.status(500).send("erro");
          }

          if(!deletedservice){
               return res.status(404).send("erro");
          }

          return res.send("ok");
     });
});

module.exports = router;
