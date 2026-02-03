



export default function catchError(myFun){
    return (req,res) => {
        myFun(req,res).catch((err) => {
            res.status(400).json({err})
        })
    }
}


// express --> global errorhandler