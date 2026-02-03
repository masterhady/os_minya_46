import userEmitter from "./user.event.js";

// Listen for the correctly spelled event and send confirmation email
userEmitter.on("userCreated", (user) => {
    console.log("user created", user)
   
})