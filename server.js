require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const postRoute = require('./routes/postRoute.js')
const { connectDB } = require('./config/db')

connectDB()
const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/v1/auth', authRoute)
app.use('/api/v1/post', postRoute)



const port = process.env.APP_PORT || 5000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})  