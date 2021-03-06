var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/test');

  var Category =
    mongoose.model('Category', require('./category'), 'categories');
  var Product =
    mongoose.model('Product', require('./product'), 'products');

  var models = {
    Category: Category,
    Product: Product
  };

  // To ensure DRY-ness (don't repeat yourself), register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
};
