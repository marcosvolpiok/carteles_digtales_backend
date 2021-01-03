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


router.put('/:user_id',checkAuth, userController.update);

//DELETE USER
router.delete('/:userID', checkAuth, userController.deleteUser);

router.post('/login', userController.login)

module.exports = router;