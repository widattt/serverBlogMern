const { response } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



exports.register = async (req, res, next) => {
    try {
        const user = new User(req.body)
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        const token = jwt.sign({userId: user._id}, process.env.APP_SECRET)
        
        await user.save()
        res.status(200).json({
            status: 'success', 
            data: { token, username: user.name }
        })
    } catch (error) {
        console.log(error)
    }
}


exports.login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if(!user) {
            
            return res.status(400).json({
                status: 'failure',
                message: 'Email is not exists'
            })
            
        }
        
        if(bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({userId: user._id}, process.env.APP_SECRET)
            res.status(200).json({
                status: 'success',
                data: { token, username: user.name }
            })
        }
        else {
            return res.status(400).json({
                status: 'failure',
                message: 'Password is not correct'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.getCurrentUser = async (req, res, next ) => {
    try {
        const data = { user: null}
        if(req.user) {
            const user = await User.findOne({_id: req.user})
            data.user = {username: user.name}
        }

        res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (error) {
        res.json(error)        
    }
}