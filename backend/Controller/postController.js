import Post from "../Models/postModel.js";
import asyncHandler from '../Middleware/asyncHandler.js'

const createPost = asyncHandler(async (req, res) => {
    try {
        const { title, author, categories, status, description } = req.body;
        switch (true) {
            case !title:
                res.status(400).json({ error: "title is required" })
            case !author:
                res.status(400).json({ error: "author is required" })
            case !categories:
                res.status(400).json({ error: "atleast one category is required" })
            case !status:
                res.status(400).json({ error: "status is required" })
            case !description:
                res.status(400).json({ error: "description is required" })

        }

        const newPost = await new Post({ ...req.body })
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

const getAllPostForAdmin = asyncHandler(async (req, res) => {
    try {
        const allPosts = await Post.find({}).populate("categories", "name")
        res.status(200).json(allPosts)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

const getAllPost = asyncHandler(async (req, res) => {
    try {
        const allPosts = await Post.find({status:"APPROVED"}).populate("categories", "name")
        res.status(200).json(allPosts)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

const getTopPosts = asyncHandler(async (req, res) => {
    try {
        const topPosts = await Post.find({status:"APPROVED"}).sort({ numOfLikes: -1 }).limit(5).populate("categories","name")
        res.status(200).json(topPosts)
    } catch (error) {
        console.error(error)
        res.status(400).json(error)
    }
})

const updatePost = asyncHandler(async (req, res) => {
    try {
        const existingPost = await Post.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidations: true }
        )
        await existingPost.save();
        res.status(201).json(existingPost);
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

const increaseLikes = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) res.status(400).json({ error: "no post found" })
        post.numOfLikes = 1 + post.numOfLikes;
        await post.save();
        res.status(201).json(post)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

const addComment = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) res.status(400).json({ error: "no post found" })
        const { comment } = req.body
    const newComment= {
        comment,
        user:req.user._id
    }
    post.comments.push(newComment)
    await post.save();
    res.status(200).json("comment added ")
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})


const deletePost = asyncHandler(async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json("post deleted successfully")
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

const getPostById = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("categories","name")
        if (!post) res.status(400).json({ error: "no post exists with the given id" })
        res.status(200).json(post)
    } catch (error) {
        console.error(error)
        res.status(400).json(error)
    }
})

const approvePost= asyncHandler(async(req,res)=>{
    try {
         const post = await Post.findById(req.params.id)
        if (!post) res.status(400).json({ error: "no post exists with the given id" })
        post.status="APPROVED"
    await post.save();
    res.status(200).json("Post approved")
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

const allPostByUserId= asyncHandler(async(req,res)=>{
    try {
        const posts= await Post.find({author:req.params.id}).populate("categories","name")
        res.status(200).json(posts)
    } catch (error) {
         console.error(error)
        res.status(400).json(error)
    }
})

export {
    createPost,
    getAllPost,
    updatePost,
    deletePost,
    getPostById,
    getTopPosts,
    increaseLikes,
    addComment,
    approvePost,
    allPostByUserId,
    getAllPostForAdmin
}