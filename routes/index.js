var express = require('express');
var router = express.Router();
var elasticsearchclient = require('../src/utils/elasticsearchclient.js');
var model = require('../src/models/model.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Main' });
});
router.get('/other', function(req, res) {
  res.render('other', { title: 'Other' });
});
router.post('/saveData', function(req, res) {
	
  var data = {name : req.body.nameInput};

  model.saveData(data, function(results){
    res.send(results);
  });
});

router.get('/fetchData', function(req, res) {
  
  var data = req.query.searchInput;

  model.fetchData(data, function(results){
    res.send(results);
  });

});

module.exports = router;