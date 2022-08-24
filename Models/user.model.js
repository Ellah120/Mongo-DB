const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
username: {
 type: String,
 required: true 
},

email: String,

password: {
  type: String,
  required: true,
  max: 30,
  min: 8
},

timestamps: {
  type: Date,
  default: Date.now()
}, 

shoe:[{
  type: Schema.Types.ObjectId,
  ref:'Shoe'
}]
});

module.exports = mongoose.model('User', userSchema);