const mongoose = require('mongoose');
const Schema = mongoose.Schema

const shoeSchema = new Schema({
  // brand: {
  //   type: String,
  //   required: true
  // },
  brand: String,
  size: String,
  price: Number,
  color: String,
  quantity: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref:'User'
  }
});

module.exports = mongoose.model("Shoe", shoeSchema);