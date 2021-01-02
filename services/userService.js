class userService {
    constructor(messageRepository) {
        this.messageRepository=messageRepository;
        this.UserModel = require('../models/UserModel');
        this.moment = require('moment');
        this.fs = require('fs');
        this.jwt = require('jsonwebtoken');
        this.bcrypt = require('bcrypt');
        this.verifyPassword = require('../helpers/loginHelper');
        this.getToken = require('../helpers/loginHelper');
    }

    list = async ()=>{
        try {
            const users = await this.UserModel.find();
            
            return users;
        } catch (error) {
            return error;
        }
    }

    signup = async (req,res)=>{
        try {
            const existingUser = await this.UserModel.find({email:req.body.email})
            if(existingUser.length !== 0){
                //return res.status(409).json({message : "The User does exist"})
                return {status: 409, message: "The User does exist"};
            }
            const hashPassword = await this.bcrypt.hash(req.body.password, 10);
            const user = new this.UserModel({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
            });
           const createdUser = await user.save();

           return {status: 200, data: createdUser}
        } catch (error) {
            throw new Error(error);
        }
    }

    updateUser = async (req) => {
        this.UserModel.updateMany({_id : req.params.user_id},{$set : req.body}).exec()
          .then(()=>{
              return data
          }).catch(err =>{
              return {message : err}
          })
      }

    login = async(req, res)=>{
        this.UserModel.findOne({email : req.body.email }).exec()
        .then(user =>{
                if(user){
                    this.verifyPassword(user,req,res)
                }else{
                    res.status(401).send({message : "Incorrect email or password..."})
                }
            }).catch(error =>{
                res.status(500).json({message : `error : ${error}` })
        })
    }
}  


module.exports = userService;