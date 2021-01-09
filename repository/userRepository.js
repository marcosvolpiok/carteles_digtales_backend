const Interface = require('es6-interface');
const baseRepository = require('./baseRepository');
const user = require('../models/UserModel');

class userRepository extends Interface(baseRepository) {
    constructor() {
        super();
        this.user=user;
    }

    async list () {
        const servers = await this.Server.findAll({ attributes: ['id', 'server', 'description', 'server_type', 'created_at'] });
        return servers;
    }

    async add (params) {
        const server = await this.Server.create(params);
        return server;
    }

    update (params) {
    }

    delete (params) {
    }
}

module.exports = userRepository;