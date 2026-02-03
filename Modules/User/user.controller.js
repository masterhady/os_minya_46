
import jwt from "jsonwebtoken";
import {userModel} from "../../Database/Models/user.model.js";
import bcrypt from "bcrypt"
import sendEMail from "../../Email/email.js";
import catchError from "../../Middleware/catchError.js";
import userEmitter from "../../Events/user.event.js";
const getUsers = catchError( async (req,res) => {
    const users  = await userModel.find();
    res.json({
        message: "List of Users: ", 
        data: users
    })
})

const addUser =catchError( async (req,res) => {
    let newUser = await userModel.insertMany(req.body)
    res.status(201).json({
        message: "User added successfully",
        data: newUser
    })
})


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
    await deletedUser.deleteOne() // call hook
    res.status(200).json({
        message: "User deleted successfully"
    })
}

const signup = async (req,res) => {
        // create a single user and remove password from returned object
        let addedUser = await userModel.create(req.body)
        // addedUser.password = undefined
        userEmitter.emit("userCreated", addedUser)
        await addedUser.save()
        // send email to the created user's email.
        sendEMail(addedUser.email)
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
                if(req.foundedUser.isConfrmed == false){
                    return res.status(401).json("please verify your email")
                }
            // 
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


const verifyEmail = async (req,res) => {
    // res.json("email verified")

    jwt.verify(req.params.email, "newemail", async(err, decoded) => {
        if(err){
            return res.status(401).json("invalid token")
        }
        await userModel.findOneAndUpdate({email: decoded}, {isConfrmed: true})
        res.status(200).json("email verified")
    })
}

export {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    signup,
    signin,
    searchUser,
    verifyEmail
}



//  try{
// Function
// }catch(err){
//     console.log(err)
// }

//  hashpass --> next 