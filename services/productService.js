class productService {
    constructor(messageRepository) {
        this.messageRepository=messageRepository;
        this.PosterModel = require('../models/PosterModel');
    }

    add = async (req, res) => {
        const data=req.body;
        data['user'] = res.userData.userId;
        const poster = new this.PosterModel(data);
        await poster.save();
        
        return poster;
    }  
    
    addImage = async (res) => {
        const destPath=`upload\\posters\\${req.body.id}\\${req.file.originalname}\\${moment().format("DD-MM-YY, h-mm-ss")} HS_${req.file.filename}_${req.file.originalname}`;
        if (!fs.existsSync(`upload/posters/`)){
            fs.mkdirSync(`upload/posters/`);
        }
    
        if (!fs.existsSync(`upload/posters/${req.body.id}`)){
            fs.mkdirSync(`upload/posters/${req.body.id}`);
        }
    
        if (!fs.existsSync(`upload/posters/${req.body.id}/${req.file.originalname}`)){
            fs.mkdirSync(`upload/posters/${req.body.id}/${req.file.originalname}`);
        }        
    
        const src = fs.createReadStream(req.file.path);
        const dest = fs.createWriteStream(destPath);
        src.pipe(dest);
        src.on('end', async function() { 
            const poster = await PosterModel.update({_id: req.body.id}, {file_path: destPath});
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

    update = async (req) => {
        let { id } = req.params;
        const poster = await this.PosterModel.updateOne({_id: id}, req.body);

        return poster;
    }

    remove = async (req) => {
        let { id } = req.params;
        const poster = await this.PosterModel.remove({_id: id});

        return poster;
    }
}

module.exports = productService;