

import express from "express";
import { addNote, deleteNote, getMyNotes, getNotes } from "./note.controller.js";
import { verifyToken } from "../../Middleware/verifyToken.js";


const noteRoutes = express.Router();

noteRoutes.use(verifyToken)

noteRoutes.get("/notes", getNotes);
noteRoutes.post("/notes", addNote);
noteRoutes.delete("/notes/:id", deleteNote);
noteRoutes.get("/mynotes", getMyNotes);



export default noteRoutes