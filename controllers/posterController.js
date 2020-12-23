const moment = require('moment');
const fs = require('fs');

const PosterModel = require('../models/PosterModel');

const addImage = (req, res) => {
  try {
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
        //req.poster = await posterController.update(req.body.id, {file: destPath});
        //req.poster = await posterController.update(req.body.id, {file_path: destPath});
        const poster = await PosterModel.update({_id: req.body.id}, {file_path: destPath});
        res.json(poster);
    });
    src.on('error', function(err) { res.render('error'); });
    
} catch (error) {
    res.json({message : error.message})
}
}

const add = async (req, res) => {
  try {
    data=req.body;
    data['user'] = res.userData.userId;
    const poster = new PosterModel(data);
    await poster.save();
  
    res.json(poster);
  } catch (error) {
    res.json({message : error.message})
  }
}



const getPoster = async (req, res) => {
  try {
    req.map = await PosterModel.find({user: res.userData.userId});
    res.json(req.map);

  } catch (error) {
      res.json({message : error})
  }
}

const getPosterById = async (id) => {
  const map = await PosterModel.findOne({_id: id});

  return map;
}



const update = async (id, data) => {
  const poster = await PosterModel.update({_id: id}, data);

  return poster;
}

const remove = async (id) => {
  const poster = await PosterModel.remove({_id: id});

  return poster;
}



module.exports = {
  add,
  getPoster,
  getPosterById,
  update,
  remove,
  addImage
}