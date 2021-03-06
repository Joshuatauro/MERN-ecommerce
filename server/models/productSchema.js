const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  productTitle: {
    required: true,
    type: String
  },
  productImg: {
    required: true,
    type: String,
  },
  productPrice: {
    required: true,
    type: Number
  },
  productSize: {
    required: true,
    type: Array
  },
  productColors: {
    required: true,
    type: Array
  }
}, {
  timestamps: true
})

const Product = mongoose.model("product", productSchema)

module.exports = Product