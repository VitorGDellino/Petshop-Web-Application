var express = require('express');
var router = express.Router();

router.get('/debug', function(req, res){
     res.send("Working");
});

router.post('/addUser', function(req, res){

});

router.post('/addAdmin', function(req, res){

});

router.post('/products', function(req, res){

});

router.post('/services', function(req, res){

});


module.exports = router;
