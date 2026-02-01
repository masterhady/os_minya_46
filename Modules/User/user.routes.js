// url,link,api endpoint

// app --> server 
import express from "express";
import { getUsers, addUser, updateUser, deleteUser, signup, signin, searchUser } from "./user.controller.js";
import checkEmail from "../../Middleware/checkEmail.js";
import hashPass from "../../Middleware/hashPass.js";
const userRoutes = express.Router();


userRoutes.post("/signup", checkEmail,hashPass, signup)

userRoutes.get("/users", getUsers ) // getUsers
userRoutes.post("/users", addUser)
userRoutes.put("/users/:id", updateUser)
userRoutes.delete("/users/:id", deleteUser)
userRoutes.post("/signin",checkEmail , signin)
userRoutes.get("/search", searchUser)

export default userRoutes 



// signup --> user --> data  --> email, password 