const moment = require('moment');
const fs = require('fs');

const PosterModel = require('../models/PosterModel');
const posterService=require('../services/productService');
const posterServiceOb=new posterService();


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
    const poster = await posterServiceOb.add(res);
    res.json(poster);
  } catch (error) {
      res.json({message : error.message})
  }
}



const getPoster = async (req, res) => {
  try {
    const poster = await posterServiceOb.getPoster(req, res);
    res.json(poster);
  } catch (error) {
      res.json({message : error.message})
  }
}

const getPosterById = async (req, res) => {
  try{
    const poster = await posterServiceOb.getPosterById(req);
    res.json(poster);
  }catch(error){
    res.json({message : error.message})
  }
}

const update = async (req, res) => {
  try{
    const poster = await posterServiceOb.update(req);
    res.json(poster);
  }catch(error){
    res.json({message : error.message})
  }
}

const remove = async (id) => {
  try{
    const poster = await posterServiceOb.remove(req);
    res.json(poster);
  }catch(error){
    res.json({message : error.message})
  }
}



module.exports = {
  add,
  getPoster,
  getPosterById,
  update,
  remove,
  addImage
}