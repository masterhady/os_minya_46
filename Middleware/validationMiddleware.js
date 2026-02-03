import userValidationSchema from "../Validation/userValidation.js"


export const validationMiddleware = (req,res,next) => {
    const validation = userValidationSchema.validate(req.body)
    if(validation.error){
        return res.status(422).json(validation.error.details[0].message)
    }
    next()
}