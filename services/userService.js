class userService {
    constructor(messageRepository) {
        this.messageRepository=messageRepository;
        this.UserModel = require('../models/UserModel');
        this.moment = require('moment');
        this.fs = require('fs');
    }

    list = async ()=>{
        try {
            const users = await this.UserModel.find();
            
            return users;
        } catch (error) {
            return error;
        }
    }
}  


module.exports = userService;