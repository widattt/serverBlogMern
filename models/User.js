const mongoose = require('mongoose')

const userShema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        require: [true, 'Name must be required']
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        require: [true, 'Email must be required']
    },
    password: {
        type: String,
        trim: true,
        required: [true,'Password must be required'],
        minlength: [6, 'Password must be at least 6 characters']
    }
}, { timestamps: true})

const User = mongoose.model('User', userShema)
module.exports = User