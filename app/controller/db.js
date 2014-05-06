// Mongodb
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/mydb');

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
  isActive:    Boolean
});

var Product = mongoose.model(
  'Product', productSchema
);

var product = new Product({
  itemName: 'i2',
  itemALias: 'i2_alias'
});

product.save(function(err) {
  if (err) // ...
    console.log(err);

  mongoose.disconnect();
});


