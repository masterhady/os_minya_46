// import Joi = require("joi");
import Joi from "joi";



const userValidationSchema = Joi.object({
    name: Joi.string().min(3).max(10).required().messages({
        "string.min": "Name must be at least 3 characters long HELLO WORLD",
        "string.max": "Name must be at most 10 characters long FROM APP",
        "string.required": "Name is required FROM APP",
        "string.empty": "Name is empty FROM APP"
    }),
    email: Joi.string().email()
    // password: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    // .messages({

        
    // })
})

export default userValidationSchema