const Interface = require('es6-interface');
const baseRepository = require('./baseRepository');
const Poster = require('../models/PosterModel');

class posterRepository extends Interface(baseRepository) {
    constructor() {
        super();
        this.poster=new Poster(); 
    }

    async add (params) {
      const poster = new Poster(data);
      return await poster.save();
    }

    async list (){

    }

    async delete (params){
      
    }
    async remove (params){
      return await this.poster.remove(params);
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