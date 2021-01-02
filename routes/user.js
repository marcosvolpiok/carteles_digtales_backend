const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const UserModel = require('../models/UserModel');
const userController = require('../controllers/userController');
var jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/checkAuth');

//GET ALL USERS
router.get('/', /*checkAuth,*/ userController.list);

//CREATE NEW USER
router.post('/signup', signup, userController.signup);

function signup(req, res, next){
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    let params;

    if(Object.keys(req.body).length>0){
        params=req.body;

    }else{
        params=req.params;
    }

    const { error, value } = schema.validate(params, options);

    if (error) {
        next({message: `Validation error: ${error.details.map(x => x.message).join(', ')}`});
    } else {
        req.body = value;
        next();
    }
}



//UPDATE USER INFO
router.put('/:user_id',checkAuth, async (req,res)=>{
    try {
        await userController.updateUser(req.params.user_id, req.body);
        res.status(200).json({ mesage:"user updated"});
    } catch (error) {
        res.status(500).json({message : error})
    }
});

//DELETE USER
router.delete('/:userID',checkAuth,async (req,res)=>{
    try {
        const deletedUser =  await UserModel.deleteOne({ _id : req.params.userID})
        res.status(200).json({
            message : 'User been deleted ...',
            data : deletedUser,
        })
    } catch (error) {
        res.status(500).json({message : error})
    }
});

router.post('/login',(req,res)=>{
    UserModel.findOne({email : req.body.email }).exec()
        .then(user =>{
                if(user){
                    verifyPassword(user,req,res)
                }else{
                    res.status(401).send({message : "Incorrect email or password..."})
                }
            }).catch(error =>{
                res.status(500).json({message : `error : ${error}` })
        })
})
//VERIFY PASSWORD
const verifyPassword = (user,req,res)=>{
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(err) return res.status(500).json({message : err})
        else{
            if(result) return getToken(user,res)
            else return res.status(401).send({message : "Authentication failed ..."})
        }
    })
}

const getToken = (user,res) =>{
    const token = jwt.sign({ email: user.email, userId : user._id,},
        process.env.JWT_KEY, { expiresIn:"1h"})
    res.json({
        message : "Auth successful",
        user,
        token : token
    });
}



module.exports = router;