const Interface = require('es6-interface');
const baseRepository = require('./baseRepository');
const poster = require('../models/PosterModel');

class posterRepository extends Interface(baseRepository) {
    constructor() {
        super();
        this.poster=new Poster(); 
    }

    async add (params) {
    }

    async list (){

    }

    async delete (params){
      
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