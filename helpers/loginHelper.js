export const verifyPassword = (user,req,res)=>{
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(err) return res.status(500).json({message : err})
        else{
            if(result) return getToken(user,res)
            else return res.status(401).send({message : "Authentication failed ..."})
        }
    })
}


/************* ESTA FUNCIÓN NO SE USA ¿BORRAR? */
export const getToken = (user,res) =>{
    const token = jwt.sign({ email: user.email, userId : user._id,},
        process.env.JWT_KEY, { expiresIn:"1h"})
    res.json({
        message : "Auth successful",
        user,
        token : token
    });
}