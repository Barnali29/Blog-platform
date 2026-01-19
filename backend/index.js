import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { connectDB } from "./Utils/connectDB.js";
import userRoute from './Routes/userRoute.js'
import categoryRoute from './Routes/categoryRoute.js'
import postRoute from './Routes/postRoute.js'

const app= express()
dotenv.config()
connectDB()

app.use(cors({
    origin:process.env.CLIENT_URL,// need to change later
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routers
app.use("/api/users",userRoute)
app.use("/api/category",categoryRoute)
app.use("/api/posts",postRoute)

const port= 5000||process.env.PORT
app.listen(port,()=>console.log(`Listening at ${port}`))
