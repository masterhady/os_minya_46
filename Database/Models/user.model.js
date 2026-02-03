// database --> schmea + model 
import mongoose, { Schema , model} from "mongoose";
import { noteModel } from "./note.model.js";

// const userSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     email: String
// });


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 20,
        max: 40,
        required: true
    },
    isConfrmed: {
        type: Boolean,
        default: false
    }, 
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {
    timestamps: true,
    versionKey: false // disable column __v
})

// define hooks
userSchema.pre("deleteOne",{document: true}, async function() {
    await noteModel.deleteMany({createdBy: this._id})
})

userSchema.post("save", function (doc) {
    console.log("User saved:", doc._id);
});

//  created at --> 
//  updated at -->


// create model --> table 
export const userModel = mongoose.model("User", userSchema) 