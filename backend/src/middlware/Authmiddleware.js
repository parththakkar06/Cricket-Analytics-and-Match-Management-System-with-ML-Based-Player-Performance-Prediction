const jwt = require('jsonwebtoken')
const config = require('../config/config')

const vaildateuser = (req,res,next) =>{
    var token = req.headers.authorization;
    if(token){

        if(token.startsWith("Bearer ")){

            token = token.split(" ")[1]
            try{
                const user = jwt.verify(token,config.JWT_SECRET)
                console.log(user);
                req.user = user
                next()
            }catch(err)
            {
                console.log(err)
                res.status(401).json({
                    mess : "unauthorized , token is invaild"
                })
            }
        }else{
            res.status(401).json({
                message:"Unauthorized, Token should be Bearer token"
            })
        }
    }else{
        res.status(401).json({
           mess :"Unauthorized,Please provide token in header " 
        })
    }
}

module.exports ={
    vaildateuser
}