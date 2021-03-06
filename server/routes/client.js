var express = require('express');
var router = express.Router();
var Pet = require('../lib/pet');
var User = require('../lib/user');
var Product = require('../lib/product');
var Service = require('../lib/service');

router.get('/pets/:username', function(req, res){
     var login = req.params.username;

     Pet.find({login : login}, function(err, pets){
          if(err){
               return res.send("Um erro ocorreu");
          }

          if(!pets){
               return res.send("Nenhum pet encontrado");
          }

          return res.send(pets);
     })
});

router.get('/services/:username/:petname', function(req, res){
     res.send("TODOS OS SERVICOS DO " + req.params.username);
});

router.post('/addPet', function(req, res){
     var login = req.body.login;
     var petName = req.body.petName;
     var petPhoto = req.body.petPhoto;
     var race = req.body.race;
     var age = req.body.age;

     var newPet = new Pet();

     newPet.login = login;
     newPet.petName = petName;
     newPet.petPhoto = petPhoto;
     newPet.race = race;
     newPet.age = age;

     newPet.save(function(err, pet){
          if(err){
               return res.status(500).send();
          }
          return res.status(200).send();
     });
});

router.delete('/pets/:id', function(req, res){
     var id = req.params.id;

     Pet.findOneAndRemove({_id : id}, function(err, deletedpet){
          if(err){
               return res.status(500).send();
          }

          if(!deletedpet){
               return res.status(404).send();
          }

          res.send("ok");
     });
});

router.put('/pets/:id', function(req, res){
     var id = req.params.id;

     Pet.findOne({_id : id}, function(err, foundpet){
          if(err){
               return res.status(500).send();
          }

          if(!foundpet){
               return res.status(404).send();
          }

          if(req.body.petName){
               foundpet.petName = req.body.petName;
          }

          if(req.body.photo){
               foundpet.petPhoto = req.body.photo;
          }

          if(req.body.race){
               foundpet.race = req.body.race;
          }

          if(req.body.age){
               foundpet.age = req.body.age;
          }

          foundpet.save(function(err, updatedpet){
               if(err){
                    return res.status(500).send();
               }

               if(!updatedpet){
                    return res.status(404).send();
               }

               res.send("ok");
          });
     });
});

router.put('/userUpdate/:username', function(req, res){
     var username = req.params.username;

     User.findOne({login : username}, function(err, foundUser){
          if(err){
               return res.send("Ocorreu um erro");
          }

          if(!foundUser){
               return res.send("Usuário nao encontrado");
          }

          if(!req.body.password){
               return res.send("Você deve colocar a senha antiga");
          }else{
               var password = req.body.password;
               if(foundUser.password === password){
                    if(req.body.newPassWord){
                         if(req.body.newPassWord === req.body.newPassWord2){
                              foundUser.password = req.body.newPassWord;

                         }else{
                              return res.send("A novas senhas devem ser iguais");
                         }
                    }

                    if(req.body.photo){
                         foundUser.photo = req.body.photo;
                    }

                    if(req.body.name){
                         foundUser.name = req.body.name
                    }

                    if(req.body.email){
                         foundUser.email = req.body.email;
                    }

                    if(req.body.tel){
                         foundUser.tel = req.body.tel;
                    }

                    if(req.body.address){
                         foundUser.address = req.body.address;
                    }

                    foundUser.save(function(err, updateduser){
                         if(err){
                              return res.send("Um erro ocorreu");
                         }

                         return res.send("OK");
                    });

               }else{
                    return res.send("Senha incorreta");
               }
          }
     });
});

router.put('/dateservice', function(req, res){
     var id = req.body.id;
     var petname = req.body.petname;
     var user = req.body.user;

     Service.findOne({_id : id}, function(err, foundService){
          if(err){
               return res.status(500).send();
          }

          if(!foundService){
               return res.status(404).send();
          }

          if(foundService.reserva !== "none"){
               return res.send("Horário indisponível");
          }

          foundService.reserva = petname;
          foundService.login = user;

          foundService.save(function(err, updatedService){
               if(err){
                    return res.status(500).send();
               }

               if(!updatedService){
                    return res.status(404).send();
               }

               return res.send("OK");
          });
     });
});

module.exports = router;
