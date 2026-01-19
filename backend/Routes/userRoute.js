import express from 'express'
import { 
    createUser,
    login ,
    logoutCurrentUser,
    getAllUsers, 
    getCurrentUserProfile, 
    updateUserProfile,
    deleteUserById,
    getUserById,
    updateUserById } from '../Controller/userController.js';
import { authenticate, authorizeAdmin } from '../Middleware/authMiddleware.js';
const router=express.Router()

router.route('/').post(createUser).get(authenticate, authorizeAdmin,getAllUsers); // only admin can get all users details , hence for that the user needs to be authenticated and authorized 
router.route('/auth').post(login)
router.route('/logout').post(logoutCurrentUser)
router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateUserProfile);

// for admin only 
router.route('/:id')
.delete(authenticate, authorizeAdmin, deleteUserById)
.get(authenticate, authorizeAdmin, getUserById)
.put(authenticate, authorizeAdmin, updateUserById);

export default router;