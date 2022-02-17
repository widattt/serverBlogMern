require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const postRoute = require('./routes/postRoute.js')
const { connectDB } = require('./config/db')

connectDB()
const app = express()

app.use(function(req, res, next) {
    res.header ('Access-Control-Allow-Origin', '*')
    res.header ('Access-Control-Allow-Credentials', true)
    res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header ('Access-Control-Allow-Headers', 'Content-Type')
})
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '30mb' }));


app.use('/api/v1/auth', authRoute)
app.use('/api/v1/post', postRoute)



const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})  