
import jwt from "jsonwebtoken";
import {userModel} from "../../Database/Models/user.model.js";
import bcrypt from "bcrypt"
const getUsers = async (req,res) => {
    const users  = await userModel.find();
    res.json({
        message: "List of Users: ", 
        data: users
    })
}

const addUser = async (req,res) => {
    let newUser = await userModel.insertMany(req.body)
    res.status(201).json({
        message: "User added successfully",
        data: newUser
    })
}


const updateUser = async (req,res) => {
    const id = req.params.id
    const updatesUser = await userModel.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json({
        message: "User updated successfully",
        data: updatesUser
    })
}

const deleteUser =  async( req,res) => {
    const id = req.params.id
    const deletedUser = await userModel.findByIdAndDelete(id)
    res.status(200).json({
        message: "User deleted successfully"
    })
}

const signup = async (req,res) => {
        let addedUser = await userModel.insertMany(req.body)
        addedUser[0].password = undefined
        res.status(201).json({
        message: "signup successfully",
        data: addedUser
    })
}

const signin  = async(req,res) => {
        const checkPass = bcrypt.compareSync(req.body.password, req.foundedUser.password)
        if(checkPass){
            let token = jwt.sign({_id: req.foundedUser._id, role: req.foundedUser.role}, "iti")
            // console.log(token)
            res.json({
                message: "welcome",
                // data: req.foundedUser,
                token: token
            })
        }else{
            res.status(422).json("Email or Password is invalid")
        }
}

const searchUser = async(req,res) => {
    const keyword = req.query.name // query paramaters
    const foudeUser = await userModel.find({name: keyword})
    // console.log(keyword)
    res.json({data: foudeUser})
}

export {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    signup,
    signin,
    searchUser
}

