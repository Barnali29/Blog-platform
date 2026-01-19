import asyncHandler from "./asyncHandler.js"
import jwt from "jsonwebtoken"
import User from "../Models/userModel.js";
const authenticate = asyncHandler(async (req, res, next) => {

    const token = req.cookies?.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findOne({ _id: decoded.userId }).select("-password")
            req.user=user;
            
            next();
        } catch (error) {
            res.status(401);
            throw new Error("authorization failed , no token ")
        }
    }
    else {
        res.status(401);
        throw new Error("not authorized, no token")
    }
});  

const authorizeAdmin=(req,res,next)=> {
    if(req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(401).send("not authorized as admin")
    }
}

export{
    authenticate,
    authorizeAdmin
}