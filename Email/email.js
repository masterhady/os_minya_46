// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";
import jwt from "jsonwebtoken";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.

export default async function sendEMail(email){

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "masterhady1@gmail.com",
    pass: "bnvt btte aubf oogm", // password --> app --> gmail 
  },
});

// Send an email using async/await

const emailToken = jwt.sign(email, "newemail")

  const info = await transporter.sendMail({
    from: '"Note APP" <masterhady1@gmail.com>',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?", // Plain-text version of the message
    html: emailTemplate(emailToken), // HTML version of the message
  });
}