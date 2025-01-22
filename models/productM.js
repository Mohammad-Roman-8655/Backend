const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
 
  name: { 
    type: String,
     required: true 
    },
  price: { 
    type: Number,
     required: true
     },
  featured: { 
    type: Boolean,
     default: false
     },
  rating: { 
    type: Number,
    min:0,
    max:10,
  },

  company: { 
    type: String, 
    required: true
 }
},{timestamps:true});

module.exports = mongoose.model('Product', productSchema);
