class productService {
    constructor(messageRepository) {
        this.messageRepository=messageRepository;
        this.PosterModel = require('../models/PosterModel');
      }
    

    getPoster = async (res) => {
        const poster = await this.PosterModel.find({user: res.res.userData.userId});

        return poster;
    }

    getPosterById = async (req) => {
        const { id } = req.params;
        const poster = await this.PosterModel.findOne({_id: id});

        return poster;
    }

    update = async (req) => {
        let { id } = req.params;
        const poster = await this.PosterModel.update({_id: id}, req.body);

        return poster;
    }

    remove = async (req) => {
        let { id } = req.params;
        const poster = await this.PosterModel.remove({_id: id});

        return poster;
    }
}

module.exports = productService;