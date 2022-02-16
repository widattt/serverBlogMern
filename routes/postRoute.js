const express = require('express')
const { verifyToken } = require('../middleware/verifyToken')

const { getAllPosts, createOnePost, updateOnePost, deleteOnePost } = require('../controller/postController')

const Router = express.Router()


Router.route('/').get(getAllPosts).post(verifyToken, createOnePost)
Router.route('/:postId').put(verifyToken, updateOnePost).delete(verifyToken, deleteOnePost)

module.exports = Router