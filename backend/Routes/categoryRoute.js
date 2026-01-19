import express from "express";
import {authenticate, authorizeAdmin} from '../Middleware/authMiddleware.js'
import { createCategory, updateCategory, deleteCategory ,getAllCategory, readCategory} from '../Controller/categoryController.js'

const router=express.Router()
// admin only routes
router.route("/").post(authenticate, authorizeAdmin,createCategory)
router.put("/:id",authenticate,authorizeAdmin,updateCategory)
router.delete("/:id",authenticate,authorizeAdmin,deleteCategory)

router.get("/categories",getAllCategory);
router.get("/:id",readCategory);



export default router