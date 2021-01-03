const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyPassword = (user,req,res)=>{
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(err){
            res.status(501).json({message : err.message, xxxx: 1234});
        }else{
            if(result){
                return getToken(user,res);
            }else{
            //else return {status: 401, data: 'Authentication failed'}
                res.status(401).send({message : "Authentication failed ..."})
            }
        }
    })
}


/************* ESTA FUNCIÓN NO SE USA ¿BORRAR? */
const getToken = (user,res) =>{
    const token = jwt.sign({ email: user.email, userId : user._id,},
        process.env.JWT_KEY, { expiresIn:"1h"})

        //return {status: 200, message: 'Auth successful', user, token: token}
        
    res.json({
        message : "Auth successful",
        user,
        token : token
    });
    
}


module.exports = {verifyPassword, getToken};