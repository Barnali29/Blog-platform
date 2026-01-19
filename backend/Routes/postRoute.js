import express from 'express'
import { addComment, allPostByUserId, approvePost, createPost, deletePost, getAllPost, getPostById, getTopPosts, increaseLikes, updatePost, getAllPostForAdmin } from '../Controller/postController.js'
import { authenticate, authorizeAdmin } from '../Middleware/authMiddleware.js'

const router =express.Router()

router
.route("/")
.get(getAllPost)
.post(authenticate ,createPost)


router.route("/:id/add-likes")
.post(authenticate,increaseLikes)

router.route("/:id/add-comment")
.post(authenticate,addComment)

router
.route("/top-posts")
.get(getTopPosts)


router
.route("/:id")
.put(authenticate,updatePost)
.get(authenticate,getPostById)
.delete(authenticate,authorizeAdmin,deletePost)

router
.route("/:id/approve")
.post(authenticate,authorizeAdmin,approvePost)

router
.route("/admin/posts")
.get(authenticate,authorizeAdmin,getAllPostForAdmin)

router
.route("/user-posts/:id")
.get(authenticate,allPostByUserId)

export default router



