import jwt, { decode } from "jsonwebtoken"
import { noteModel } from "../../Database/Models/note.model.js"


const getNotes = async (req,res) => {
    let notes = await noteModel.find().select(["title"]).populate("createdBy") // forign key
    res.status(200).json({
        message: "List of notes",
        data: notes
    })
}


const getMyNotes = async (req,res) => {
    let notes = await noteModel.find({createdBy: req.user._id}) // forign key
    res.status(200).json({
        message: "List of notes",
        data: notes
    })
}

const addNote = async (req,res) => {

    // get id from token 
    // const token = req.headers.token 
    // console.log(token)
    // jwt.verify(token, "iti", async(err, decoded) => {
    //     console.log(decoded)
    //         if(err){
    //             return res.status(401).json("invalid token")
    //         }

            req.body.createdBy = req.user._id // data --> database --> title, content, createdBY
            let addedNote = await noteModel.insertMany(req.body)
            res.status(201).json({
                message: "Note added successfully",
                data: addedNote
            })
        // })
}


const deleteNote = async (req,res) => {
    // const id = req.params.id
    const deletedNote = await noteModel.findOneAndDelete(
        {
            _id: req.params.id,
            createdBy: req.user._id // only can delete his notes
        }
    )

    if(!deletedNote){
        return res.status(404).json("Note not found or you are not authorized to delete it")
    }
    res.status(200).json({
        message: "Note deleted successfully"
    })
}


export {
    getNotes,
    addNote,
    deleteNote,
    getMyNotes
}