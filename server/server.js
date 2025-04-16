const express = require('express')
require('dotenv').config();
// require('dotenv').config();
const cors = require('cors')




const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes')
const eventRoutes = require('./routes/eventRoutes')
const { verifyToken } = require('./utils/authMiddleware');
const organiserRoutes = require('./routes/organiserRoutes');   
const userRoutes = require('./routes/userRoutes')

//auth api before verify token
app.use("/api", authRoutes)






// Applying verifyToken to all routes 
app.use(verifyToken);


//later put all the router below verify token api


app.use("/api", eventRoutes)
app.use("/api", organiserRoutes)
app.use("/api", userRoutes) 



const PORT = process.env.PORT ;

app.listen(PORT , ()=>{
   console.log(` server is running on ${PORT}`)
})