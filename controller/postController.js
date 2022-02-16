const Post = require('../models/Post')


exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('author', ['name']).select('content createdAt')
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: { posts }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.createOnePost = async (req, res, next) => {
    
    try {
        const newPost = new Post({
            ...req.body,
            author: req.user
        })
        await newPost.save()

        res.status(200).json({
            status: 'success',
            data: { newPost }
        })
    } catch (error) {
        
    }
}

exports.updateOnePost = async (req, res, next) => {
    const postId = req.params.postId
    try {
        const postUpdate = await Post.findByIdAndUpdate({_id: postId}, {...req.body }, {new: true})
        if(!postUpdate) {
            return res.status(400).json({
                message: 'failure'
            })
        }
        res.status(200).json({
            status: 'success',
            data: { postUpdate, author: req.user }
        })
    } catch (error) {
        
    }
}

exports.deleteOnePost = async (req, res, next) => {
    const postId = req.params.postId
    try {

        const postDelete = await Post.findOneAndDelete({_id: postId})

        res.status(200).json({
            status: 'success',
            message: 'Deleted post successfully',
            deletedPost: postDelete
        })
    } catch (error) {
        
    }
}