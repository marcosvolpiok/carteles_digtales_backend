class productService {
    constructor(messageRepository) {
        this.messageRepository=messageRepository;
        this.PosterModel = require('../models/PosterModel');
        this.moment = require('moment');
        this.fs = require('fs');
    }

    add = async (req, res) => {
        const data=req.body;
        data['user'] = res.userData.userId;
        const poster = new this.PosterModel(data);
        await poster.save();
        
        return poster;
    }  
    
    addImage = async (req, res) => {
        const _this = this;
        const _req= req;

        const destPath=`upload\\posters\\${req.body.id}\\${req.file.originalname}\\${this.moment().format("DD-MM-YY, h-mm-ss")} HS_${req.file.filename}_${req.file.originalname}`;
        if (!this.fs.existsSync(`upload/posters/`)){
            this.fs.mkdirSync(`upload/posters/`);
        }
    
        if (!this.fs.existsSync(`upload/posters/${req.body.id}`)){
            this.fs.mkdirSync(`upload/posters/${req.body.id}`);
        }
    
        if (!this.fs.existsSync(`upload/posters/${req.body.id}/${req.file.originalname}`)){
            this.fs.mkdirSync(`upload/posters/${req.body.id}/${req.file.originalname}`);
        }        
    
        const src = this.fs.createReadStream(req.file.path);
        const dest = this.fs.createWriteStream(destPath);
        src.pipe(dest);
        src.on('end', async function() {
            const poster = await _this.PosterModel.updateOne({_id: _req.body.id}, {file_path: destPath});
            return poster;
        });
        src.on('error', function(err) { throw new Error('An error occurred copying the image'); });
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

    update = async (req, res) => {
        let { id } = req.params;
        const poster = await this.PosterModel.updateOne({_id: id}, req.body);
        global.io.emit('action', 'ALGOOOOOOOOOOOOOOOOOO');

        return poster;
    }

    remove = async (req) => {
        let { id } = req.params;
        const poster = await this.PosterModel.remove({_id: id});

        return poster;
    }
}

module.exports = productService;