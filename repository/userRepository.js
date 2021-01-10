const Interface = require('es6-interface');
const baseRepository = require('./baseRepository');

class userRepository extends Interface(baseRepository) {
    constructor() {
        super();
        this.UserModel = require('../models/UserModel');
    }

    async list () {
    }

    async add (params) {
        const user = new this.UserModel(params);

        return await user.save();
    }

    update (params) {
    }

    delete (params) {
    }

    async find (params) {
        return await this.UserModel.find(params);
    }
  
    async findOne (params) {
        return await this.UserModel.findOne(params);
    }
}

module.exports = userRepository;