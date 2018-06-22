var express = require('express');
var router = express.Router();

router.get('/debug', function(req, res){
     res.send("Working");
});

router.get('/login/:username/:password', function(req, res){
     var username = req.params.username;
     var password = req.params.password;

     if(username === "vitor"){
          res.send("OK");
     }else{
          res.send("ERROR");
     }
     //Checando no BD
});

router.get('/loginAdmin/:username/:password', function(req, res){
     var username = req.params.username;
     var password = req.params.password;

     if(username === "vitor"){
          res.send("OK");
     }else{
          res.send("ERROR");
     }
     //Checando no BD
});

router.get('/products', function(req, res){
     res.send("MANDANDO TODOS OS PRODUTOS");
});

router.get('/services', function(req, res){
     res.send("MANDANDO TODOS OS SERVIÇOS");
});

module.exports = router;
