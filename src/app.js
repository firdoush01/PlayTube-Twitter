import express from "express"  // configure type: module in package.json to use express as module
import cors from "cors"  //CORS (Cross-Origin Resource Sharing) is a crucial security mechanism in web applications. It allows or restricts requested resources on a web page to be requested from another domain outside the domain from which the resource originated. 
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}) )
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import

import userRouter from "./routes/user.routes.js"


//routes declaration

app.use("/api/v1/users",userRouter)

export {app}