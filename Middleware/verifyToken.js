import jwt from "jsonwebtoken"


export const verifyToken = (req,res,next) => {
    const token = req.headers.token
    jwt.verify(token, "iti", async(err, decoded) => {
            // console.log(decoded)
                if(err){
                    return res.status(401).json("invalid token")
                }
                req.user = decoded
                next()
})
}