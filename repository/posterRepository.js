const Interface = require('es6-interface');
const baseRepository = require('./baseRepository');

class posterRepository extends Interface(baseRepository) {
    constructor() {
        super();
        this.PosterModel = require('../models/PosterModel');
    }

    async add (params) {
      const poster = new this.PosterModel(params);
      return await poster.save();
    }

    async list (){
      return this.PosterModel.find(params);
    }

    async delete (params){
      
    }
    async remove (params){
      return await this.PosterModel.remove(params);
    }

    async update (params) {
      return await this.PosterModel.update(params.where, params.set);
    }

    async find (params) {
      return this.PosterModel.find(params);
    }

    async findOne (params) {
      return await this.PosterModel.findOne(params);
    }


}

module.exports = posterRepository;