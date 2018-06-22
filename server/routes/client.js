var express = require('express');
var router = express.Router();


router.get('/debug', function(req, res){
     res.send("Working");
});

router.get('/pets/:username', function(req, res){
     res.send("TODOS OS PETS DO " + req.params.username);
});

router.get('/services/:username', function(req, res){
     res.send("TODOS OS SERVICOS DO " + req.params.username);
});

router.post('/dateservice', function(req, res){

});

router.post('/buy', function(req, res){

});


module.exports = router;
