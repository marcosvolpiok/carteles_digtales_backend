class productService {
    constructor(messageRepository) {
        this.messageRepository=messageRepository;
        this.PosterModel = require('../models/PosterModel');
      }
    

    getPoster = async (res) => {
        //return 'example return';
        //console.log(res);
        console.log(res);

        //console.log('useridddddddddddddddddd: ', res.userData.userId);
        const poster = await this.PosterModel.find({user: res.res.userData.userId});
        
        return poster;
    }
}

module.exports = productService;