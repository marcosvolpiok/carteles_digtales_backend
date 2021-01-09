const Interface = require('es6-interface');
const baseRepository = require('./baseRepository');
const poster = require('../models/PosterModel');

class posterRepository extends Interface(baseRepository) {
    constructor(data) {
        super();
        this.poster=new poster(); 
    }

    async add (params) {
    }

    async update (params) {
      return await this.poster.update(params.where, params.set);
    }

    async find (params) {
      return this.poster.find(params);
    }

    async findOne (params) {
      return await this.poster.findOne(params);
    }
}

module.exports = posterRepository;