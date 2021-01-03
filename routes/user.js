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
/*
router.put('/:user_id',checkAuth, async (req,res)=>{
    try {
        await userController.updateUser(req.params.user_id, req.body);
        res.status(200).json({ mesage:"user updated"});
    } catch (error) {
        res.status(500).json({message : error})
    }
});
*/
router.put('/:user_id',checkAuth, userController.update);

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

router.post('/login', userController.login)

module.exports = router;