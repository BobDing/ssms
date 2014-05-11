var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/store');
var db = mongoose.connection;
var Product;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  var Schema = mongoose.Schema;
  var productSchema = new Schema({
    itemName:    String,
    itemAlias:   String,
    mfgName:     String,
    mfgItemName: String,
    costPrice:   Number,
    sellPrice:   Number,
    inventory:   String,
    description: String,
    createDate:  { type: Date, default: Date.now },
    updateDate:  { type: Date, default: Date.now },
    isActive:    Boolean,
    images: [{ url: String, originalName: String }],
  });
  Product = mongoose.model('Product', productSchema);
});

var router = express.Router();

router.post('/add', function(req, res) {
  // create a product
  var product = new Product({
    itemName:    req.body.itemName,
    itemAlias:   req.body.itemAlias,
    mfgName:     req.body.mfgName,
    mfgItemName: req.body.mfgItemName,
    costPrice:   req.body.costPrice,
    sellPrice:   req.body.sellPrice,
    inventory:   req.body.inventory,
    description: req.body.description,
    images:      req.body.files
  });

  // var imagesJSON = "images: [";
  // //if()
  // for (var i = 0; i < req.body.files.length; i++) {
  //   var url = req.body.files[i].url;
  //   var originalName = req.body.files.originalName[i];
  //   imagesJSON = imagesJSON + "{url:" + url + ",originalName:" + originalName + "}";
  // };
  // var imagesJSON = imagesJSON + "]";
  // product.images = imagesJSON;

  //mongoose.connect('mongodb://localhost/mydb');
  product.save(function(err) {
    if (err) // ...
      console.log('error');
    //mongoose.disconnect();
  });
  res.redirect('/');
});

router.get('/listAll', function(req, res) {
  Product.find( {}, function(err, products) {
    if (!err){ 
       var obj = new Object();
       obj.data = products;
       res.json(obj);
     }
    else { throw err;}
  });

  // Product.find().lean().exec(function (err, docs) {
  //   addProperty(docs);
  //   res.json(JSON.stringify(docs));
  // });

});

module.exports = router;