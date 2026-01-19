import asyncHandler from "../Middleware/asyncHandler.js";
import User from "../Models/userModel.js";
import createToken from "../Utils/createToken.js";
import bcrypt from 'bcryptjs'

const createUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body
    const isAdmin = req.body.isAdmin === true;

    if (!username || !email || !password)
        res.status(400).json("incomplete information for user creation !!")

    const existingUser = await User.findOne({ email })
    if (existingUser) res.status(400).send("User already exists");
    // create user and save in db

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword ,isAdmin});

    try {
        await newUser.save();
       await createToken(res, newUser._id)
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            isAdmin: newUser.isAdmin
        })
    } catch (error) {
        res.status(400);
        throw new Error("Invalid user data");
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        res.status(400).json("incomplete information for user creation !!");
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (isPasswordValid) {
           await createToken(res, existingUser._id);
            res.status(201).
                json({
                    _id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email,
                    isAdmin: existingUser.isAdmin
                })
        }
    }
    return;

})

const logoutCurrentUser = asyncHandler(async (req, res) => {

    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: "logged out!!" })

})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);

})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    }
    else res.status(400).send("user profile not found ")
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
        console.log(req.body)
    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = req.body?.isAdmin || user.isAdmin
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = bcrypt.hash(req.body.password, salt)
            user.password = hashedPassword
        }
        const updatedUser = await user.save();
        res
            .status(201)
            .json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin
            })
    }
    else {
        res.status(400).send("profile not found ")
    }
})

const deleteUserById= asyncHandler(async(req, res)=>{
    console.log(req.params.id)
     const user = await User.findOne({_id:req.params.id});
    console.log(user , typeof(user.isAdmin))
    if (user) {
        if(user.isAdmin){
           return res.status(400).send("cannot delete admin account")
        }
        try {
           // await User.deleteOne({_id:user._id}) not working 
           await User.findByIdAndDelete(req.params.id);

            res.status(200).send("user deleted successfully")
        } catch (error) {
            res.status(401)
            throw new Error(`something went wrong while deleting user , message: ${error.message}`)
        }
    }
    else {
        res.status(400).send("user account  not found ")
    }
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body?.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
    createUser,
    login,
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
    updateUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
};