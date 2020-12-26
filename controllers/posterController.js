const posterService=require('../services/productService');
const posterServiceOb=new posterService();


const addImage = async (req, res) => {
  try {
    const poster = await posterServiceOb.addImage(req, res);
    res.json(poster);
  } catch (error) {
      res.status(500).send({message : error.message})
  }
}

const add = async (req, res) => {
  try {
    const poster = await posterServiceOb.add(req, res);
    res.json(poster);
  } catch (error) {
      res.status(500).json({message : error.message})
  }
}



const getPoster = async (req, res) => {
  try {
    const poster = await posterServiceOb.getPoster(req, res);
    res.json(poster);
  } catch (error) {
      res.status(500).json({message : error.message})
  }
}

const getPosterById = async (req, res) => {
  try{
    const poster = await posterServiceOb.getPosterById(req);
    res.json(poster);
  }catch(error){
    res.status(500).json({message : error.message})
  }
}

const update = async (req, res) => {
  try{
    const poster = await posterServiceOb.update(req);
    res.json(poster);
  }catch(error){
    res.status(500).json({message : error.message})
  }
}

const remove = async (req, res) => {
  try{
    const poster = await posterServiceOb.remove(req);
    res.json(poster);
  }catch(error){
    res.status(500).json({message : error.message})
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