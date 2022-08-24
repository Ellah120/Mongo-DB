const express = require('express')
const app = express()
const mongoose = require('mongoose')
const shoeRoute = require('./Routes/shoe.routes')
const userRoute = require('./Routes/user.route')
const auth = require('./middleware/verifyToken')
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({ extended: false}));

mongoose.connect(process.env.DB_URL)
.then(console.log('DB Up and Running'))
.catch((err) => console.log(err.message));


app.get('/', (req,res) => {
  res.send('<h1>Home Route</h1>')
});

app.use('/shoe', shoeRoute);

app.use('/api', userRoute);

app.get('/about', auth, (req,res) => {
  res.json({message: 'My about route'})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on Port:${PORT}`))