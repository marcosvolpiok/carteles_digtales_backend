class userService {
    constructor(messageRepository) {
        this.messageRepository=messageRepository;
        this.UserModel = require('../models/UserModel');
        this.moment = require('moment');
        this.fs = require('fs');
        this.jwt = require('jsonwebtoken');
        this.bcrypt = require('bcrypt');
        this.verifyPassword = require('../helpers/loginHelper').verifyPassword;
        this.getToken = require('../helpers/loginHelper');
        const _this=this;
        const userRepository = require('../repository/userRepository');
        this.userRepository = new userRepository();
    }

    async list() {    
        try {
            const users = await this.userRepository.find();
            
            return users;
        } catch (error) {
            return error;
        }
    }

    async signup(req,res) {
        try {
            const existingUser = await this.userRepository.find({email:req.body.email})
            if(existingUser.length !== 0){
                res.status(409).send({"message": "The User does exist"});
            }
            const hashPassword = await this.bcrypt.hash(req.body.password, 10);
            /*
            TO-DO: VERIFICAR SI ESTÁ BIEN HABER SACADO ESTO
            const user = new this.UserModel({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
            });
           const createdUser = await user.save();
            */
           const createdUser = await this.userRepository.add({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            });

           return {status: 200, data: createdUser, xxxx: 1233}
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateUser (req) {
        const user = await this.userRepository.updateMany(req, req);
        return user;
    }

    async remove (req) {
        let { userID } = req.params;
        console.log('dddddddddddddddddddddddddddddd', userID);
        const user = await this.userRepository.remove({_id: userID});
        return user;
    }

    async login(req, res) {
        const user = await this.userRepository.findOne({email : req.body.email });
        try{
        if(user){
            const rest = this.verifyPassword(user,req,res);
        }else{
            return({status: 401, message: 'Incorrect email or password.'});
        }
        }catch(e){
            console.log('errrrrrrrrrrrrorrrrrrrrrrrr', e.message, e.stack);
        }
    }
}  


module.exports = userService;