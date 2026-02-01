import mongoose from "mongoose";


const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true,
    versionKey: false
})

export const noteModel = mongoose.model("Note", noteSchema)