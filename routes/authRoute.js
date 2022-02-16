const express = require('express')
const { register, login, getCurrentUser } = require('../controller/authController')
const { checkCurrentUser } = require('../middleware/checkCurrentUser')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', checkCurrentUser, getCurrentUser)


module.exports = router
