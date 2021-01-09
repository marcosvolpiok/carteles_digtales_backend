const Interface = require('es6-interface');
const baseRepository = require('./baseRepository');
const poster = require('../models/PosterModel');

class posterRepository extends Interface(baseRepository) {
    constructor() {
        super();
        this.poster=poster; 
    }

    async list () {
        const messages = await this.Message.findAll({ attributes: ['id', 'message'], include: [
            { model: this.Server, as: 'server' },
        ]});

        return messages;
    }

    async add (params) {
    }

    update (params) {
    }

    delete (params) {
    }

    async listByServer (idServer){
        const messages=await this.Message.findAll({ attributes: ['id', 'message'], 
        where: {
          id_server: idServer
        },
        include: [
        { model: this.Server, as: 'server' },
        ]});

        return messages;
    }

    async listByMessage (message){
        const messages = await this.Message.findAll({ attributes: ['id', 'message'], 
        where: {
          message: {
            [this.Op.like]: `%${message}%`
          }
        },
        include: [
        { model: this.Server, as: 'server' },
        ]});

        return messages;
    }

    async static (){
        const messages = await this.Message.findAll({
            attributes: {
              include: [
                [this.sequelize.literal('(select count(`m`.`id`) from  `messages` as m where m.id_server=Message.id_server)'), 'count'],
                
             ]
            },
            group: ['id_server'],
            order: [[this.sequelize.literal('count'), 'DESC']],
            limit: 3
          });

          return messages;
    }
}

module.exports = posterRepository;