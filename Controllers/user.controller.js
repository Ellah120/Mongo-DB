const User = require('../Models/user.model')
const argon2 = require('argon2')
const jwt = require("jsonwebtoken")
// const expressjwt = require("express-jwt")

exports.createUser = async (req, res) => {
const {username, email} = req.body;
const password = await argon2.hash(req.body.password)

const existingUser = await User.findOne({email})
if(existingUser){
 return res.status(409).json({message: 'User already exists, Please Login'})
//  res.redirect('/')
}

try {
  const user = await User.create({
    username,
    email,
    password
  })
  return res.status(201).json(`New User ${user.username} created`)
} catch(err) {
  return res.status(500).json({message: 'user creation failed' + err})
}
}

exports.loginUser = async (req, res) => {
  try {
  const {email, password} = req.body
   
  const user = await User.findOne({email})
  if(!user){
    return res.status(404).json('invalid email')
  }

  const match = await argon2.verify(user.password, password)
  
if(match) {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({

    id: user._id,
    email: user.email
  },
  jwtSecretKey,
  // {
  //   expiresIn: "60s"
  // }
  )
  return res.header("auth-token", token).send(token);
}  
} catch(error) {
  return res.status(409).json({message: `Invalid Passwod ${error}`})
} 
}

// exports.isLoggedIn = (req, res) => {
//   let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//   let jwtSecretKey = process.env.JWT_SECRET_KEY;

//   try {
//     const token = req.header(tokenHeaderKey);

//     const verified = jwt.verify(token, jwtSecretKey);
//     if(verified) {
//       return res.send('Successfully Verified');
//     }
//   } catch(error) {
//     return res.status(401).send(error);
//   }
// };
  